import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel: React.FC = () => {
    const navigate = useNavigate();

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
                fontSize: '3rem',
                fontWeight: 900,
                color: '#ff4444',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '8px'
            }}>PAYMENT CANCELED</h1>

            <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', lineHeight: 1.6, color: '#888' }}>
                The transaction was not completed. No worries—Wishes Are Never Perfect is still available for free.
            </p>

            <button
                onClick={() => navigate('/')}
                style={{
                    padding: '16px 50px',
                    backgroundColor: 'var(--primary-color)',
                    color: '#000',
                    fontWeight: 900,
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                }}
            >
                BACK TO CATALOG
            </button>
        </div>
    );
};

export default Cancel;
