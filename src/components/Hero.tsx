import React from 'react';

interface HeroProps {
    onPlay: () => void;
}

const Hero: React.FC<HeroProps> = ({ onPlay }) => {
    return (
        <div className="hero-container" style={{
            position: 'relative',
            height: '92vh',
            width: '100%',
            backgroundImage: 'linear-gradient(to top, var(--bg-color) 0%, transparent 25%, transparent 100%), url(/assets/images/hero_clean.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: 'flex',
            alignItems: 'center',
            padding: '0 4%',
            overflow: 'hidden'
        }}>
            {/* Cinematic Vignette */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none'
            }}></div>

            <div className="hero-content" style={{ maxWidth: '750px', zIndex: 10, position: 'relative' }}>
                <div className="hero-badge-row" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '25px',
                    color: 'var(--primary-color)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    letterSpacing: '3px',
                    textTransform: 'uppercase'
                }}>
                    <span style={{
                        backgroundColor: 'var(--primary-color)',
                        color: '#000',
                        padding: '4px 8px',
                        borderRadius: '2px',
                        fontSize: '0.7rem'
                    }}>PREMIUM EVENT</span>
                    <span className="hero-subtitle" style={{ opacity: 0.8 }}>A 360 VIEW ORIGINAL SPECIAL</span>
                </div>

                <h2 className="hero-title" style={{
                    fontSize: '5.5rem',
                    fontWeight: 900,
                    lineHeight: 0.85,
                    marginBottom: '25px',
                    textTransform: 'uppercase',
                    letterSpacing: '-2px',
                    filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5))'
                }}>
                    Wishes Are <br />
                    <span style={{ color: 'transparent', WebkitTextStroke: '2px #fff' }}>Never Perfect</span>
                </h2>

                <p className="hero-description" style={{
                    fontSize: '1.3rem',
                    marginBottom: '45px',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: '#ccc',
                    maxWidth: '600px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                }}>
                    Genies don't retire. They just get recycled. Join Noraj as he pulls
                    back the veil on the 3,000-year cycle of the lamp and the chaos of human existence.
                </p>

                <div className="hero-btn-group" style={{ display: 'flex', gap: '20px' }}>
                    <button
                        onClick={onPlay}
                        className="btn-play"
                        style={{
                            padding: '18px 50px',
                            backgroundColor: '#fff',
                            color: '#000',
                            fontWeight: 900,
                            fontSize: '1rem',
                            borderRadius: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            boxShadow: '0 10px 40px rgba(255,255,255,0.2)',
                            transition: 'all 0.3s ease',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <span style={{ fontSize: '1.5rem' }}>▶</span> PLAY
                    </button>
                    <button className="btn-info" style={{
                        padding: '18px 45px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '1rem',
                        borderRadius: '2px',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    >
                        ⓘ MORE INFO
                    </button>
                </div>
            </div>

            {/* Glassmorphic Side Detail */}
            <div className="hero-side-detail" style={{
                position: 'absolute',
                right: '4%',
                bottom: '150px',
                width: '300px',
                padding: '30px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                borderLeft: '2px solid var(--primary-color)',
                borderRadius: '2px',
                zIndex: 5
            }}>
                <div style={{ color: 'var(--primary-color)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '10px' }}>NOW TRENDING</div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '10px' }}>NORAJ UNFILTERED</div>
                <div style={{ fontSize: '0.85rem', color: '#999', lineHeight: 1.4 }}>The most watched special in Starstream history. See the truth today.</div>
            </div>

            {/* Subtle Scanline Effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.03,
                pointerEvents: 'none',
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 3px)'
            }}></div>

            <style>{`
                @media (max-width: 768px) {
                    .hero-container {
                        height: 80vh !important;
                        padding-top: 100px !important;
                        align-items: flex-start !important;
                    }
                    .hero-title {
                        font-size: 3rem !important;
                        margin-bottom: 20px !important;
                    }
                    .hero-description {
                        font-size: 1rem !important;
                        margin-bottom: 30px !important;
                        max-width: 100% !important;
                    }
                    .hero-badge-row {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 10px !important;
                    }
                    .hero-subtitle {
                        font-size: 0.6rem !important;
                    }
                    .hero-btn-group {
                        flex-direction: column !important;
                        width: 100% !important;
                    }
                    .btn-play, .btn-info {
                        width: 100% !important;
                        justify-content: center !important;
                        padding: 12px !important;
                    }
                    .hero-side-detail {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Hero;
