import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './BodyPartViewer.css'

const BodyPartViewer = ({ character, onClose }) => {
  const [selectedPart, setSelectedPart] = useState(null)

  // Map character IDs to image file names
  const characterImages = {
    leon: {
      fullbody: '/images/characters/leonkennedy9 full body.png',
      hand: '/images/characters/leon_kennedy hand.png',
      eyes: '/images/characters/leon_kennedy_eyes.jfif',
      face: '/images/characters/𝙡𝙚𝙤𝙣 face.png',
      mouth: '/images/characters/leon kennedy mouth.png',
      ears: '/images/characters/leon kennedy hear.png',
      hair: '/images/characters/leon kennedy hear.png',
      legs: '/images/characters/leon_kennedy_legs.png'
    },
    jill: {
      fullbody: '/images/characters/jill_body.png',
      hand: '/images/characters/Jill_Valentine_hand.png',
      eyes: '/images/characters/Jill_Valentine_s_Eye_s.png',
      face: '/images/characters/jill_face.png',
      mouth: '/images/characters/Jill_Valentine_mouth.png',
      ears: '/images/characters/jill_face.png', // fallback to face
      hair: '/images/characters/jill_hair.png',
      legs: '/images/characters/jill_legs.png'
    },
    wesker: {
      fullbody: '/images/characters/Albert_Wesker_full_body.png',
      hand: '/images/characters/albert wesker hand.jfif',
      eyes: '/images/characters/albert wesker eyes.jfif',
      face: '/images/characters/albert_wesker_face_only.png',
      mouth: '/images/characters/albert wesker mouth.png',
      hair: '/images/characters/albert_wesker_hear.png',
      legs: '/images/characters/Albert_Wesker_legs.png'
    },
    ada: {
      fullbody: '/images/characters/ADA_WONG_body.png',
      hand: '/images/characters/ada_wong_hand.png',
      eyes: '/images/characters/Ada_Wong_s_Eye_s.png',
      face: '/images/characters/ada_wong_face.png',
      mouth: '/images/characters/Ada Wong mouth.jfif',
      ears: '/images/characters/ada_wong_face.png', // fallback to face
      hair: '/images/characters/ada_wong_hair.png',
      legs: '/images/characters/ada_wong_legs.png'
    }
  }

  const bodyPartDetails = {
    leon: {
      fullbody: { name: 'Full Body', height: '180cm', build: 'Athletic', colors: 'Brown jacket, dark pants', description: 'Leon\'s iconic RE4 outfit featuring his signature brown leather jacket' },
      hand: { name: 'Hands', length: '19cm', type: 'Combat trained', colors: 'Gloved', description: 'Skilled in weapon handling and close combat' },
      eyes: { name: 'Eyes', color: 'Blue', type: 'Sharp', description: 'Piercing blue eyes that have witnessed countless horrors' },
      face: { name: 'Face', shape: 'Angular', features: 'Strong jawline', colors: 'Fair skin', description: 'Hardened features from years of combat experience' },
      mouth: { name: 'Mouth', type: 'Determined', description: 'Often set in a firm line, showing his resolve' },
      hair: { name: 'Hair', color: 'Dirty blonde', length: 'Medium', style: 'Swept back', description: 'Signature hairstyle that has become iconic' },
      legs: { name: 'Legs', length: '95cm', type: 'Muscular', colors: 'Dark tactical pants', description: 'Strong legs built for running and combat' }
    },
    jill: {
      fullbody: { name: 'Full Body', height: '166cm', build: 'Athletic', colors: 'Blue tactical suit', description: 'Jill\'s BSAA tactical outfit designed for combat operations' },
      hand: { name: 'Hands', length: '17cm', type: 'Precise', colors: 'Tactical gloves', description: 'Expert in lock picking and weapon handling' },
      eyes: { name: 'Eyes', color: 'Blue', type: 'Alert', description: 'Vigilant eyes always scanning for threats' },
      face: { name: 'Face', shape: 'Oval', features: 'Determined', colors: 'Fair skin', description: 'Beautiful yet battle-hardened features' },
      mouth: { name: 'Mouth', type: 'Confident', description: 'Shows her unwavering determination' },
      hair: { name: 'Hair', color: 'Brown', length: 'Short', style: 'Practical bob', description: 'Kept short for tactical efficiency' },
      legs: { name: 'Legs', length: '88cm', type: 'Agile', colors: 'Tactical pants', description: 'Built for speed and agility in combat' }
    },
    wesker: {
      fullbody: { name: 'Full Body', height: '190cm', build: 'Superhuman', colors: 'Black tactical suit', description: 'Wesker\'s imposing figure enhanced by viral mutations' },
      hand: { name: 'Hands', length: '21cm', type: 'Enhanced', colors: 'Black gloves', description: 'Superhuman strength capable of crushing skulls' },
      eyes: { name: 'Eyes', color: 'Red/Orange', type: 'Mutated', description: 'Glowing eyes from viral enhancement, see through darkness' },
      face: { name: 'Face', shape: 'Sharp', features: 'Cold', colors: 'Pale', description: 'Emotionless face hiding his god complex' },
      mouth: { name: 'Mouth', type: 'Sinister', description: 'Often curved in a menacing smirk' },
      hair: { name: 'Hair', color: 'Blonde', length: 'Short', style: 'Slicked back', description: 'Perfectly styled blonde hair' },
      legs: { name: 'Legs', length: '100cm', type: 'Enhanced', colors: 'Black pants', description: 'Superhuman speed and strength' }
    },
    ada: {
      fullbody: { name: 'Full Body', height: '173cm', build: 'Slender', colors: 'Red dress', description: 'Ada\'s iconic red dress, elegant yet deadly' },
      hand: { name: 'Hands', length: '18cm', type: 'Precise', colors: 'Bare/gloved', description: 'Skilled in espionage and weapon handling' },
      eyes: { name: 'Eyes', color: 'Brown', type: 'Mysterious', description: 'Enigmatic eyes that hide her true intentions' },
      face: { name: 'Face', shape: 'Elegant', features: 'Beautiful', colors: 'Asian complexion', description: 'Stunning features that mask her deadly skills' },
      mouth: { name: 'Mouth', type: 'Seductive', description: 'Often curved in a mysterious smile' },
      hair: { name: 'Hair', color: 'Black', length: 'Long', style: 'Straight', description: 'Long black hair, sometimes tied back' },
      legs: { name: 'Legs', length: '92cm', type: 'Graceful', colors: 'Bare/stockings', description: 'Long elegant legs, deceptively powerful' }
    }
  }

  const bodyParts = [
    { id: 'fullbody', label: 'Full Body' },
    { id: 'face', label: 'Face' },
    { id: 'eyes', label: 'Eyes' },
    { id: 'mouth', label: 'Mouth' },
    { id: 'hair', label: 'Hair' },
    { id: 'hand', label: 'Hands' },
    { id: 'legs', label: 'Legs' }
  ]

  const images = characterImages[character.id]
  const details = bodyPartDetails[character.id]

  const handlePartClick = (partId) => {
    setSelectedPart(partId)
  }

  const handleCloseDetail = () => {
    setSelectedPart(null)
  }

  return (
    <motion.div
      className="body-part-viewer-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="body-part-viewer-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="body-part-viewer-content">
          <h2 className="character-name">
            {character.firstName} {character.lastName}
          </h2>
          <p className="instruction-text">Select a body part to view detailed analysis</p>

          {/* Body parts grid */}
          <div className="body-parts-grid">
            {bodyParts.map((part) => (
              <motion.button
                key={part.id}
                className="body-part-card"
                onClick={() => handlePartClick(part.id)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="part-label">{part.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedPart && (
            <motion.div
              className="detail-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetail}
            >
              <motion.div
                className="detail-modal-content"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="detail-close-btn" onClick={handleCloseDetail}>
                  ✕
                </button>

                <div className="detail-content">
                  <div className="detail-image-container">
                    <img
                      src={images[selectedPart]}
                      alt={details[selectedPart].name}
                      className="detail-image"
                    />
                  </div>

                  <div className="detail-info">
                    <h3 className="detail-title">{details[selectedPart].name}</h3>
                    
                    <div className="detail-specs">
                      {details[selectedPart].height && (
                        <div className="spec-item">
                          <span className="spec-label">Height:</span>
                          <span className="spec-value">{details[selectedPart].height}</span>
                        </div>
                      )}
                      {details[selectedPart].length && (
                        <div className="spec-item">
                          <span className="spec-label">Length:</span>
                          <span className="spec-value">{details[selectedPart].length}</span>
                        </div>
                      )}
                      {details[selectedPart].color && (
                        <div className="spec-item">
                          <span className="spec-label">Color:</span>
                          <span className="spec-value">{details[selectedPart].color}</span>
                        </div>
                      )}
                      {details[selectedPart].colors && (
                        <div className="spec-item">
                          <span className="spec-label">Colors:</span>
                          <span className="spec-value">{details[selectedPart].colors}</span>
                        </div>
                      )}
                      {details[selectedPart].type && (
                        <div className="spec-item">
                          <span className="spec-label">Type:</span>
                          <span className="spec-value">{details[selectedPart].type}</span>
                        </div>
                      )}
                      {details[selectedPart].build && (
                        <div className="spec-item">
                          <span className="spec-label">Build:</span>
                          <span className="spec-value">{details[selectedPart].build}</span>
                        </div>
                      )}
                      {details[selectedPart].shape && (
                        <div className="spec-item">
                          <span className="spec-label">Shape:</span>
                          <span className="spec-value">{details[selectedPart].shape}</span>
                        </div>
                      )}
                      {details[selectedPart].style && (
                        <div className="spec-item">
                          <span className="spec-label">Style:</span>
                          <span className="spec-value">{details[selectedPart].style}</span>
                        </div>
                      )}
                      {details[selectedPart].features && (
                        <div className="spec-item">
                          <span className="spec-label">Features:</span>
                          <span className="spec-value">{details[selectedPart].features}</span>
                        </div>
                      )}
                    </div>

                    <div className="detail-description">
                      <p>{details[selectedPart].description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default BodyPartViewer
