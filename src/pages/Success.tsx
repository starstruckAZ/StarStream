import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Mark as unlocked locally once we arrive here
        localStorage.setItem('starstream_directors_cut_unlocked', 'true');

        // Redirect back to home after a few seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{
            height: '100vh',
            width: '100%',
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1 style={{
                fontSize: '3.5rem',
                fontWeight: 900,
                color: 'var(--primary-color)',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '8px'
            }}>ACCESS GRANTED</h1>

            <p style={{ fontSize: '1.4rem', marginBottom: '40px', maxWidth: '600px', lineHeight: 1.6 }}>
                Thank you for supporting Starstream. The Jaron Ikner Director's Cut collection is now permanently unlocked for you.
            </p>

            <div style={{
                width: '50px',
                height: '2px',
                backgroundColor: 'var(--primary-color)',
                marginBottom: '40px'
            }}></div>

            <p style={{ color: '#555', fontSize: '0.9rem' }}>
                Redirecting you back to the catalog in 5 seconds...
            </p>

            <button
                onClick={() => navigate('/')}
                style={{
                    marginTop: '40px',
                    padding: '12px 30px',
                    backgroundColor: 'transparent',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}
            >
                Return Now
            </button>
        </div>
    );
};

export default Success;
