import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ClothingAnalytics.css';

const ClothingAnalytics = ({ character, onClose }) => {
  const [selectedItem, setSelectedItem] = useState(null);

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
          size: 'L (Large)',
          color: 'Black / Dark Gray',
          material: 'Leather & Kevlar',
          price: '$299.99',
          store: 'Umbrella Corp Store'
        },
        {
          id: 2,
          name: 'Cargo Pants',
          image: '/images/outfits/leon_pants.png',
          size: '32W x 32L',
          color: 'Black',
          material: 'Ripstop Cotton',
          price: '$89.99',
          store: 'RCPD Tactical Shop'
        },
        {
          id: 3,
          name: 'Tactical Watch',
          image: '/images/outfits/leon_watch.png',
          size: '44mm',
          color: 'Titanium Silver',
          material: 'Titanium & Sapphire',
          price: '$450.00',
          store: 'Military Surplus'
        }
      ]
    },
    'Jill Valentine': {
      version: 'Classic',
      isRE9: false,
      color: '#A855F7',
      items: [
        {
          id: 1,
          name: 'STARS Complete Outfit',
          image: '/images/outfits/jill_outfit.png',
          size: 'S (Small)',
          color: 'Blue / Black',
          material: 'Cotton & Nylon',
          price: '$199.99',
          store: 'STARS Official Store'
        }
      ]
    },
    'Albert Wesker': {
      version: 'Classic',
      isRE9: false,
      color: '#EF4444',
      items: [
        {
          id: 1,
          name: 'Black Trench Coat Set',
          image: '/images/outfits/wesker_outfit.png',
          size: 'XL (Extra Large)',
          color: 'Black',
          material: 'Premium Leather',
          price: '$599.99',
          store: 'Tricell Fashion'
        }
      ]
    },
    'Ada Wong': {
      version: 'Classic',
      isRE9: false,
      color: '#DC2626',
      items: [
        {
          id: 1,
          name: 'Red Cheongsam Dress',
          image: '/images/outfits/ada_dress.png',
          size: 'M (Medium)',
          color: 'Red / Gold',
          material: 'Silk',
          price: '$399.99',
          store: 'Shanghai Elegance'
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
            <h1>OUTFIT <span>CHARACTER</span></h1>
            <div className="header-meta">
              <span className="char-name">{character}</span>
              <span className={`version-tag ${data.isRE9 ? 're9' : ''}`}>
                {data.isRE9 ? 'VERSION RE9' : data.version}
              </span>
            </div>
          </header>

          {/* Items Display */}
          <div className="items-container">
            <div className="items-grid">
              {data.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`item-card ${selectedItem === item.id ? 'selected' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                >
                  {/* Item Image */}
                  <div className="item-image">
                    <div className="image-glow" style={{ background: data.color }}></div>
                    <img src={item.image} alt={item.name} />
                    {data.isRE9 && <span className="re9-badge">RE9</span>}
                  </div>

                  {/* Annotation Line */}
                  <div className="item-line">
                    <span className="line-dot" style={{ background: data.color }}></span>
                    <span className="line-bar" style={{ background: data.color }}></span>
                  </div>

                  {/* Item Info */}
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <div className="item-details">
                      <div className="detail-row">
                        <span className="detail-label">Size:</span>
                        <span className="detail-value">{item.size}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Color:</span>
                        <span className="detail-value">{item.color}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Material:</span>
                        <span className="detail-value">{item.material}</span>
                      </div>
                      <div className="detail-row price-row">
                        <span className="detail-label">Price:</span>
                        <span className="detail-value price" style={{ color: data.color }}>{item.price}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Store:</span>
                        <span className="detail-value store">{item.store}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* HUD Corners */}
            <div className="hud-corner tl"></div>
            <div className="hud-corner tr"></div>
            <div className="hud-corner bl"></div>
            <div className="hud-corner br"></div>
          </div>

          {/* Footer */}
          <footer className="outfit-footer">
            <div className="footer-bar" style={{ background: `linear-gradient(90deg, transparent, ${data.color}, transparent)` }}></div>
            <p>TACTICAL ANALYSIS • {character.toUpperCase()} • {data.items.length} ITEMS</p>
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClothingAnalytics;
