import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ClothingAnalytics.css';

const ClothingAnalytics = ({ character, onClose }) => {
  const characterOutfitData = {
    'Leon Kennedy': {
      version: 'Resident Evil 9',
      isRE9: true,
      color: '#FF1493',
      items: [
        {
          id: 1,
          name: 'RPD Tactical Jacket',
          image: '/images/outfits/leon_jacket.png',
          description: 'Reinforced shoulders, weather-resistant',
          dimensions: 'Chest: 42" | Length: 28"',
          position: 'center'
        },
        {
          id: 2,
          name: 'Cargo Pants',
          image: '/images/outfits/leon_pants.png',
          description: 'Ripstop fabric, reinforced knees',
          dimensions: 'Waist: 32" | Inseam: 32"',
          position: 'left'
        },
        {
          id: 3,
          name: 'Tactical Watch',
          image: '/images/outfits/leon_watch.png',
          description: 'GPS tracking, water-resistant titanium',
          dimensions: 'Digital | Water: 100m',
          position: 'right'
        }
      ]
    },
    'Jill Valentine': {
      version: 'Classic',
      isRE9: false,
      color: '#A855F7',
      outfitImage: '/images/outfits/jill_outfit.png',
      annotations: [
        {
          id: 1,
          name: 'Blue Tactical Tank Top',
          description: 'Fitted fabric, sleeveless design',
          position: { top: '18%', left: '12%' },
          lineDirection: 'right',
          dimensions: 'Chest: 36" | Length: 24"'
        },
        {
          id: 2,
          name: 'Shoulder Holster',
          description: 'Adjustable straps, quick-draw',
          position: { top: '28%', right: '10%' },
          lineDirection: 'left',
          dimensions: 'Fit: Adjustable'
        },
        {
          id: 3,
          name: 'Black Tactical Pants',
          description: 'Slim fit, reinforced fabric',
          position: { top: '55%', left: '10%' },
          lineDirection: 'right',
          dimensions: 'Waist: 28" | Inseam: 30"'
        },
        {
          id: 4,
          name: 'Combat Boots',
          description: 'Lightweight tactical boots',
          position: { top: '85%', right: '12%' },
          lineDirection: 'left',
          dimensions: 'Size: US 7 | Height: 6"'
        },
        {
          id: 5,
          name: 'Fingerless Gloves',
          description: 'Leather, tactical grip',
          position: { top: '42%', left: '8%' },
          lineDirection: 'right',
          dimensions: 'Size: S | Leather'
        }
      ]
    },
    'Albert Wesker': {
      version: 'Classic',
      isRE9: false,
      color: '#EF4444',
      outfitImage: '/images/outfits/wesker_outfit.png',
      annotations: [
        {
          id: 1,
          name: 'Black Trench Coat',
          description: 'Signature coat, hidden pockets',
          position: { top: '15%', left: '10%' },
          lineDirection: 'right',
          dimensions: 'Chest: 44" | Length: 48"'
        },
        {
          id: 2,
          name: 'Tactical Sunglasses',
          description: 'UV400, titanium frame',
          position: { top: '8%', right: '12%' },
          lineDirection: 'left',
          dimensions: 'Lens: UV400'
        },
        {
          id: 3,
          name: 'Combat Bodysuit',
          description: 'Kevlar-enhanced, flexible',
          position: { top: '40%', right: '8%' },
          lineDirection: 'left',
          dimensions: 'Chest: 42" | Kevlar'
        },
        {
          id: 4,
          name: 'Tactical Boots',
          description: 'Reinforced sole',
          position: { top: '85%', left: '12%' },
          lineDirection: 'right',
          dimensions: 'Size: US 11 | Height: 10"'
        },
        {
          id: 5,
          name: 'Combat Gloves',
          description: 'Reinforced knuckles',
          position: { top: '50%', left: '8%' },
          lineDirection: 'right',
          dimensions: 'Size: L | Reinforced'
        }
      ]
    },
    'Ada Wong': {
      version: 'Classic',
      isRE9: false,
      color: '#DC2626',
      outfitImage: '/images/outfits/ada_dress.png',
      annotations: [
        {
          id: 1,
          name: 'Red Cheongsam Dress',
          description: 'Silk, hidden compartments',
          position: { top: '22%', left: '10%' },
          lineDirection: 'right',
          dimensions: 'Bust: 34" | Waist: 26"'
        },
        {
          id: 2,
          name: 'Spy Coat',
          description: 'Concealed weapon pockets',
          position: { top: '12%', right: '10%' },
          lineDirection: 'left',
          dimensions: 'Chest: 36" | Length: 32"'
        },
        {
          id: 3,
          name: 'Grappling Belt',
          description: 'Auto-reload, 50m range',
          position: { top: '48%', right: '8%' },
          lineDirection: 'left',
          dimensions: 'Range: 50m'
        },
        {
          id: 4,
          name: 'Stiletto Heels',
          description: 'Concealed blade',
          position: { top: '88%', left: '12%' },
          lineDirection: 'right',
          dimensions: 'Size: US 7 | Heel: 3"'
        },
        {
          id: 5,
          name: 'Tactical Bodysuit',
          description: 'Neoprene stealth suit',
          position: { top: '60%', left: '8%' },
          lineDirection: 'right',
          dimensions: 'Stealth: Yes'
        }
      ]
    }
  };

  const data = characterOutfitData[character];
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="outfit-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="outfit-viewer"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{ '--accent': data.color }}
        >
          <button className="close-btn" onClick={onClose}>✕</button>

          {/* Header */}
          <header className="outfit-header">
            <h1>EQUIPMENT <span>LOADOUT</span></h1>
            <div className="header-meta">
              <span className="char-name">{character}</span>
              <span className={`version-tag ${data.isRE9 ? 're9' : ''}`}>
                {data.isRE9 ? 'VERSION RE9' : data.version}
              </span>
            </div>
          </header>

          {/* Diagram Container */}
          <div className="diagram-area">
            {/* Character Image */}
            <motion.div 
              className="outfit-image"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="image-glow" style={{ background: data.color }}></div>
              <img src={data.outfitImage} alt={character} />
              <div className="image-base" style={{ background: `linear-gradient(90deg, transparent, ${data.color}40, transparent)` }}></div>
            </motion.div>

            {/* Annotations */}
            {data.annotations.map((ann, i) => (
              <motion.div
                key={ann.id}
                className={`annotation ${ann.lineDirection}`}
                style={{
                  top: ann.position.top,
                  left: ann.position.left,
                  right: ann.position.right
                }}
                initial={{ opacity: 0, x: ann.lineDirection === 'left' ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
              >
                <div className="ann-line">
                  <span className="line-dot" style={{ background: data.color, boxShadow: `0 0 10px ${data.color}` }}></span>
                  <span className="line-bar" style={{ background: `linear-gradient(${ann.lineDirection === 'left' ? '90deg' : '270deg'}, ${data.color}, transparent)` }}></span>
                </div>
                <div className="ann-box">
                  <h4>{ann.name}</h4>
                  <p>{ann.description}</p>
                  <span className="ann-dims" style={{ color: data.color }}>{ann.dimensions}</span>
                </div>
              </motion.div>
            ))}

            {/* HUD Elements */}
            <div className="hud-corner tl"></div>
            <div className="hud-corner tr"></div>
            <div className="hud-corner bl"></div>
            <div className="hud-corner br"></div>
            <div className="scan-line"></div>
          </div>

          {/* Footer */}
          <footer className="outfit-footer">
            <div className="footer-bar" style={{ background: `linear-gradient(90deg, transparent, ${data.color}, transparent)` }}></div>
            <p>TACTICAL ANALYSIS • {character.toUpperCase()}</p>
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClothingAnalytics;
