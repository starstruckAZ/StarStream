import { useState, useEffect, useRef } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import StarstreamNav from './components/StarstreamNav';
import Hero from './components/Hero';
import PosterRow from './components/PosterRow';
import VideoModal from './components/VideoModal';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Login from './pages/Login';
import SeriesPage from './pages/SeriesPage';
import PremiumPopup from './components/PremiumPopup';

interface ContentItem {
  id: string;
  title: string;
  poster: string;
  video?: string;
  isComingSoon?: boolean;
  type?: 'series' | 'movie';
  category?: string; // Added category for filtering
}

const MovieCatalog = ({
  onPlay,
  searchQuery,
  myList,
  onToggleMyList
}: {
  onPlay: (item: ContentItem) => void;
  searchQuery: string;
  myList: string[];
  onToggleMyList: (id: string) => void;
}) => {
  const [hasPlayedIntro, setHasPlayedIntro] = useState(() => {
    return sessionStorage.getItem('starstream_intro_played') === 'true';
  });
  const [isLoading, setIsLoading] = useState(!hasPlayedIntro);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleIntroEnd = () => {
    setIsLoading(false);
    setHasPlayedIntro(true);
    sessionStorage.setItem('starstream_intro_played', 'true');
  };

  useEffect(() => {
    if (!isLoading && audioRef.current && !hasPlayedIntro) {
      audioRef.current.play().catch((e: any) => console.log("Audio play blocked by browser", e));
    }
  }, [isLoading, hasPlayedIntro]);

  const mainFilm = {
    id: 'wanp',
    title: 'Wishes Are Never Perfect',
    poster: '/assets/images/official/Wishes Are Never Perfect Banner.png',
    video: 'V93olU015zEi028o9vtjAc5dhQJ1DinyBpydmCrUFvEVY' // Mux Playback ID (Wishes Are Never Perfect - The Movie)
  };

  const trending = [
    { id: 'wanp-trending', title: 'WISHES ARE NEVER PERFECT', poster: '/assets/images/official/Wishes Are Never Perfect Banner.png', video: 'V93olU015zEi028o9vtjAc5dhQJ1DinyBpydmCrUFvEVY' },
    { id: 'view360', title: 'THE 360 VIEW', poster: '/assets/images/official/The 360 View Thumbnail.jpg', video: 'sKEAvV66KslcYAaLhohd2v00cZ01KvsruB8O0100L4K5bdI' },
    { id: 'dt', title: 'DEMON TIME', poster: '/assets/images/official/Demon time thumbnial.jpg', video: 'YZA02rdikzZ60001aiF39bP88es4mUNqlnIm8Cj7IyDkdQ' },
    { id: 'ic', title: 'IMPOSSIBLE COLORS', poster: '/assets/images/official/Impossible Colors Thumbnail.jpg', video: 'Y4eTqJ4NoekYw00ZNHBnnT4zUCnO00WTulowAWzj00WjZg' },
    { id: 'tll', title: 'THE LAST LAUGH', poster: '/assets/images/official/The Last Laugh Thumbnail.jpg', video: 'nvCffYy1kLkqIV1q006Esdds8yefqEm7KQNBNA8GXHDc' },
    { id: 'bl', title: 'BUCKETLISTING', poster: '/assets/images/official/bucketlisting thubnail.jpg', video: '7M00lmEu00pRdCN9FPJajYinvDR9F02l2ZjsSuwkRGjomQ' },
  ];

  const directorsCut = [
    { id: 'wtss', title: 'WHEN THE SUN SETS', poster: '/assets/images/official/When The Sun Sets Thumbnail.jpg', video: 'ZkiqfuLAaZgjqd02hZZPNXF02Hrmuxbuy3O1fsRu02d7lw' },
    { id: 'hh3', title: 'HIGH HARD 3: HIGH THE HARD WAY', poster: '/assets/images/official/High Hard 3 Thumbnail.jpg', video: 'co9uRH6ZJ01LslfDaOkP4i01xDOZ202IbXnpsAv7bh8ATc' },
    { id: 'continuum', title: 'CONTINUUM', poster: '/assets/images/official/Continuum Thumbnail.jpg', video: 'rd61V01009h7V01eWVrWSET2jrpYr6dCUcBM61KOiDo8t8' }, // Verified ID
    { id: 'moire', title: 'MOIREE', poster: '/assets/images/official/Moire Thumbnail.jpg', video: '', type: 'series' as const },
    { id: 'madness', title: 'MADNESS', poster: '/assets/images/official/Madness Thumbnail.jpg', video: '1ehcQBew1Ohr9VPPp1wahZoxMnK00BuGv29EoCqh9eyk' },
    { id: 'tfp', title: 'THANKS FOR PLAYING', poster: '/assets/images/official/Thanks For Playing Thumbnail.webp', video: 'UibDf00WSMbuYcR92iX9sEJ9uvHStZJZw2Urkg53Rfvw' },
    { id: 'mental', title: 'MENTAL', poster: '/assets/images/official/Mental thumbnail.jpg', video: 'D1edzBJ4YNqydGwFPO00oizQ023sQW9DROFK9N02p2ECoE' }, // Updated ID (A)
    { id: 'paradox', title: 'PARADOX HOTEL', poster: '/assets/images/official/Paradox Hotel Thumbnail.jpeg', video: '2I5USjY02GmhGXNTfzm89sAdSlNG4prlp9w8ZUtY9ecA' },
  ];

  const originalSeries = [
    { id: 'cosmic-creatives', title: 'COSMIC CREATIVES', poster: '/assets/images/official/Cosmic Creatives Thumbnail.png', video: '', type: 'series' as const },
  ];

  const actionMovies = [
    { id: 'action1', title: 'DIMENSION STRIKE', poster: '/assets/images/official/dimension strike thumbnail.png', video: 'bcLmzD4lboqsL93OB1BqrlNbEVtMEXtHHAOMqxY02Jnc' },
    { id: 'action2', title: 'VOID COMBAT', poster: '/assets/images/official/Void Combat Thumbnail.png', video: '', isComingSoon: true },
    { id: 'action3', title: 'MULTIVERSE MERCENARIES', poster: '/assets/images/official/Multiverse Mercenaries Thumbnail.png', video: '', isComingSoon: true },
    { id: 'action4', title: 'PORTAL HOPPERS', poster: '/assets/images/official/Portal Hoppers Thumbnail.png', video: '', isComingSoon: true },
  ];

  const adultRomance = [
    { id: 'rom1', title: 'FORBIDDEN REALITY', poster: '/assets/images/official/Forbidden Reality Thumbnail.png', video: '', isComingSoon: true },
    { id: 'rom2', title: 'QUANTUM LOVE', poster: '/assets/images/official/Quantum Love.png', video: '', isComingSoon: true },
    { id: 'rom3', title: 'THE LAST DATE', poster: '/assets/images/official/The Last Date Thumbnail.png', video: 'nB6pUoB3yRYsEsvC202pRTk6B5aB5mgFlMlggDkBFoo00' },
    { id: 'rom4', title: 'DATING MY DOPPELGANGER', poster: '/assets/images/official/Dating my Doppelganger Thumbnail.png', video: '', isComingSoon: true },
  ];

  const outrageousReality = [
    { id: 'reality2', title: 'GHOST HUNTING WITH GLITCHES', poster: '/assets/images/official/Ghost Hunting With Glitches.png', video: 'J5zR4sYaeLIphEUB9dAP00uYwfpFq2O4zNIMS2LpZQs4' }, // Updated ID (E)
    { id: 'reality3', title: 'ULTIMATE TOILET RACING', poster: '/assets/images/official/Ultimate Toilet Racing Thumbnail.png', video: 'ri8dT5C9CPKcNuQAqtxhthAeteFlbLCIy8aROZ4M4L4' },
    { id: 'reality4', title: 'KITCHEN CHAOS: QUANTUM EDITION', poster: '/assets/images/official/Kitchen Chaos Thumbnail.png', video: '8501r2tKlltIlT00FElCUMBKKupfPWsi8hoNSdqNzZN1Q' },
  ];

  const interdimensionalShows = [
    { id: 'extreme4', title: 'STANK: THE MUSICAL', poster: '/assets/images/official/STANK The Musical Thumbnail.png', video: 'sKEAvV66KslcYAaLhohd2v00cZ01KvsruB8O0100L4K5bdI' },
    { id: 'bb', title: "Addy-O's presents: The Popper Bowl", poster: "/assets/images/official/Addy's O Presents The Popper Bowl Thumbnail.png", video: 'YVy01BSIBfmXNE6ocn02I01g02100ReY4YYMuy9w8mwwbsZE' },
  ];

  const comedyShows = [
    { id: 'comedy1', title: 'VOID OF LAUGHTER', poster: '/assets/images/official/Void Of Laughter Thumbnail.png', video: 'o56rrLeP1AfXbQGQYRTYRUwjuCaLhivEKcAsSHn7jD4' },
    { id: 'comedy4', title: 'GLITCH IN THE GAG', poster: '/assets/images/official/Glitch In The Gag Thumbnail.png', video: 'YVy01BSIBfmXNE6ocn02I01g02100ReY4YYMuy9w8mwwbsZE' },
  ];

  const originals = [
    { id: 'noir', title: 'NEON CITY NOIR', poster: '/assets/images/official/Neon City Noir Thumbnail.png', video: '', isComingSoon: true, category: 'originals' },
    { id: 'portal', title: 'BEYOND THE GATE', poster: '/assets/images/official/Beyond The Gate Thumbnail.png', video: '', isComingSoon: true, category: 'originals' },
    { id: 'horror', title: 'VOID WHISPERERS', poster: '/assets/images/official/Void Whisperers Thumbnail.png', video: '', isComingSoon: true, category: 'originals' },
    { id: 'legal', title: 'CAUL RAUL: LEGAL REALITY', poster: '/assets/images/official/Caul Raul Legal Reality Thumbnail.png', video: '', isComingSoon: true, category: 'originals' },
  ];

  const allItems = [
    ...trending,
    ...directorsCut,
    ...originalSeries,
    ...actionMovies,
    ...adultRomance,
    ...outrageousReality,
    ...interdimensionalShows,
    ...comedyShows,
    ...originals
  ];

  const filteredItems = (items: ContentItem[]) => {
    if (!searchQuery) return items;
    return items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const myListedItems = allItems.filter(item => myList.includes(item.id));



  if (isLoading) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}>
        <MuxPlayer
          playbackId="HNSLJVt00QAwWSogvq1S5KyflKc4DxKO9OLk9jCSgRHA"
          autoPlay
          muted
          onEnded={handleIntroEnd}
          style={{ width: '100%', height: '100%' }}
          primaryColor="#00F3FF"
          metadataVideoTitle="Starstream Intro"
          streamType="on-demand"
        />
        <button
          onClick={handleIntroEnd}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.8rem',
            letterSpacing: '2px',
            zIndex: 10000
          }}>
          SKIP INTRO
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ paddingBottom: '100px', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div id="top"></div>
      <Hero onPlay={() => onPlay(mainFilm)} />

      <div style={{ marginTop: '-140px', position: 'relative', zIndex: 20 }}>
        <div id="mylist">
          {myListedItems.length > 0 && !searchQuery && (
            <PosterRow
              title="My List"
              items={myListedItems}
              onSelect={onPlay}
              myList={myList}
              onToggleMyList={onToggleMyList}
            />
          )}
        </div>

        <div id="trending">
          <PosterRow
            title="Trending on Starstream"
            items={filteredItems(trending)}
            onSelect={onPlay}
            myList={myList}
            onToggleMyList={onToggleMyList}
          />
        </div>

        <div id="directors-cut">
          <PosterRow
            title="The Jaron Ikner Collection (Premium Access Only)"
            items={filteredItems(directorsCut)}
            onSelect={onPlay}
            myList={myList}
            onToggleMyList={onToggleMyList}
          />
        </div>

        <div id="series">
          <PosterRow
            title="Original Series"
            items={filteredItems(originalSeries)}
            onSelect={onPlay}
            myList={myList}
            onToggleMyList={onToggleMyList}
          />
        </div>

        <div id="action">
          <PosterRow
            title="Heavy Action & Cinematic Combat"
            items={filteredItems(actionMovies)}
            onSelect={onPlay}
            myList={myList}
            onToggleMyList={onToggleMyList}
          />
        </div>

        <div id="romance">
          <PosterRow
            title="Late Night: Forbidden Reality"
            items={filteredItems(adultRomance)}
            onSelect={onPlay}
            myList={myList}
            onToggleMyList={onToggleMyList}
          />
        </div>

        <div id="reality">
          <PosterRow
            title="Outrageous Reality"
            items={filteredItems(outrageousReality)}
            onSelect={onPlay}
            myList={myList}
            onToggleMyList={onToggleMyList}
          />
        </div>

        <div id="interdimensional">
          <PosterRow
            title="Interdimensional Spectacle"
            items={filteredItems(interdimensionalShows)}
            onSelect={onPlay}
            myList={myList}
            onToggleMyList={onToggleMyList}
          />
        </div>

        <div id="comedy">
          <PosterRow
            title="High-Dimensional Comedy"
            items={filteredItems(comedyShows)}
            onSelect={onPlay}
            myList={myList}
            onToggleMyList={onToggleMyList}
          />
        </div>

        <div id="originals">
          <PosterRow
            title="Starstream Originals"
            items={filteredItems(originals)}
            onSelect={onPlay}
            myList={myList}
            onToggleMyList={onToggleMyList}
          />
        </div>
      </div>

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
          <video src="https://stream.mux.com/3YyuaYBueFY9vvZFWaAdglnrQzwOl84MbD800zYYLoM00.m3u8" autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

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
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [myList, setMyList] = useState<string[]>([]);
  const { hasUnlockedCollection, user } = useAuth();
  const navigate = useNavigate();

  // Handle Dynamic Title
  useEffect(() => {
    if (selectedItem) {
      document.title = `${selectedItem.title} | Starstream`;
    } else {
      document.title = 'Starstream | Interdimensional Movies & Series';
    }
  }, [selectedItem]);

  // Handle My List Persistence
  useEffect(() => {
    const savedList = localStorage.getItem('starstream_mylist');
    if (savedList) setMyList(JSON.parse(savedList));
  }, []);

  const handleToggleMyList = (id: string) => {
    const newList = myList.includes(id)
      ? myList.filter(itemId => itemId !== id)
      : [...myList, id];
    setMyList(newList);
    localStorage.setItem('starstream_mylist', JSON.stringify(newList));
  };

  const handlePlay = (item: ContentItem) => {
    if (item.type === 'series') {
      navigate(`/series/${item.id}`);
    } else {
      setSelectedItem(item);
    }
  };

  const handleUnlockCollection = async (price: number) => {
    console.log(`Initializing backend checkout for $${price}...`);
    try {
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price,
          itemTitle: selectedItem?.title || "Jaron Ikner Collection",
          userId: user?.id,
          userEmail: user?.email
        }),
      });
      const session = await response.json();
      if (session.error) throw new Error(session.error);
      if (session.url) {
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
    const premiumIds = ['madness', 'tfp', 'mental', 'paradox', 'wtss', 'continuum', 'moire', 'hh3'];
    return premiumIds.includes(itemId) && !hasUnlockedCollection('jaron-ikner-collection');
  };

  return (
    <>
      <StarstreamNav onSearch={setSearchQuery} />
      <PremiumPopup />
      <Routes>
        <Route path="/" element={
          <MovieCatalog
            onPlay={handlePlay}
            searchQuery={searchQuery}
            myList={myList}
            onToggleMyList={handleToggleMyList}
          />
        } />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/series/:seriesId" element={<SeriesPage onPlay={handlePlay} />} />
      </Routes>

      <VideoModal
        item={selectedItem}
        isLocked={selectedItem ? isItemLocked(selectedItem.id) : false}
        onUnlock={handleUnlockCollection}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
};

export default App;
