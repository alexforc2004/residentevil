import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import WeaponDetails from './WeaponDetails'
import './CharacterSection.css'

function CharacterSection({ character, onOpenAnalysis, onOpenBodyParts, onOpenClothing }) {
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const [showWeapon, setShowWeapon] = useState(false)

  useEffect(() => {
    // GSAP animation for title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.querySelectorAll('.title-letter'),
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out'
        }
      )
    }

    // GSAP animation for description paragraphs
    if (descRef.current) {
      gsap.fromTo(
        descRef.current.querySelectorAll('p'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.5,
          ease: 'power2.out'
        }
      )
    }

    // Close weapon modal when character changes
    setShowWeapon(false)
  }, [character.id])

  // Split text into letters for animation
  const splitText = (text) => {
    return text.split('').map((letter, index) => (
      <span key={index} className="title-letter">
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ))
  }

  const handleVerMasClick = (e) => {
    e.preventDefault()
    setShowWeapon(true)
  }

  const handleClothingClick = (e) => {
    e.preventDefault()
    const characterName = `${character.firstName} ${character.lastName}`.replace('LEON KENNEDY', 'Leon Kennedy').replace('JILL VALENTINE', 'Jill Valentine').replace('ALBERT WESKER', 'Albert Wesker').replace('ADA WONG', 'Ada Wong')
    onOpenClothing && onOpenClothing(characterName)
  }

  return (
    <>
      <motion.section
        className="character-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="character-info">
          <h1 className="character-title" ref={titleRef}>
            <div className="first-name">{splitText(character.firstName)}</div>
            <div className="last-name highlight">{splitText(character.lastName)}</div>
          </h1>

          <div className="character-description" ref={descRef}>
            {character.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <motion.a
              href="#"
              className="ver-mas"
              onClick={handleVerMasClick}
              whileHover={{ x: 10, color: '#ff6699' }}
              transition={{ duration: 0.2 }}
            >
              VER MAS &gt;&gt;
            </motion.a>
            <motion.a
              href="#"
              className="ver-mas clothing-link"
              onClick={handleClothingClick}
              whileHover={{ x: 10, color: '#FF1493' }}
              transition={{ duration: 0.2 }}
              style={{ marginLeft: '20px', color: '#FF1493' }}
            >
              👕 CLOTHING &gt;&gt;
            </motion.a>
          </div>
        </div>

        <motion.div
          className="character-image"
          initial={{ x: 100, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -100, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onClick={() => onOpenBodyParts && onOpenBodyParts(character)}
          style={{ cursor: 'pointer' }}
        >
          <div className="image-glow" />
          <motion.img
            src={character.image}
            alt={`${character.firstName} ${character.lastName}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="click-hint"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 0, 68, 0.8)',
              padding: '8px 16px',
              borderRadius: '4px',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Click for Analysis
          </motion.div>
        </motion.div>
      </motion.section>

      {character.weapon && (
        <WeaponDetails
          weapon={character.weapon}
          isOpen={showWeapon}
          onClose={() => setShowWeapon(false)}
        />
      )}
    </>
  )
}

export default CharacterSection
