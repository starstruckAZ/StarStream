import React, { useState, useEffect, useCallback } from 'react';

interface SpotlightItem {
    id: string;
    title: string;
    description: string;
    poster: string;
    video?: string;
    isComingSoon?: boolean;
    type?: 'series' | 'movie';
}

interface SpotlightCarouselProps {
    items: SpotlightItem[];
    onPlay: (item: SpotlightItem) => void;
    onMoreInfo: (item: SpotlightItem) => void;
    autoPlayInterval?: number; // milliseconds, default 8000
}

const SpotlightCarousel: React.FC<SpotlightCarouselProps> = ({
    items,
    onPlay,
    onMoreInfo,
    autoPlayInterval = 8000
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 600);
    }, [currentIndex, isTransitioning]);

    const goToNext = useCallback(() => {
        goToSlide((currentIndex + 1) % items.length);
    }, [currentIndex, items.length, goToSlide]);

    const goToPrev = useCallback(() => {
        goToSlide(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
    }, [currentIndex, items.length, goToSlide]);

    // Auto-rotate
    useEffect(() => {
        if (isPaused || items.length <= 1) return;

        const timer = setInterval(goToNext, autoPlayInterval);
        return () => clearInterval(timer);
    }, [isPaused, goToNext, autoPlayInterval, items.length]);

    if (items.length === 0) return null;

    const currentItem = items[currentIndex];

    return (
        <div
            className="spotlight-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
                position: 'relative',
                height: '92vh',
                width: '100%',
                overflow: 'hidden'
            }}
        >
            {/* Background Images - all preloaded, opacity controlled */}
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className="spotlight-bg"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(to top, var(--bg-color) 0%, transparent 25%, transparent 100%), url(${item.poster})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        opacity: index === currentIndex ? 1 : 0,
                        transition: 'opacity 0.8s ease-in-out',
                        zIndex: 1
                    }}
                />
            ))}

            {/* Cinematic Vignette */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none',
                zIndex: 2
            }} />

            {/* Subtle Scanlines */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.03,
                pointerEvents: 'none',
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 3px)',
                zIndex: 3
            }} />

            {/* Content */}
            <div
                className="spotlight-content"
                style={{
                    position: 'relative',
                    zIndex: 10,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 4%'
                }}
            >
                <div style={{ maxWidth: '750px' }}>
                    {/* Badge Row */}
                    <div
                        className="spotlight-badge"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            marginBottom: '25px',
                            color: 'var(--primary-color)',
                            fontWeight: 800,
                            fontSize: '0.8rem',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            opacity: isTransitioning ? 0 : 1,
                            transform: isTransitioning ? 'translateY(-10px)' : 'translateY(0)',
                            transition: 'all 0.4s ease'
                        }}
                    >
                        <span style={{
                            backgroundColor: 'var(--primary-color)',
                            color: '#000',
                            padding: '4px 8px',
                            borderRadius: '2px',
                            fontSize: '0.7rem'
                        }}>
                            {currentItem.isComingSoon ? 'COMING SOON' : 'NOW STREAMING'}
                        </span>
                        <span style={{ opacity: 0.8 }}>STARSTREAM SPOTLIGHT</span>
                    </div>

                    {/* Title */}
                    <h2
                        className="spotlight-title"
                        style={{
                            fontSize: '5.5rem',
                            fontWeight: 900,
                            lineHeight: 0.85,
                            marginBottom: '25px',
                            textTransform: 'uppercase',
                            letterSpacing: '-2px',
                            filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5))',
                            opacity: isTransitioning ? 0 : 1,
                            transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
                            transition: 'all 0.5s ease'
                        }}
                    >
                        {currentItem.title.split(' ').slice(0, 2).join(' ')}
                        {currentItem.title.split(' ').length > 2 && (
                            <>
                                <br />
                                <span style={{ color: 'transparent', WebkitTextStroke: '2px #fff' }}>
                                    {currentItem.title.split(' ').slice(2).join(' ')}
                                </span>
                            </>
                        )}
                    </h2>

                    {/* Description */}
                    <p
                        className="spotlight-description"
                        style={{
                            fontSize: '1.3rem',
                            marginBottom: '45px',
                            fontWeight: 400,
                            lineHeight: 1.5,
                            color: '#ccc',
                            maxWidth: '600px',
                            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                            opacity: isTransitioning ? 0 : 1,
                            transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
                            transition: 'all 0.5s ease 0.1s'
                        }}
                    >
                        {currentItem.description}
                    </p>

                    {/* Buttons */}
                    <div
                        className="spotlight-buttons"
                        style={{
                            display: 'flex',
                            gap: '20px',
                            opacity: isTransitioning ? 0 : 1,
                            transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
                            transition: 'all 0.5s ease 0.2s'
                        }}
                    >
                        <button
                            onClick={() => !currentItem.isComingSoon && onPlay(currentItem)}
                            disabled={currentItem.isComingSoon}
                            className="btn-play"
                            style={{
                                padding: '18px 50px',
                                backgroundColor: currentItem.isComingSoon ? '#333' : '#fff',
                                color: currentItem.isComingSoon ? '#888' : '#000',
                                fontWeight: 900,
                                fontSize: '1rem',
                                borderRadius: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                boxShadow: currentItem.isComingSoon ? 'none' : '0 10px 40px rgba(255,255,255,0.2)',
                                transition: 'all 0.3s ease',
                                border: 'none',
                                cursor: currentItem.isComingSoon ? 'not-allowed' : 'pointer'
                            }}
                            onMouseOver={(e) => !currentItem.isComingSoon && (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <span style={{ fontSize: '1.5rem' }}>▶</span>
                            {currentItem.isComingSoon ? 'COMING SOON' : 'PLAY'}
                        </button>

                        <button
                            onClick={() => onMoreInfo(currentItem)}
                            className="btn-info"
                            style={{
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
            </div>

            {/* Side Detail Panel */}
            <div
                className="spotlight-side-detail"
                style={{
                    position: 'absolute',
                    right: '4%',
                    bottom: '150px',
                    width: '300px',
                    padding: '30px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(20px)',
                    borderLeft: '2px solid var(--primary-color)',
                    borderRadius: '2px',
                    zIndex: 5,
                    opacity: isTransitioning ? 0 : 1,
                    transition: 'opacity 0.4s ease'
                }}
            >
                <div style={{
                    color: 'var(--primary-color)',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    letterSpacing: '2px',
                    marginBottom: '10px'
                }}>
                    {isPaused ? '⏸ PAUSED' : `${currentIndex + 1} / ${items.length}`}
                </div>
                <div style={{
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    marginBottom: '10px'
                }}>
                    UP NEXT
                </div>
                <div style={{
                    fontSize: '0.85rem',
                    color: '#999',
                    lineHeight: 1.4
                }}>
                    {items[(currentIndex + 1) % items.length]?.title || 'More content coming soon'}
                </div>
            </div>

            {/* Navigation Arrows */}
            {items.length > 1 && (
                <>
                    <button
                        onClick={goToPrev}
                        className="carousel-arrow left"
                        style={{
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            zIndex: 20,
                            opacity: 0,
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ‹
                    </button>
                    <button
                        onClick={goToNext}
                        className="carousel-arrow right"
                        style={{
                            position: 'absolute',
                            right: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            zIndex: 20,
                            opacity: 0,
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ›
                    </button>
                </>
            )}

            {/* Navigation Dots */}
            {items.length > 1 && (
                <div
                    className="carousel-dots"
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '12px',
                        zIndex: 20
                    }}
                >
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            style={{
                                width: index === currentIndex ? '30px' : '10px',
                                height: '10px',
                                borderRadius: '5px',
                                backgroundColor: index === currentIndex ? 'var(--primary-color)' : 'rgba(255,255,255,0.3)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: index === currentIndex ? '0 0 15px var(--primary-color)' : 'none'
                            }}
                        />
                    ))}
                </div>
            )}

            <style>{`
                .spotlight-carousel:hover .carousel-arrow {
                    opacity: 0.7 !important;
                }
                .carousel-arrow:hover {
                    opacity: 1 !important;
                    background-color: rgba(0, 243, 255, 0.3) !important;
                    border-color: var(--primary-color) !important;
                }
                @media (max-width: 768px) {
                    .spotlight-carousel {
                        height: 80vh !important;
                    }
                    .spotlight-content {
                        padding-top: 100px !important;
                        align-items: flex-start !important;
                    }
                    .spotlight-title {
                        font-size: 3rem !important;
                        margin-bottom: 20px !important;
                    }
                    .spotlight-description {
                        font-size: 1rem !important;
                        margin-bottom: 30px !important;
                    }
                    .spotlight-badge {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 10px !important;
                    }
                    .spotlight-buttons {
                        flex-direction: column !important;
                        width: 100% !important;
                    }
                    .btn-play, .btn-info {
                        width: 100% !important;
                        justify-content: center !important;
                        padding: 12px !important;
                    }
                    .spotlight-side-detail {
                        display: none !important;
                    }
                    .carousel-arrow {
                        display: none !important;
                    }
                    .carousel-dots {
                        bottom: 20px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default SpotlightCarousel;
