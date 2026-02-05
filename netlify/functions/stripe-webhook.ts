import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const sig = event.headers['stripe-signature'];
    let stripeEvent;

    try {
        stripeEvent = stripe.webhooks.constructEvent(event.body || '', sig || '', endpointSecret || '');
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return { statusCode: 400, body: `Webhook Error: ${err.message}` };
    }

    // Handle the checkout.session.completed event
    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;
        const collectionId = session.metadata?.collectionId;

        if (userId && collectionId) {
            console.log(`Unlocking ${collectionId} for user ${userId}`);

            try {
                // Use Netlify's administrative API to update user metadata
                // This requires a NETLIFY_AUTH_TOKEN in your environment variables
                const netlifyToken = process.env.NETLIFY_AUTH_TOKEN;
                const siteId = process.env.SITE_ID;

                if (!netlifyToken || !siteId) {
                    throw new Error('Missing NETLIFY_AUTH_TOKEN or SITE_ID');
                }

                // 1. Get current user data to preserve existing unlocked collections
                const userResponse = await axios.get(
                    `https://api.netlify.com/api/v1/sites/${siteId}/identity/users/${userId}`,
                    { headers: { Authorization: `Bearer ${netlifyToken}` } }
                );

                const currentCollections = userResponse.data.app_metadata?.unlocked_collections || [];

                if (!currentCollections.includes(collectionId)) {
                    currentCollections.push(collectionId);
                }

                // 2. Update user app_metadata
                await axios.put(
                    `https://api.netlify.com/api/v1/sites/${siteId}/identity/users/${userId}`,
                    {
                        app_metadata: {
                            unlocked_collections: currentCollections
                        }
                    },
                    { headers: { Authorization: `Bearer ${netlifyToken}` } }
                );

                console.log(`Successfully updated metadata for ${userId}`);
            } catch (error: any) {
                console.error('Netlify API Error:', error.response?.data || error.message);
                return { statusCode: 500, body: 'Failed to update user metadata' };
            }
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ received: true }),
    };
};

export { handler };
