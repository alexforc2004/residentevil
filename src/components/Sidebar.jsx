import React from 'react'
import { motion } from 'framer-motion'
import './Sidebar.css'

function Sidebar({ characters, activeIndex, onCharacterChange }) {
  return (
    <aside className="sidebar">
      <motion.div 
        className="logo"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="logo-text">RE</div>
      </motion.div>

      <nav className="character-nav">
        {characters.map((char, index) => (
          <motion.div
            key={char.id}
            className={`character-thumb ${index === activeIndex ? 'active' : ''}`}
            onClick={() => onCharacterChange(index)}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="thumb-image">
              <img src={char.thumbnail} alt={char.firstName} />
            </div>
            <span className="char-name">
              {char.firstName}<br />
              <span className="highlight">{char.lastName}</span>
            </span>
            {index === activeIndex && (
              <motion.div
                className="active-indicator"
                layoutId="activeIndicator"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.div>
        ))}
      </nav>

      <div className="nav-arrows">
        <motion.button
          className="arrow-up"
          onClick={() => onCharacterChange((activeIndex - 1 + characters.length) % characters.length)}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 50, 100, 0.3)' }}
          whileTap={{ scale: 0.9 }}
        >
          ▲
        </motion.button>
        <motion.button
          className="arrow-down"
          onClick={() => onCharacterChange((activeIndex + 1) % characters.length)}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 50, 100, 0.3)' }}
          whileTap={{ scale: 0.9 }}
        >
          ▼
        </motion.button>
      </div>
    </aside>
  )
}

export default Sidebar
