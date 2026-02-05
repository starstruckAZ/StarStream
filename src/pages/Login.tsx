import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

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
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Texture */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url("/assets/images/noise.png")', // Assumes you have a noise texture, or just use CSS noise
                opacity: 0.1,
                pointerEvents: 'none'
            }}></div>

            <div style={{
                zIndex: 10,
                textAlign: 'center',
                padding: '40px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '4px',
                boxShadow: '0 0 50px rgba(0, 243, 255, 0.1)'
            }}>
                <img
                    src="/assets/images/starstream_logo_new.png"
                    alt="Starstream"
                    style={{ height: '50px', marginBottom: '40px' }}
                />

                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: 300,
                    letterSpacing: '4px',
                    marginBottom: '30px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.8)'
                }}>Authorized Personnel Only</h1>

                <button
                    onClick={login}
                    style={{
                        padding: '15px 40px',
                        backgroundColor: 'var(--primary-color)',
                        color: '#000',
                        fontWeight: 900,
                        fontSize: '1rem',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        boxShadow: '0 0 20px rgba(0, 243, 255, 0.4)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 243, 255, 0.6)'}
                    onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.4)'}
                >
                    Authenticate
                </button>

                <div style={{ marginTop: '30px', fontSize: '0.8rem', color: '#444' }}>
                    SECURE CONNECTION ESTABLISHED
                </div>
            </div>
        </div>
    );
};

export default Login;
