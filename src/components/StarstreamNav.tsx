import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StarstreamNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, login, logout, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="starstream-nav" style={{
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <Link to="/">
          <img
            src="/assets/images/starstream_logo_new.png"
            alt="STARSTREAM"
            className="nav-logo"
            style={{
              height: '40px',
              cursor: 'pointer',
              filter: 'drop-shadow(0 0 5px rgba(0, 243, 255, 0.2))'
            }}
          />
        </Link>

        <ul className="nav-links" style={{ display: 'flex', gap: '25px', fontSize: '0.9rem', fontWeight: 500 }}>
          <li className="nav-link"><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
          <li className="nav-link hide-mobile">Originals</li>
          <li className="nav-link">Catalog</li>
          <li className="nav-link hide-mobile">New & Popular</li>
          <li className="nav-link hide-mobile">My List</li>
        </ul>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ cursor: 'pointer', fontSize: '1.2rem', opacity: 0.8 }} className="hide-mobile">🔍</div>

        {isLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }} className="hide-mobile">
              AGENT: {user?.email?.split('@')[0].toUpperCase()}
            </span>
            <div
              onClick={logout}
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '2px solid var(--primary-color)',
                boxShadow: '0 0 10px rgba(0, 243, 255, 0.3)'
              }}>
              <img
                src="/assets/images/demon_time_clean_v2.png"
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <button
              onClick={logout}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                fontSize: '0.7rem',
                padding: '5px 10px',
                cursor: 'pointer',
                borderRadius: '2px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>Sign Out</button>
          </div>
        ) : (
          <button
            onClick={login}
            style={{
              backgroundColor: 'var(--primary-color)',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.8rem',
              padding: '8px 20px',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 0 15px rgba(0, 243, 255, 0.4)'
            }}>Sign In</button>
        )}
      </div>

      <style>{`
        .nav-link {
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
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
        @media (max-width: 768px) {
          .nav-logo {
            height: 25px !important;
          }
          .nav-links {
            gap: 15px !important;
            font-size: 0.8rem !important;
          }
          .hide-mobile {
            display: none !important;
          }
          .starstream-nav {
            height: 60px !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default StarstreamNav;
