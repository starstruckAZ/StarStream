import React, { useState } from 'react';

interface ContentItem {
    id: string;
    title: string;
    poster: string;
    video?: string;
    isComingSoon?: boolean;
    type?: 'series' | 'movie';
}

interface PosterRowProps {
    title: string;
    items: ContentItem[];
    onSelect: (item: ContentItem) => void;
}

const PosterRow: React.FC<PosterRowProps> = ({ title, items, onSelect }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="poster-row-container" style={{
            padding: '30px 0 40px 0',
            position: 'relative'
        }}>
            <h3 className="poster-row-title" style={{
                fontSize: '1.6rem',
                marginBottom: '20px',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                paddingLeft: '4%'
            }}>
                {title}
                <span style={{
                    height: '2px',
                    flex: 1,
                    background: 'linear-gradient(to right, rgba(255,255,255,0.1), transparent)',
                    marginRight: '4%'
                }}></span>
            </h3>

            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => scroll('left')}
                    className="scroll-btn left"
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: '20px',
                        width: '4%',
                        zIndex: 200,
                        background: 'linear-gradient(to right, rgba(5,5,5,0.9), transparent)',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    ‹
                </button>

                <div
                    ref={scrollRef}
                    className="poster-scroll-container"
                    style={{
                        display: 'flex',
                        gap: '12px',
                        overflowX: 'auto',
                        padding: '0 4% 20px 4%',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        scrollBehavior: 'smooth'
                    }}
                >
                    {items.map((item) => (
                        <Poster key={item.id} item={item} onSelect={onSelect} />
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="scroll-btn right"
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: '20px',
                        width: '4%',
                        zIndex: 200,
                        background: 'linear-gradient(to left, rgba(5,5,5,0.9), transparent)',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    ›
                </button>
            </div>

            <style>{`
                .poster-row-container:hover .scroll-btn {
                    opacity: 1 !important;
                }
                .scroll-btn:hover {
                    background: linear-gradient(to right, rgba(0, 243, 255, 0.2), transparent) !important;
                }
                .scroll-btn.right:hover {
                    background: linear-gradient(to left, rgba(0, 243, 255, 0.2), transparent) !important;
                }
                .poster-scroll-container::-webkit-scrollbar {
                    display: none;
                }
                @media (max-width: 768px) {
                    .poster-row-container {
                        padding: 20px 0 30px 0 !important;
                    }
                    .poster-row-title {
                        font-size: 1.1rem !important;
                        margin-bottom: 15px !important;
                    }
                    .scroll-btn {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

const Poster = React.memo(({ item, onSelect }: { item: ContentItem; onSelect: (item: ContentItem) => void }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onClick={() => !item.isComingSoon && onSelect(item)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="poster-card"
            style={{
                flex: '0 0 auto',
                width: '320px',
                aspectRatio: '16/9',
                backgroundColor: '#0a0a0a',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: item.isComingSoon ? 'default' : 'pointer',
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                position: 'relative',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                zIndex: isHovered ? 100 : 1,
                boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.8)' : '0 4px 10px rgba(0,0,0,0.3)',
                border: isHovered ? '2px solid var(--primary-color)' : '1px solid rgba(255,255,255,0.05)'
            }}>
            <img
                src={item.poster}
                alt={item.title}
                loading="lazy"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.4s ease',
                    filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9)',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                }}
            />

            <div className="poster-title-overlay" style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                padding: '30px 15px 15px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                opacity: isHovered ? 0 : 1,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
            }}>
                <div style={{
                    fontSize: item.poster.includes('/branding/') ? '1.4rem' : '1rem',
                    fontWeight: 900,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: item.poster.includes('/branding/') ? '2px' : '0px',
                    lineHeight: '1.1',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                    WebkitTextStroke: item.poster.includes('/branding/') ? '0.5px rgba(255,255,255,0.2)' : 'none',
                    fontFamily: "'Outfit', sans-serif"
                }}>
                    {item.title}
                </div>
            </div>

            {isHovered && (
                <div className="poster-hover-overlay" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    textAlign: 'center',
                    backdropFilter: 'blur(3px)',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    {item.isComingSoon ? (
                        <div style={{
                            padding: '8px 20px',
                            backgroundColor: 'var(--primary-color)',
                            color: '#000',
                            fontWeight: 900,
                            fontSize: '0.9rem',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            borderRadius: '2px',
                            boxShadow: '0 0 20px var(--primary-color)'
                        }}>
                            COMING SOON
                        </div>
                    ) : (
                        <>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                border: '2px solid #fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '10px'
                            }}>
                                <span style={{ fontSize: '1.2rem', marginLeft: '3px' }}>▶</span>
                            </div>
                            <div style={{ fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase' }}>
                                {item.title}
                            </div>
                        </>
                    )}
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @media (max-width: 768px) {
                    .poster-card {
                        width: 220px !important;
                        transform: none !important;
                    }
                    .poster-title-overlay div {
                        font-size: 0.8rem !important;
                    }
                }
            `}</style>
        </div>
    );
});

export default PosterRow;
