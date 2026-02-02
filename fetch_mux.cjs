const https = require('https');

const TOKEN_ID = '1a1fd0f0-7933-4b2f-af25-cd40a8a75eb6';
const TOKEN_SECRET = '1XG9dJSbQdwYuEOliwFPzt3O+loRLasLmpNOI9a3Ejj8ybmVodOjq1i4nf+wQJiNgSL0m/J3aLS';

const auth = Buffer.from(`${TOKEN_ID}:${TOKEN_SECRET}`).toString('base64');

const options = {
    hostname: 'api.mux.com',
    path: '/video/v1/assets',
    method: 'GET',
    headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            if (response.data) {
                response.data.forEach(asset => {
                    const publicPlaybackId = asset.playback_ids ? asset.playback_ids.find(p => p.policy === 'public') : null;
                    console.log(`TITLE: ${asset.test ? '[TEST] ' : ''}${asset.passthrough || 'Untitled'}`);
                    console.log(`ID: ${asset.id}`);
                    console.log(`PLAYBACK: ${publicPlaybackId ? publicPlaybackId.id : 'NONE'}`);
                    console.log('---');
                });
            } else {
                console.log('No assets found or error:', response);
            }
        } catch (e) {
            console.error('Failed to parse:', e);
            console.log('Raw data:', data);
        }
    });
});

req.on('error', (e) => {
    console.error('Request error:', e);
});

req.end();
