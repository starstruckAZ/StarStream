import React from 'react';

const SkeletonPoster: React.FC = () => {
    return (
        <div className="skeleton-poster" style={{
            flex: '0 0 auto',
            width: '320px',
            aspectRatio: '16/9',
            backgroundColor: '#111',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div className="shimmer-wrapper">
                <div className="shimmer"></div>
            </div>
            <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '15px',
                width: '60%',
                height: '15px',
                backgroundColor: '#222',
                borderRadius: '2px'
            }}></div>
            <style>{`
                .skeleton-poster {
                    position: relative;
                }
                .shimmer-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    animation: loading 1.5s infinite linear;
                }
                .shimmer {
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(
                        to right,
                        transparent 0%,
                        rgba(255, 255, 255, 0.03) 50%,
                        transparent 100%
                    );
                    transform: skewX(-20deg);
                }
                @keyframes loading {
                    0% { transform: translateX(-150%); }
                    100% { transform: translateX(150%); }
                }
                @media (max-width: 768px) {
                    .skeleton-poster {
                        width: 220px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default SkeletonPoster;
