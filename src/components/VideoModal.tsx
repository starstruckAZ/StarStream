import React, { useState, useEffect, useRef } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import Paywall from './Paywall';

interface ContentItem {
    id: string;
    title: string;
    video?: string;
}

interface VideoModalProps {
    item: ContentItem | null;
    isLocked: boolean;
    onUnlock: (price: number) => void;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ item, isLocked, onUnlock, onClose }) => {
    const [playingIntro, setPlayingIntro] = useState(true);
    const playerRef = useRef<any>(null);

    // Reset intro state when item changes
    useEffect(() => {
        setPlayingIntro(true);
    }, [item]);

    // Automatic fullscreen removed as requested
    useEffect(() => {
        // Fullscreen logic disabled
    }, [isLocked, playingIntro, item]);

    if (!item) return null;

    const INTRO_ID = "HNSLJVt00QAwWSogvq1S5KyflKc4DxKO9OLk9jCSgRHA";

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontSize: '2rem',
                    zIndex: 2100,
                    opacity: 0.4,
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.4'}
            >✕</button>

            {isLocked ? (
                <Paywall
                    itemTitle={item.title}
                    onUnlock={onUnlock}
                    onClose={onClose}
                />
            ) : (
                <div style={{ width: '100%', height: '100%' }}>
                    <MuxPlayer
                        ref={playerRef}
                        playbackId={playingIntro ? INTRO_ID : item.video}
                        metadataVideoTitle={playingIntro ? "Starstream Intro" : item.title}
                        autoPlay
                        muted={false} // Unmuted as requested, interaction required for unmuted autoplay
                        onEnded={() => playingIntro && setPlayingIntro(false)}
                        primaryColor="#00F3FF"
                        style={{ width: '100%', height: '100%' }}
                        streamType="on-demand"
                        defaultHiddenCaptions
                    />

                    {/* Decorative glitch scanlines (only visible during video playback) */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.05,
                        pointerEvents: 'none',
                        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                        backgroundSize: '100% 2px, 3px 100%',
                        zIndex: 2050
                    }}></div>

                    {playingIntro && (
                        <div style={{
                            position: 'absolute',
                            bottom: '10%',
                            right: '5%',
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: '0.8rem',
                            letterSpacing: '2px',
                            pointerEvents: 'none',
                            textTransform: 'uppercase',
                            zIndex: 2060
                        }}>Starstream Cinematic Presentation</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoModal;
