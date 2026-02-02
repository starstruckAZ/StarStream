import { useState, useEffect } from 'react';

const StarstreamNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 4%',
      zIndex: 1000,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      background: isScrolled
        ? 'rgba(5, 5, 5, 0.95)'
        : 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
        <img
          src="/assets/images/starstream_logo_new.png"
          alt="STARSTREAM"
          style={{
            height: '40px',
            cursor: 'pointer',
            filter: 'drop-shadow(0 0 5px rgba(0, 243, 255, 0.2))'
          }}
        />

        <ul style={{ display: 'flex', gap: '25px', fontSize: '0.9rem', fontWeight: 500 }}>
          <li className="nav-link">Home</li>
          <li className="nav-link">Originals</li>
          <li className="nav-link">Catalog</li>
          <li className="nav-link">New & Popular</li>
          <li className="nav-link">My List</li>
        </ul>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <div style={{ cursor: 'pointer', fontSize: '1.2rem', opacity: 0.8 }}>🔍</div>
        <div style={{ cursor: 'pointer', fontSize: '1.2rem', opacity: 0.8 }}>🔔</div>
        <div style={{
          width: '35px',
          height: '35px',
          borderRadius: '4px',
          overflow: 'hidden',
          cursor: 'pointer',
          border: '2px solid rgba(255,255,255,0.1)'
        }}>
          <img
            src="/assets/images/demon_time_clean_v2.png"
            alt="Profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <style>{`
        .nav-link {
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.3s ease;
          position: relative;
        }
        .nav-link:hover {
          opacity: 1;
        }
        .nav-link:after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-color);
          transition: width 0.3s ease;
        }
        .nav-link:hover:after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
};

export default StarstreamNav;
