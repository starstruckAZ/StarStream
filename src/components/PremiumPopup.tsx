import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PremiumPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Only show if user is NOT logged in and hasn't seen it this session
        const hasSeenPopup = sessionStorage.getItem('starstream_promo_seen');

        if (!isLoggedIn && !hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                sessionStorage.setItem('starstream_promo_seen', 'true');
            }, 15000); // Show after 15 seconds

            return () => clearTimeout(timer);
        }
    }, [isLoggedIn]);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleUnlock = () => {
        setIsVisible(false);
        // Scroll to Jaron Ikner Collection or trigger modal
        // For simplicity, we can redirect to login or just close
        navigate('/login');
    };

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '350px',
            backgroundColor: 'rgba(5, 5, 5, 0.95)',
            border: '2px solid var(--primary-color)',
            borderRadius: '4px',
            padding: '25px',
            zIndex: 9999,
            boxShadow: '0 0 40px rgba(0, 243, 255, 0.2)',
            animation: 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            <button
                onClick={handleClose}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '15px',
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                }}
            >✕</button>

            <img
                src="/assets/images/starstream_logo_new.png"
                alt="Starstream Premium"
                style={{ height: '25px', marginBottom: '15px', opacity: 0.8 }}
            />

            <h3 style={{
                color: '#fff',
                fontSize: '1.2rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '10px'
            }}>Unlock The Full Experience</h3>

            <p style={{
                color: '#aaa',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                marginBottom: '20px'
            }}>
                Get permanent access to the <strong>Jaron Ikner Director's Cut</strong> collection. Includes 5+ feature films, exclusive series, and content you won't find anywhere else.
            </p>

            <button
                onClick={handleUnlock}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--primary-color)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '2px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(0, 243, 255, 0.3)'
                }}
            >
                Get Access
            </button>

            <style>{`
                @keyframes slideIn {
                    from { transform: translateY(100px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default PremiumPopup;
