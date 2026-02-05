import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

// Initialize Stripe with the Secret Key from environment variables
// Note: STRIPE_SECRET_KEY is a private key and should ONLY exist on the server/Netlify dashboard
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const handler: Handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { price, itemTitle, userId, userEmail } = JSON.parse(event.body || '{}');

        if (!price || isNaN(price)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Valid price is required' }),
            };
        }

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: userEmail, // Pre-fill email if available
            client_reference_id: userId, // Link to Netlify User ID
            metadata: {
                userId,
                collectionId: 'jaron-ikner-collection' // Specify what is being unlocked
            },
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: itemTitle || 'Starstream: Jaron Ikner Collection',
                            description: 'One-time payment to unlock the full Jaron Ikner Director\'s Cut collection permanently.',
                            images: ['https://starstream.tv/assets/images/starstream_logo_new.png'],
                        },
                        unit_amount: Math.round(price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.SITE_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.SITE_URL || 'http://localhost:5173'}/cancel`,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ url: session.url }),
        };
    } catch (error: any) {
        console.error('Stripe Session Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

export { handler };
