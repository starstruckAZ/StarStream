import React, { useRef } from 'react';
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
    const videoRef = useRef<HTMLVideoElement>(null);

    if (!item) return null;

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
                    opacity: 0.7,
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer'
                }}>✕</button>

            {isLocked ? (
                <Paywall
                    itemTitle={item.title}
                    onUnlock={onUnlock}
                    onClose={onClose}
                />
            ) : (
                <video
                    ref={videoRef}
                    src={item.video || '/assets/videos/wanp_trailer.mp4'}
                    controls
                    autoPlay
                    style={{ width: '100%', maxHeight: '90vh' }}
                />
            )}

            {/* Decorative glitch scanlines */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.05,
                pointerEvents: 'none',
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%'
            }}></div>
        </div>
    );
};

export default VideoModal;
