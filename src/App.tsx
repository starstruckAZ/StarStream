import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarstreamNav from './components/StarstreamNav';
import Hero from './components/Hero';
import PosterRow from './components/PosterRow';
import VideoModal from './components/VideoModal';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

interface ContentItem {
  id: string;
  title: string;
  poster: string;
  video: string;
  isComingSoon?: boolean;
}

const MovieCatalog = () => {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [collectionUnlocked, setCollectionUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // STRIPE_PUBLISHABLE_KEY from env
  const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    const isUnlocked = localStorage.getItem('starstream_directors_cut_unlocked') === 'true';
    setCollectionUnlocked(isUnlocked);

    return () => clearTimeout(timer);
  }, []);

  const handleUnlockCollection = async (price: number) => {
    console.log(`Initializing backend checkout for $${price}...`);

    try {
      const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
      if (!stripe) throw new Error("Stripe failed to initialize.");

      // Call our Airtight Secure Netlify Function
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price,
          itemTitle: selectedItem?.title || "Jaron Ikner Collection"
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      if (session.url) {
        // Modern, secure redirection directly to the Stripe-hosted URL
        window.location.href = session.url;
      } else {
        throw new Error("Failed to generate checkout URL.");
      }
    } catch (e: any) {
      console.error("Payment initialization failed", e);
      alert(`Security Error: ${e.message}. \n\nNote: If you are testing locally, make sure you are running 'netlify dev' to support backend functions.`);
    }
  };

  const isItemLocked = (itemId: string) => {
    const premiumIds = ['madness', 'tfp', 'mental', 'paradox'];
    return premiumIds.includes(itemId) && !collectionUnlocked;
  };

  useEffect(() => {
    if (!isLoading && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser", e));
    }
  }, [isLoading]);

  const mainFilm = {
    id: 'wanp',
    title: 'Wishes Are Never Perfect',
    poster: '/assets/images/the_360_view.jpg',
    video: '/assets/videos/demon_time_clip.mp4'
  };

  const trending = [
    { id: 'dt', title: 'DEMON TIME', poster: '/assets/images/demon_time_thumb.jpg', video: '/assets/videos/demon_time_clip.mp4' },
    { id: 'ic', title: 'IMPOSSIBLE COLORS', poster: '/assets/images/impossible_colors.jpg', video: '/assets/videos/impossible_colors_trailer.mp4' },
    { id: 'sn', title: 'SEASONED', poster: '/assets/images/seasoned_thumb_official.jpg', video: '/assets/videos/seasoned_trailer.mp4' },
    { id: 'tll', title: 'THE LAST LAUGH', poster: '/assets/images/last_laugh_thumb.jpg', video: '/assets/videos/last_laugh_trailer.mp4' },
    { id: 'bl', title: 'BUCKETLISTING', poster: '/assets/images/bucketlisting_thumb_official.jpg', video: '/assets/videos/bucketlisting_trailer.mp4' },
  ];

  const directorsCut = [
    { id: 'madness', title: 'MADNESS', poster: '/assets/images/madness_thumb.jpg', video: '/assets/videos/madness_short.mp4' },
    { id: 'tfp', title: 'THANKS FOR PLAYING', poster: '/assets/images/thanks_for_playing_thumb.webp', video: '/assets/videos/thanks_for_playing_short.mp4' },
    { id: 'mental', title: 'MENTAL', poster: '/assets/images/mental_thumb.jpg', video: '' },
    { id: 'paradox', title: 'PARADOX HOTEL', poster: '/assets/images/paradox_hotel_thumb.jpeg', video: '/assets/videos/paradox_hotel_short.mp4' },
  ];

  const actionMovies = [
    { id: 'action1', title: 'DIMENSION STRIKE', poster: '/assets/images/dimension_strike_official.png', video: '', isComingSoon: true },
    { id: 'action2', title: 'VOID COMBAT', poster: '/assets/images/void_combat_official.png', video: '', isComingSoon: true },
    { id: 'action3', title: 'MULTIVERSE MERCENARIES', poster: '/assets/images/branding/merc_war.png', video: '', isComingSoon: true },
    { id: 'action4', title: 'PORTAL HOPPERS', poster: '/assets/images/branding/portal_hoppers.png', video: '', isComingSoon: true },
  ];

  const adultRomance = [
    { id: 'rom1', title: 'FORBIDDEN REALITY', poster: '/assets/images/branding/forbidden_reality.png', video: '', isComingSoon: true },
    { id: 'rom2', title: 'QUANTUM LOVE', poster: '/assets/images/branding/quantum_love.png', video: '', isComingSoon: true },
    { id: 'rom3', title: 'THE LAST DATE', poster: '/assets/images/branding/last_date.png', video: '', isComingSoon: true },
    { id: 'rom4', title: 'DATING MY DOPPELGANGER', poster: '/assets/images/branding/dating_monster.png', video: '', isComingSoon: true },
  ];

  const outrageousReality = [
    { id: 'reality2', title: 'GHOST HUNTING WITH GLITCHES', poster: '/assets/images/branding/ghost_hunting.png', video: '', isComingSoon: true },
    { id: 'reality3', title: 'ULTIMATE TOILET RACING', poster: '/assets/images/branding/toilet_racing.png', video: '', isComingSoon: true },
    { id: 'reality4', title: 'KITCHEN CHAOS: QUANTUM EDITION', poster: '/assets/images/branding/cooking_chaos.png', video: '', isComingSoon: true },
    { id: 'extreme3', title: 'BURGER KING OF THE VOID', poster: '/assets/images/branding/burger_king.png', video: '', isComingSoon: true },
  ];

  const extremeMultiverse = [
    { id: 'extreme1', title: 'ELDERLY SKATE EXTREME', poster: '/assets/images/branding/extreme_skate.png', video: '', isComingSoon: true },
    { id: 'extreme2', title: 'CAT FIGHT: CLAW OF REALITY', poster: '/assets/images/branding/cat_fight.png', video: '', isComingSoon: true },
    { id: 'extreme4', title: 'STANK: THE MUSICAL', poster: '/assets/images/branding/stank_show.png', video: '', isComingSoon: true },
    { id: 'bb', title: 'STARSTREAM SPORT: BUBBLE WRAP', poster: '/assets/images/branding/bubble_wrap.png', video: '', isComingSoon: true },
  ];

  const comedyShows = [
    { id: 'comedy1', title: 'JARON IKNER: VOID OF LAUGHTER', poster: '/assets/images/branding/comedy_void.png', video: '', isComingSoon: true },
    { id: 'comedy2', title: 'ADDY-OS LIVE', poster: '/assets/images/branding/addy_os.png', video: '', isComingSoon: true },
    { id: 'comedy3', title: 'MULTIVERSE OPEN MIC', poster: '/assets/images/branding/open_mic.png', video: '', isComingSoon: true },
    { id: 'comedy4', title: 'GLITCH IN THE GAG', poster: '/assets/images/branding/glitch_gag.png', video: '', isComingSoon: true },
  ];

  const originals = [
    { id: 'noir', title: 'NEON CITY NOIR', poster: '/assets/images/branding/neon_noir.png', video: '', isComingSoon: true },
    { id: 'realm', title: 'QUANTUM REALM', poster: '/assets/images/branding/quantum_realm.png', video: '', isComingSoon: true },
    { id: 'portal', title: 'BEYOND THE GATE', poster: '/assets/images/branding/beyond_gate.png', video: '', isComingSoon: true },
    { id: 'horror', title: 'VOID WHISPERERS', poster: '/assets/images/branding/void_whisperers.png', video: '', isComingSoon: true },
    { id: 'legal', title: 'CAUL RAUL: LEGAL REALITY', poster: '/assets/images/branding/caul_raul.png', video: '', isComingSoon: true },
  ];

  const multiverse = [
    { id: 'tech', title: 'CHRONO-TECH WEEKLY', poster: '/assets/images/branding/chrono_tech.png', video: '', isComingSoon: true },
    { id: 'desert', title: 'THE SILENT WASTES', poster: '/assets/images/branding/silent_wastes.png', video: '', isComingSoon: true },
    { id: 'cf', title: 'CHRONOFLEX: SYNCHRONIZE', poster: '/assets/images/branding/chronoflex.png', video: '/assets/videos/chronoflex_ad.mp4' },
    { id: 'sn_old', title: 'SEASONED (CLASSIC)', poster: '/assets/images/branding/seasoned_classic.png', video: '/assets/videos/seasoned_trailer.mp4' },
    { id: '360_v2', title: 'NORAJ UNFILTERED', poster: '/assets/images/branding/niraj_unfiltered.png', video: '/assets/videos/wanp_trailer.mp4' },
  ];

  return (
    <div style={{ paddingBottom: '100px', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <StarstreamNav />
      <div id="top"></div>
      <Hero onPlay={() => setSelectedItem(mainFilm)} />

      <div style={{ marginTop: '-140px', position: 'relative', zIndex: 20 }}>
        <PosterRow
          title="Trending on Starstream"
          items={trending}
          onSelect={(item) => setSelectedItem(item as ContentItem)}
        />

        <PosterRow
          title="Director's Cut: Jaron Ikner"
          items={directorsCut}
          onSelect={(item) => setSelectedItem(item as ContentItem)}
        />

        <PosterRow
          title="Heavy Action & Cinematic Combat"
          items={actionMovies}
          onSelect={(item) => setSelectedItem(item as ContentItem)}
        />

        <PosterRow
          title="Late Night: Forbidden Reality"
          items={adultRomance}
          onSelect={(item) => setSelectedItem(item as ContentItem)}
        />

        <PosterRow
          title="Outrageous Reality"
          items={outrageousReality}
          onSelect={(item) => setSelectedItem(item as ContentItem)}
        />

        <PosterRow
          title="Extreme Multiverse Sports"
          items={extremeMultiverse}
          onSelect={(item) => setSelectedItem(item as ContentItem)}
        />

        <PosterRow
          title="High-Dimensional Comedy"
          items={comedyShows}
          onSelect={(item) => setSelectedItem(item as ContentItem)}
        />

        <PosterRow
          title="Starstream Originals"
          items={originals}
          onSelect={(item) => setSelectedItem(item as ContentItem)}
        />

        {/* Dynamation Recruitment Ad */}
        <div className="recruitment-ad" style={{
          margin: '100px 4%',
          padding: '80px',
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 243, 255, 0.15)',
          display: 'flex',
          gap: '80px',
          alignItems: 'center',
          borderRadius: '4px',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '150%',
            height: '150%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(0, 243, 255, 0.05) 0%, transparent 70%)',
            animation: 'pulse 8s infinite ease-in-out'
          }}></div>

          <div style={{ flex: 1, position: 'relative', zIndex: 5 }}>
            <h2 className="ad-title" style={{
              color: 'var(--primary-color)',
              fontSize: '3rem',
              fontWeight: 900,
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '8px',
              textShadow: '0 0 20px rgba(0, 243, 255, 0.4)'
            }}>DYNAMATION</h2>
            <div style={{ height: '2px', width: '60px', backgroundColor: 'var(--primary-color)', marginBottom: '30px' }}></div>
            <p className="ad-slogan" style={{ fontSize: '1.4rem', color: '#fff', fontStyle: 'italic', marginBottom: '15px', fontWeight: 300 }}>
              "We don't just study quantum reality. <br />We build it."
            </p>
            <p className="ad-desc" style={{ color: '#888', marginBottom: '40px', maxWidth: '500px', lineHeight: 1.6 }}>
              Eligible agents are needed for the Wellness City initiative.
              Join the team that turns possibility into progress.
            </p>
            <button className="ad-btn" style={{
              padding: '16px 50px',
              backgroundColor: 'var(--primary-color)',
              color: '#000',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 0 30px rgba(0, 243, 255, 0.3)'
            }}>Join the Core</button>
          </div>

          <div className="ad-video-container" style={{
            width: '550px',
            height: '310px',
            backgroundColor: '#000',
            borderRadius: '2px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            position: 'relative',
            zIndex: 5,
            boxShadow: '0 0 60px rgba(0, 0, 0, 0.8)'
          }}>
            <video src="/assets/videos/dynamation_recruitment.mp4" autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        <PosterRow
          title="Multiverse Catalog"
          items={multiverse}
          onSelect={(item) => setSelectedItem(item as ContentItem)}
        />
      </div>

      <VideoModal
        item={selectedItem}
        isLocked={selectedItem ? isItemLocked(selectedItem.id) : false}
        onUnlock={handleUnlockCollection}
        onClose={() => setSelectedItem(null)}
      />

      <footer className="starstream-footer" style={{
        padding: '120px 4% 80px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: '100px',
        color: '#444',
        fontSize: '0.9rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px'
      }}>
        <div className="footer-links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          <div className="footer-link">Audio Description</div>
          <div className="footer-link">Help Center</div>
          <div className="footer-link">Gift Cards</div>
          <div className="footer-link">Media Center</div>
          <div className="footer-link">Investor Relations</div>
          <div className="footer-link">Jobs</div>
          <div className="footer-link">Terms of Use</div>
          <div className="footer-link">Privacy</div>
          <div className="footer-link">Legal Notices</div>
          <div className="footer-link">Cookie Preferences</div>
          <div className="footer-link">Corporate Information</div>
          <div className="footer-link">Contact Us</div>
        </div>
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.6 }}>
          <div style={{ border: '1px solid #444', padding: '10px 20px', fontSize: '0.8rem', cursor: 'pointer' }}>Service Code: 882-XR</div>
          <div style={{ textAlign: 'right' }}>
            © 2026 Starstream Entertainment LLC. <br />
            <span style={{ fontSize: '0.7rem' }}>Dynamic Reality Compliance ID: 039X-99</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
        .footer-link:hover { color: #fff; cursor: pointer; }
        @media (max-width: 768px) {
          .recruitment-ad {
            flex-direction: column !important;
            padding: 40px 20px !important;
            gap: 40px !important;
            margin: 60px 4% !important;
            text-align: center !important;
          }
          .ad-title {
            font-size: 2rem !important;
            letter-spacing: 4px !important;
          }
          .ad-slogan {
            font-size: 1.1rem !important;
          }
          .ad-desc {
            font-size: 0.9rem !important;
            margin-bottom: 30px !important;
          }
          .ad-video-container {
            width: 100% !important;
            height: 200px !important;
          }
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            gap: 30px !important;
            text-align: center !important;
          }
          .footer-bottom > div {
            text-align: center !important;
          }
          .starstream-footer {
            padding: 60px 4% 40px !important;
            margin-top: 60px !important;
          }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieCatalog />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
};

export default App;
