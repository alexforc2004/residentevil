import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import ParticleBackground from './components/ParticleBackground'
import Sidebar from './components/Sidebar'
import CharacterSection from './components/CharacterSection'
import Navigation from './components/Navigation'
import RightSidebar from './components/RightSidebar'
import CharacterAnalysis from './components/CharacterAnalysis'
import BodyPartViewer from './components/BodyPartViewer'
import ClothingAnalytics from './components/ClothingAnalytics'
import './App.css'

// Background music
const backgroundMusic = new Audio('/music/M4GN - EL CONTROL.mp3')
backgroundMusic.loop = true
backgroundMusic.volume = 0.3

// Character data
const characters = [
  {
    id: 'leon',
    firstName: 'LEON',
    lastName: 'KENNEDY',
    image: '/images/leon.jpg',
    thumbnail: '/images/leon.jpg',
    description: [
      'Leon S. Kennedy is a former police officer who survived the Raccoon City incident. Now a federal agent, he has become one of the most skilled operatives in combating bioterrorism threats worldwide.',
      "Having faced countless B.O.W.s and survived impossible odds, Leon's experience and determination make him an invaluable asset in the fight against Umbrella's legacy and new bioweapon threats.",
      'His journey from rookie cop to seasoned agent has shaped him into a hardened survivor, yet he maintains his sense of justice and commitment to protecting innocent lives.'
    ],
    weapon: {
      name: 'SG-09 R',
      image: '/images/leon_weapon.png',
      type: 'Handgun',
      caliber: '9mm Parabellum',
      capacity: '10 rounds',
      description: 'A customized Heckler & Koch USP handgun, the SG-09 R is Leon\'s signature weapon. Modified for enhanced accuracy and reliability, this semi-automatic pistol has served him through countless encounters with B.O.W.s. Features include a match-grade barrel, custom grips, and tritium night sights.'
    }
  },
  {
    id: 'jill',
    firstName: 'JILL',
    lastName: 'VALENTINE',
    image: '/images/jill.png',
    thumbnail: '/images/jill.png',
    description: [
      "Jill Valentine is a founding member of the Special Tactics and Rescue Service (S.T.A.R.S.) and one of the original survivors of the Spencer Mansion incident that exposed Umbrella Corporation's horrific experiments.",
      "A master of unlocking and an expert in bomb disposal, Jill's skills have proven invaluable in numerous operations against bioterrorism. Her resilience was tested when she was captured and brainwashed by Wesker.",
      "After breaking free from Wesker's control, Jill continues to fight alongside the BSAA, determined to end the bioweapon threat once and for all."
    ],
    weapon: {
      name: 'Samurai Edge',
      image: '/images/jill_weapon.png',
      type: 'Handgun',
      caliber: '9mm Parabellum',
      capacity: '15 rounds',
      description: 'The Samurai Edge is a custom Beretta 92F designed exclusively for S.T.A.R.S. members by Kendo Gun Shop. Jill\'s personal variant features enhanced ergonomics, a compensator for reduced recoil, and the iconic S.T.A.R.S. emblem. A symbol of her elite training and dedication.'
    }
  },
  {
    id: 'wesker',
    firstName: 'ALBERT',
    lastName: 'WESKER',
    image: '/images/wesker.png',
    thumbnail: '/images/wesker.png',
    description: [
      'Albert Wesker was the former captain of S.T.A.R.S. Alpha Team and a double agent working for Umbrella Corporation. His betrayal at the Spencer Mansion marked the beginning of his transformation into something beyond human.',
      'Enhanced by a prototype virus, Wesker gained superhuman abilities including incredible speed, strength, and regeneration. His ambition to create a new world order through forced evolution made him one of the most dangerous threats humanity has ever faced.',
      "Cold, calculating, and utterly ruthless, Wesker's legacy continues to haunt the world even after his apparent demise in the volcanic crater of Kijuju."
    ],
    weapon: {
      name: 'Samurai Edge AW Model-01',
      image: '/images/wesker_weapon.png',
      type: 'Handgun',
      caliber: '9mm Parabellum',
      capacity: '15 rounds',
      description: 'Wesker\'s personal Samurai Edge variant, the AW Model-01, features a distinctive two-tone finish and tactical light attachment. Modified for maximum lethality, this weapon reflects Wesker\'s perfectionist nature and his position as S.T.A.R.S. Alpha Team captain before his betrayal.'
    }
  },
  {
    id: 'ada',
    firstName: 'ADA',
    lastName: 'WONG',
    image: '/images/ada.png',
    thumbnail: '/images/ada.png',
    description: [
      'Ada Wong is a mysterious spy whose true allegiances remain unknown. First encountered during the Raccoon City outbreak, she has appeared at critical moments throughout the bioterrorism crisis, always pursuing her own agenda.',
      'Skilled in espionage, combat, and manipulation, Ada operates in the shadows, working for various organizations while seemingly following her own moral code. Her complicated relationship with Leon Kennedy adds another layer to her enigmatic persona.',
      'Whether ally or enemy, Ada Wong remains one of the most unpredictable players in the ongoing battle against bioweapons.'
    ],
    weapon: {
      name: 'Hookshot',
      image: '/images/ada_weapon.png',
      type: 'Grappling Device',
      caliber: 'N/A',
      capacity: 'Unlimited',
      description: 'Ada\'s signature Hookshot is a compact grappling gun that allows her to traverse environments with unmatched agility. This high-tech device fires a grapple hook attached to a zip-line, enabling rapid vertical and horizontal movement. Essential for her espionage operations and dramatic escapes.'
    }
  }
]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisCharacter, setAnalysisCharacter] = useState(null)
  const [showBodyParts, setShowBodyParts] = useState(false)
  const [bodyPartsCharacter, setBodyPartsCharacter] = useState(null)
  const [showClothing, setShowClothing] = useState(false)
  const [clothingCharacter, setClothingCharacter] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const containerRef = useRef(null)

  const handleOpenAnalysis = (characterId) => {
    setAnalysisCharacter(characterId)
    setShowAnalysis(true)
  }

  const handleCloseAnalysis = () => {
    setShowAnalysis(false)
    setAnalysisCharacter(null)
  }

  const handleOpenBodyParts = (character) => {
    setBodyPartsCharacter(character)
    setShowBodyParts(true)
  }

  const handleCloseBodyParts = () => {
    setShowBodyParts(false)
    setBodyPartsCharacter(null)
  }

  const handleOpenClothing = (characterName) => {
    setClothingCharacter(characterName)
    setShowClothing(true)
  }

  const handleCloseClothing = () => {
    setShowClothing(false)
    setClothingCharacter(null)
  }

  const handleCharacterChange = (index) => {
    if (index !== activeIndex && !isTransitioning) {
      setIsTransitioning(true)
      setActiveIndex(index)
      setTimeout(() => setIsTransitioning(false), 800)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      handleCharacterChange((activeIndex - 1 + characters.length) % characters.length)
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      handleCharacterChange((activeIndex + 1) % characters.length)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
    backgroundMusic.muted = !isMuted
  }

  // Play background music on mount
  useEffect(() => {
    const playMusic = async () => {
      try {
        await backgroundMusic.play()
      } catch (error) {
        console.log('Autoplay prevented. User interaction required.')
        // Add click listener to start music on first interaction
        const startMusic = () => {
          backgroundMusic.play()
          document.removeEventListener('click', startMusic)
        }
        document.addEventListener('click', startMusic)
      }
    }
    playMusic()
    
    return () => {
      backgroundMusic.pause()
      backgroundMusic.currentTime = 0
    }
  }, [])

  return (
    <div className="app" ref={containerRef}>
      {/* Mute Button */}
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Three.js Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleBackground activeIndex={activeIndex} />
        </Canvas>
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        <Sidebar
          characters={characters}
          activeIndex={activeIndex}
          onCharacterChange={handleCharacterChange}
        />

        <main className="main-content">
          <Navigation />
          
          <div className="page-indicator">
            <motion.span 
              className="current"
              key={activeIndex}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.span>
            <span className="separator"> / </span>
            <span className="total">{String(characters.length).padStart(2, '0')}</span>
          </div>

          <AnimatePresence mode="wait">
            <CharacterSection
              key={characters[activeIndex].id}
              character={characters[activeIndex]}
              onOpenAnalysis={handleOpenAnalysis}
              onOpenBodyParts={handleOpenBodyParts}
              onOpenClothing={handleOpenClothing}
            />
          </AnimatePresence>

          {/* Character Analysis Modal */}
          <CharacterAnalysis
            character={analysisCharacter}
            isOpen={showAnalysis}
            onClose={handleCloseAnalysis}
          />

          {/* Body Parts Viewer */}
          <AnimatePresence>
            {showBodyParts && bodyPartsCharacter && (
              <BodyPartViewer
                character={bodyPartsCharacter}
                onClose={handleCloseBodyParts}
              />
            )}
          </AnimatePresence>

          {/* Clothing Analytics */}
          <AnimatePresence>
            {showClothing && clothingCharacter && (
              <ClothingAnalytics
                character={clothingCharacter}
                onClose={handleCloseClothing}
              />
            )}
          </AnimatePresence>
        </main>

        <RightSidebar />
      </div>
    </div>
  )
}

export default App
