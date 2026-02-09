import React, { useEffect, useRef } from 'react';

interface ContentItem {
    id: string;
    title: string;
    poster: string;
    video?: string;
    isComingSoon?: boolean;
    type?: 'series' | 'movie';
    description?: string;
    year?: string;
    rating?: string;
    duration?: string;
    cast?: string[];
    genre?: string[];
}

interface ContentDetailModalProps {
    item: ContentItem | null;
    isOpen: boolean;
    onClose: () => void;
    onPlay: (item: ContentItem) => void;
    isInMyList?: boolean;
    onToggleMyList?: (id: string) => void;
    relatedItems?: ContentItem[];
}

// Default descriptions for content that doesn't have one
const getDefaultDescription = (title: string): string => {
    const descriptions: Record<string, string> = {
        'WISHES ARE NEVER PERFECT': 'Genies don\'t retire. They just get recycled. Join Noraj as he pulls back the veil on the 3,000-year cycle of the lamp and the chaos of human existence.',
        'THE 360 VIEW': 'A groundbreaking interdimensional talk show that offers perspectives from every angle of reality. Hosts from parallel dimensions discuss the issues that matter across the multiverse.',
        'DEMON TIME': 'When the clock strikes midnight, the veil between worlds thins. A supernatural thriller that explores what happens when dark forces breach our dimension.',
        'IMPOSSIBLE COLORS': 'In a world where color determines power, one artist discovers pigments that shouldn\'t exist—and the dangerous entities that guard them.',
        'THE LAST LAUGH': 'Comedy has consequences in this dark satire where a comedian\'s jokes literally reshape reality.',
        'BUCKETLISTING': 'A dying man races against time to complete his bucket list, but discovers each item unlocks a doorway to a parallel life.',
        'WHEN THE SUN SETS': 'From visionary director Jaron Ikner comes a meditation on endings, beginnings, and the golden hour between.',
        'HIGH HARD 3: HIGH THE HARD WAY': 'The trilogy concludes with high stakes and even higher altitudes in this action-packed finale.',
        'CONTINUUM': 'Time isn\'t a line—it\'s a loop. And someone has found how to break it.',
        'MOIREE': 'Patterns within patterns reveal the hidden architecture of reality in this mind-bending series.',
        'MADNESS': 'The line between genius and insanity blurs in this psychological exploration of creative obsession.',
        'THANKS FOR PLAYING': 'Game over means something different when the game is life itself.',
        'MENTAL': 'An unflinching look at the mind\'s labyrinth and those who navigate its darkest corridors.',
        'PARADOX HOTEL': 'Check in anytime, but you can never leave the same way twice. A temporal mystery unfolds.',
        'COSMIC CREATIVES': 'Artists from across the galaxy compete to create works that transcend dimensional boundaries.',
        'DIMENSION STRIKE': 'Elite warriors trained in cross-dimensional combat face their deadliest mission yet.',
    };
    return descriptions[title] || 'A Starstream exclusive. Available now for streaming.';
};

const ContentDetailModal: React.FC<ContentDetailModalProps> = ({
    item,
    isOpen,
    onClose,
    onPlay,
    isInMyList = false,
    onToggleMyList,
    relatedItems = []
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle ESC key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen || !item) return null;

    const description = item.description || getDefaultDescription(item.title);

    return (
        <div
            className="detail-modal-backdrop"
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(10px)',
                zIndex: 1500,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                animation: 'fadeIn 0.3s ease-out'
            }}
        >
            <div
                ref={modalRef}
                className="detail-modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '90%',
                    maxWidth: '900px',
                    maxHeight: '90vh',
                    backgroundColor: '#0a0a0a',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                {/* Hero Image Section */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden'
                }}>
                    <img
                        src={item.poster}
                        alt={item.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    {/* Gradient overlay */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '80%',
                        background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.8) 50%, transparent 100%)'
                    }}></div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            border: 'none',
                            color: '#fff',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            zIndex: 10
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'}
                    >
                        ✕
                    </button>

                    {/* Title overlay on image */}
                    <div style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: '40px',
                        right: '40px',
                        zIndex: 5
                    }}>
                        <h1 style={{
                            fontSize: '3rem',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '-1px',
                            marginBottom: '20px',
                            textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                        }}>
                            {item.title}
                        </h1>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => !item.isComingSoon && onPlay(item)}
                                disabled={item.isComingSoon}
                                style={{
                                    padding: '14px 40px',
                                    backgroundColor: item.isComingSoon ? '#333' : '#fff',
                                    color: item.isComingSoon ? '#888' : '#000',
                                    fontWeight: 900,
                                    fontSize: '1rem',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: item.isComingSoon ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>▶</span>
                                {item.isComingSoon ? 'COMING SOON' : 'PLAY'}
                            </button>

                            {onToggleMyList && (
                                <button
                                    onClick={() => onToggleMyList(item.id)}
                                    style={{
                                        padding: '14px 30px',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        color: '#fff',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                                >
                                    {isInMyList ? '✓ IN MY LIST' : '+ MY LIST'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div style={{
                    padding: '30px 40px 40px',
                    overflowY: 'auto',
                    maxHeight: 'calc(90vh - 56.25vw + 100px)' // Adjust based on aspect ratio
                }}>
                    {/* Meta info row */}
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        marginBottom: '20px',
                        color: 'var(--primary-color)',
                        fontSize: '0.9rem',
                        fontWeight: 600
                    }}>
                        <span>{item.year || '2026'}</span>
                        <span style={{ opacity: 0.5 }}>|</span>
                        <span>{item.rating || 'TV-MA'}</span>
                        <span style={{ opacity: 0.5 }}>|</span>
                        <span>{item.duration || '1h 45m'}</span>
                        {item.type === 'series' && (
                            <>
                                <span style={{ opacity: 0.5 }}>|</span>
                                <span>SERIES</span>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <p style={{
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        color: '#ccc',
                        marginBottom: '30px',
                        maxWidth: '700px'
                    }}>
                        {description}
                    </p>

                    {/* Genre tags */}
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        flexWrap: 'wrap',
                        marginBottom: '30px'
                    }}>
                        {(item.genre || ['Sci-Fi', 'Drama', 'Thriller']).map((g, i) => (
                            <span key={i} style={{
                                padding: '6px 16px',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                color: '#999'
                            }}>
                                {g}
                            </span>
                        ))}
                    </div>

                    {/* Related Content */}
                    {relatedItems.length > 0 && (
                        <div>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                marginBottom: '15px',
                                color: '#fff'
                            }}>
                                More Like This
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                                gap: '15px'
                            }}>
                                {relatedItems.slice(0, 4).map((related) => (
                                    <div
                                        key={related.id}
                                        onClick={() => {
                                            onClose();
                                            setTimeout(() => onPlay(related), 100);
                                        }}
                                        style={{
                                            aspectRatio: '16/9',
                                            borderRadius: '4px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <img
                                            src={related.poster}
                                            alt={related.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @media (max-width: 768px) {
                    .detail-modal-content {
                        width: 100% !important;
                        height: 100% !important;
                        max-height: 100vh !important;
                        border-radius: 0 !important;
                    }
                    .detail-modal-content h1 {
                        font-size: 1.8rem !important;
                    }
                    .detail-modal-content > div:first-child {
                        aspect-ratio: 4/3 !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ContentDetailModal;
