import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface PaywallProps {
    itemTitle: string;
    onUnlock: (price: number) => void;
    onClose: () => void;
}

const Paywall: React.FC<PaywallProps> = ({ itemTitle, onUnlock, onClose }) => {
    const [customPrice, setCustomPrice] = useState<string>('5');
    const [isProcessing, setIsProcessing] = useState(false);
    const { isLoggedIn, login } = useAuth();

    const priceOptions = [1, 5, 10, 20];

    const handlePriceSelect = (price: number) => {
        setCustomPrice(price.toString());
    };

    const handleUnlock = () => {
        const price = parseFloat(customPrice);
        if (isNaN(price) || price <= 0) {
            alert("Please enter a valid price to support the filmmaker.");
            return;
        }
        setIsProcessing(true);
        onUnlock(price);
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            padding: '40px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
        }}>
            <div style={{ maxWidth: '600px' }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: 'var(--primary-color)',
                    marginBottom: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '4px'
                }}>PREMIUM CONTENT</h2>

                <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '10px', fontWeight: 700 }}>
                    {itemTitle}
                </p>

                <p style={{ color: '#888', marginBottom: '40px', lineHeight: 1.6 }}>
                    The Jaron Ikner Director's Cut collection is supported directly by viewers like you.
                    Pay what you want to unlock the full collection permanently.
                </p>

                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '20px' }}>
                        {priceOptions.map(price => (
                            <button
                                key={price}
                                onClick={() => handlePriceSelect(price)}
                                style={{
                                    padding: '12px 25px',
                                    backgroundColor: customPrice === price.toString() ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)',
                                    color: customPrice === price.toString() ? '#000' : '#fff',
                                    border: `1px solid ${customPrice === price.toString() ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: '2px',
                                    cursor: 'pointer',
                                    fontWeight: 800,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                ${price}
                            </button>
                        ))}
                    </div>

                    <div style={{ position: 'relative', width: '200px', margin: '0 auto' }}>
                        <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#555' }}>$</span>
                        <input
                            type="number"
                            value={customPrice}
                            onChange={(e) => setCustomPrice(e.target.value)}
                            placeholder="Custom"
                            style={{
                                width: '100%',
                                padding: '15px 15px 15px 30px',
                                backgroundColor: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff',
                                fontSize: '1.2rem',
                                textAlign: 'center',
                                borderRadius: '2px',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    {isLoggedIn ? (
                        <button
                            onClick={handleUnlock}
                            disabled={isProcessing}
                            style={{
                                padding: '18px 60px',
                                backgroundColor: 'var(--primary-color)',
                                color: '#000',
                                fontWeight: 900,
                                fontSize: '1rem',
                                borderRadius: '2px',
                                border: 'none',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                boxShadow: '0 0 30px rgba(0, 243, 255, 0.3)',
                                opacity: isProcessing ? 0.7 : 1
                            }}
                        >
                            {isProcessing ? 'Processing...' : 'Unlock Collection'}
                        </button>
                    ) : (
                        <button
                            onClick={login}
                            style={{
                                padding: '18px 60px',
                                backgroundColor: 'var(--primary-color)',
                                color: '#000',
                                fontWeight: 900,
                                fontSize: '1rem',
                                borderRadius: '2px',
                                border: 'none',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                boxShadow: '0 0 30px rgba(0, 243, 255, 0.3)'
                            }}
                        >
                            Sign In to Unlock
                        </button>
                    )}

                    <button
                        onClick={onClose}
                        style={{
                            padding: '18px 30px',
                            backgroundColor: 'transparent',
                            color: '#666',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        CLOSE
                    </button>
                </div>

                <div style={{ marginTop: '40px', fontSize: '0.8rem', color: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1rem' }}>🔒</span> Secure Payment via Stripe
                </div>
            </div>
        </div>
    );
};

export default Paywall;
