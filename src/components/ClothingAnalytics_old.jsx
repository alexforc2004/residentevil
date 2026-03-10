import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ClothingAnalytics.css';

const ClothingAnalytics = ({ character, onClose }) => {
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const characterClothingData = {
    'Leon Kennedy': {
      version: 'Resident Evil 9',
      isRE9: true,
      color: '#FF1493',
      outfits: [
        {
          id: 1,
          name: 'RPD Tactical Jacket',
          category: 'jacket',
          image: '/images/outfits/leon_jacket.png',
          dimensions: { chest: '42"', shoulders: '18"', length: '28"', sleeves: '25"' },
          description: 'Official RPD tactical jacket with reinforced shoulders',
          version: 'RE9'
        },
        {
          id: 2,
          name: 'Combat Boots',
          category: 'footwear',
          dimensions: { size: 'US 10', height: '8"', width: 'D', material: 'Leather' },
          description: 'Military-grade combat boots with steel toe',
          version: 'RE9'
        },
        {
          id: 3,
          name: 'Tactical Vest',
          category: 'vest',
          dimensions: { chest: '40-44"', length: '22"', pockets: '6', weight: '2.5kg' },
          description: 'Kevlar-reinforced tactical vest with pouches',
          version: 'RE9'
        },
        {
          id: 4,
          name: 'Cargo Pants',
          category: 'pants',
          image: '/images/outfits/leon_pants.png',
          dimensions: { waist: '32"', inseam: '32"', pockets: '8', material: 'Ripstop' },
          description: 'Tactical cargo pants with reinforced knees',
          version: 'RE9'
        },
        {
          id: 5,
          name: 'Tactical Watch',
          category: 'accessories',
          image: '/images/outfits/leon_watch.png',
          dimensions: { type: 'Digital', material: 'Titanium', water: '100m', gps: 'Yes' },
          description: 'Military-grade tactical watch with GPS tracking',
          version: 'RE9'
        },
        {
          id: 6,
          name: 'Utility Belt',
          category: 'accessories',
          dimensions: { waist: '30-36"', pouches: '5', holster: 'Yes', material: 'Nylon' },
          description: 'Multi-purpose utility belt with holster',
          version: 'RE9'
        }
      ]
    },
    'Jill Valentine': {
      version: 'Classic',
      isRE9: false,
      color: '#A855F7',
      outfits: [
        {
          id: 1,
          name: 'STARS Uniform Top',
          category: 'jacket',
          image: '/images/outfits/jill_outfit.png',
          dimensions: { chest: '36"', shoulders: '15"', length: '24"', sleeves: '22"' },
          description: 'Official STARS tactical uniform top'
        },
        {
          id: 2,
          name: 'Combat Boots',
          category: 'footwear',
          dimensions: { size: 'US 7', height: '6"', width: 'B', material: 'Synthetic' },
          description: 'Lightweight tactical boots'
        },
        {
          id: 3,
          name: 'Tactical Beret',
          category: 'accessories',
          dimensions: { size: 'M', material: 'Wool', color: 'Navy', badge: 'STARS' },
          description: 'STARS official beret with emblem'
        },
        {
          id: 4,
          name: 'Utility Belt',
          category: 'accessories',
          dimensions: { waist: '28-32"', pouches: '4', holster: 'Yes', lockpick: 'Yes' },
          description: 'Multi-purpose utility belt with lockpick kit'
        },
        {
          id: 5,
          name: 'Tactical Pants',
          category: 'pants',
          dimensions: { waist: '28"', inseam: '30"', pockets: '6', stretch: 'Yes' },
          description: 'Flexible tactical pants'
        }
      ]
    },
    'Albert Wesker': {
      version: 'Classic',
      isRE9: false,
      color: '#EF4444',
      outfits: [
        {
          id: 1,
          name: 'Black Trench Coat',
          category: 'jacket',
          image: '/images/outfits/wesker_outfit.png',
          dimensions: { chest: '44"', shoulders: '19"', length: '48"', sleeves: '26"' },
          description: 'Signature black leather trench coat'
        },
        {
          id: 2,
          name: 'Tactical Sunglasses',
          category: 'accessories',
          dimensions: { lens: 'UV400', frame: 'Titanium', style: 'Wraparound', tint: 'Dark' },
          description: 'Signature tactical sunglasses'
        },
        {
          id: 3,
          name: 'Combat Suit',
          category: 'vest',
          dimensions: { chest: '42"', length: '30"', material: 'Kevlar', flex: 'High' },
          description: 'Enhanced combat bodysuit'
        },
        {
          id: 4,
          name: 'Tactical Boots',
          category: 'footwear',
          dimensions: { size: 'US 11', height: '10"', width: 'D', sole: 'Reinforced' },
          description: 'High-performance tactical boots'
        },
        {
          id: 5,
          name: 'Combat Gloves',
          category: 'accessories',
          dimensions: { size: 'L', material: 'Synthetic', knuckle: 'Reinforced', grip: 'Max' },
          description: 'Reinforced combat gloves'
        }
      ]
    },
    'Ada Wong': {
      version: 'Classic',
      isRE9: false,
      color: '#DC2626',
      outfits: [
        {
          id: 1,
          name: 'Red Cheongsam',
          category: 'jacket',
          image: '/images/outfits/ada_dress.png',
          dimensions: { bust: '34"', waist: '26"', length: '36"', material: 'Silk' },
          description: 'Signature red dress with hidden compartments'
        },
        {
          id: 2,
          name: 'Stiletto Heels',
          category: 'footwear',
          dimensions: { size: 'US 7', heel: '3"', style: 'Stiletto', hidden: 'Blade' },
          description: 'Elegant heels with concealed blade'
        },
        {
          id: 3,
          name: 'Spy Trench Coat',
          category: 'jacket',
          dimensions: { chest: '36"', shoulders: '15"', length: '32"', pockets: 'Hidden' },
          description: 'Tactical spy coat with concealed compartments'
        },
        {
          id: 4,
          name: 'Grappling Belt',
          category: 'accessories',
          dimensions: { waist: '26-30"', range: '50m', weight: '2.5kg', reload: 'Auto' },
          description: 'Custom grappling hook utility belt'
        },
        {
          id: 5,
          name: 'Tactical Bodysuit',
          category: 'vest',
          dimensions: { bust: '34"', waist: '26"', material: 'Neoprene', stealth: 'Yes' },
          description: 'Form-fitting stealth bodysuit'
        }
      ]
    }
  };

  const categories = [
    { id: 'all', name: 'All', icon: '👔' },
    { id: 'jacket', name: 'Jackets', icon: '🧥' },
    { id: 'vest', name: 'Vests', icon: '🦺' },
    { id: 'pants', name: 'Pants', icon: '👖' },
    { id: 'footwear', name: 'Footwear', icon: '👢' },
    { id: 'accessories', name: 'Accessories', icon: '🧤' }
  ];

  const data = characterClothingData[character];
  if (!data) return null;

  const filteredOutfits = activeCategory === 'all' 
    ? data.outfits 
    : data.outfits.filter(outfit => outfit.category === activeCategory);

  const getIcon = (cat) => {
    const icons = { jacket: '🧥', vest: '🦺', pants: '👖', footwear: '👢', accessories: '🧤' };
    return icons[cat] || '👔';
  };

  return (
    <AnimatePresence>
      <motion.div
        className="clothing-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="clothing-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>✕</button>

          {/* Header */}
          <header className="clothing-header">
            <div className="header-content">
              <div className="avatar" style={{ borderColor: data.color }}>
                <div className="avatar-glow" style={{ background: data.color }}></div>
                <span>{character.charAt(0)}</span>
              </div>
              <div className="header-text">
                <h1>CHARACTER OUTFITS</h1>
                <h2>{character}</h2>
                <span className={`version-badge ${data.isRE9 ? 're9' : ''}`}>
                  {data.isRE9 ? 'VERSION RE9' : data.version}
                </span>
              </div>
            </div>
            <div className="header-stats">
              <div className="stat">
                <span className="stat-num">{data.outfits.length}</span>
                <span className="stat-lbl">Items</span>
              </div>
              <div className="stat">
                <span className="stat-num">{new Set(data.outfits.map(o => o.category)).size}</span>
                <span className="stat-lbl">Types</span>
              </div>
            </div>
          </header>

          {/* Categories */}
          <nav className="categories">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                style={activeCategory === cat.id ? { borderColor: data.color } : {}}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </button>
            ))}
          </nav>

          {/* Outfits Grid */}
          <div className="outfits-grid">
            {filteredOutfits.map((outfit, i) => (
              <motion.div
                key={outfit.id}
                className={`outfit-card ${selectedOutfit === outfit.id ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedOutfit(selectedOutfit === outfit.id ? null : outfit.id)}
                style={{ '--accent': data.color }}
              >
                <div className="card-image">
                  <div className="image-bg">
                    {outfit.image ? (
                      <img src={outfit.image} alt={outfit.name} className="outfit-img" />
                    ) : (
                      <span className="outfit-icon">{getIcon(outfit.category)}</span>
                    )}
                  </div>
                  <div className="image-glow" style={{ background: data.color }}></div>
                  {data.isRE9 && <span className="re9-tag">RE9</span>}
                </div>

                <div className="card-info">
                  <h3>{outfit.name}</h3>
                  <p>{outfit.description}</p>
                </div>

                <AnimatePresence>
                  {selectedOutfit === outfit.id && (
                    <motion.div
                      className="dimensions"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <h4>DIMENSIONS</h4>
                      <div className="dim-grid">
                        {Object.entries(outfit.dimensions).map(([k, v]) => (
                          <div key={k} className="dim-item">
                            <span className="dim-key">{k}</span>
                            <span className="dim-val" style={{ color: data.color }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="expand-arrow">
                  <span className={selectedOutfit === outfit.id ? 'up' : ''}>▼</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <footer className="clothing-footer">
            <div className="footer-line" style={{ background: `linear-gradient(90deg, transparent, ${data.color}, transparent)` }}></div>
            <p>{data.isRE9 ? 'Leon Kennedy - Resident Evil 9 Collection' : `${character} - ${data.version} Collection`}</p>
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClothingAnalytics;
