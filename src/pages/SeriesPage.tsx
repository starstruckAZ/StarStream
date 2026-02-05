import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StarstreamNav from '../components/StarstreamNav';

interface Episode {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
    video: string; // Mux Playback ID
    duration?: string;
}

interface Series {
    id: string;
    title: string;
    description: string;
    banner: string;
    episodes: Episode[];
}

const SeriesPage: React.FC<{ onPlay: (item: any) => void }> = ({ onPlay }) => {
    const { seriesId } = useParams();
    const navigate = useNavigate();

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [seriesId]);

    // SERIES DATA
    const seriesData: Record<string, Series> = {
        'cosmic-creatives': {
            id: 'cosmic-creatives',
            title: 'Cosmic Creatives',
            description: 'Join hosts Jaron Ikner and Voodooeyes as they warp into the psyches of stars-in-the-making. This interview series explores the journeys, creative processes, and cosmic origins of extraordinary artists.',
            banner: '/assets/images/official/Cosmic Creatives Thumbnail.png', // Needs upload
            episodes: [
                {
                    id: 'cc-ep1',
                    title: 'Episode 1: Daviphresh',
                    description: 'The Maryvale Wolf himself. Discover how the unique and challenging environment of Maryvale shaped his identity and nurtured his passion for rap.',
                    video: 'PLAYBACK_ID_1',
                    duration: '45m'
                },
                {
                    id: 'cc-ep2',
                    title: 'Episode 2: Tay Da Crown',
                    description: 'Straight out of Surprise, Arizona. Tay Da Crown channels his family\'s legacy through his powerful lyrics and expanding fashion empire.',
                    video: 'PLAYBACK_ID_2',
                    duration: '38m'
                },
                {
                    id: 'cc-ep3',
                    title: 'Episode 3: Rocadopolis',
                    description: 'From the Matthew Henson projects to performing with Ice Cube. Dopo discusses community activism and juggling music with business.',
                    video: 'PLAYBACK_ID_3',
                    duration: '42m'
                },
                {
                    id: 'cc-ep4',
                    title: 'Episode 4: Antsoul',
                    description: 'An original Cali-creation landing in the Arizona desert. AntSoul unveils the celestial sonnets embedded in his heart.',
                    video: 'PLAYBACK_ID_4',
                    duration: '40m'
                },
                {
                    id: 'cc-ep5',
                    title: 'Episode 5: Ambition',
                    description: 'A multi-talented force from San Diego. We explore her experiences as a female rapper in a male-dominated industry.',
                    video: 'PLAYBACK_ID_5',
                    duration: '41m'
                },
                {
                    id: 'cc-ep6',
                    title: 'Episode 6: ThatKidMav',
                    description: 'A lyrical odyssey with a nomadic rapper. Explore the interplay between creativity and global personal experience.',
                    video: 'PLAYBACK_ID_6',
                    duration: '39m'
                },
                {
                    id: 'cc-ep7',
                    title: 'Episode 7: Jaaé',
                    description: 'An intimate look into the unique experiences of navigating the industry as an independent and non-binary artist.',
                    video: 'PLAYBACK_ID_7',
                    duration: '44m'
                },
                {
                    id: 'cc-ep8',
                    title: 'Episode 8: Wolfzie',
                    description: 'Musician, DJ, and visionary designer behind Homebody Friends. A captivating journey of versatility.',
                    video: 'PLAYBACK_ID_8',
                    duration: '37m'
                }
            ]
        },
        'moire': {
            id: 'moire',
            title: 'Moiré',
            description: 'An experimental episodic series causing visual interference patterns in the fabric of reality.',
            banner: '/assets/images/official/Moire Thumbnail.png', // Needs upload
            episodes: [
                // Placeholder episodes until details provided
                { id: 'm-ep1', title: 'Chapter I: Pattern', description: 'The interference begins.', video: 'MOIRE_ID_1' }
            ]
        }
    };

    const series = seriesId ? seriesData[seriesId] : null;

    if (!series) {
        return <div style={{ color: '#fff', padding: '100px', textAlign: 'center' }}>Series Not Found</div>;
    }

    return (
        <div style={{ backgroundColor: '#050505', minHeight: '100vh', paddingBottom: '100px' }}>
            <StarstreamNav />

            {/* Hero Section */}
            <div style={{
                position: 'relative',
                height: '60vh',
                width: '100%',
                backgroundImage: `url("${series.banner}")`, // Fallback or user provided asset
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-end'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,1) 100%)'
                }}></div>

                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    padding: '40px 4%',
                    maxWidth: '1200px'
                }}>
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: 900,
                        color: '#fff',
                        textTransform: 'uppercase',
                        marginBottom: '15px'
                    }}>{series.title}</h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#ddd',
                        maxWidth: '600px',
                        lineHeight: 1.6
                    }}>{series.description}</p>
                </div>
            </div>

            {/* Episodes List */}
            <div style={{ padding: '0 4%', maxWidth: '1400px', margin: '0 auto' }}>
                <h2 style={{
                    color: 'var(--primary-color)',
                    fontSize: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: '30px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '15px'
                }}>Episodes</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {series.episodes.map((ep, index) => (
                        <div
                            key={ep.id}
                            onClick={() => onPlay({ ...ep, poster: series.banner })} // Reuse banner as poster for now
                            style={{
                                display: 'flex',
                                gap: '20px',
                                padding: '20px',
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                border: '1px solid transparent'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.border = '1px solid rgba(0, 243, 255, 0.3)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                                e.currentTarget.style.border = '1px solid transparent';
                            }}
                        >
                            <div style={{
                                minWidth: '200px',
                                height: '112px',
                                backgroundColor: '#111',
                                backgroundImage: `url("${ep.thumbnail || series.banner}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '2px',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '5px',
                                    right: '5px',
                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                    color: '#fff',
                                    fontSize: '0.75rem',
                                    padding: '2px 5px',
                                    borderRadius: '2px'
                                }}>{ep.duration || '00:00'}</div>

                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: '#fff',
                                    fontSize: '2rem',
                                    opacity: 0.8
                                }}>▶</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 style={{ color: '#fff', marginBottom: '8px', fontSize: '1.1rem' }}>{ep.title}</h3>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.4 }}>{ep.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SeriesPage;
