import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import BodyPartViewer from './components/BodyPartViewer'
import ClothingAnalytics from './components/ClothingAnalytics'
import './AppNew.css'

// Background music
const backgroundMusic = new Audio('/music/M4GN - EL CONTROL.mp3')
backgroundMusic.loop = true
backgroundMusic.volume = 0.3

// Character data with unique colors
const characters = [
  {
    id: 'leon',
    firstName: 'LEON',
    lastName: 'KENNEDY',
    image: '/images/leon_kennedy_new.png',
    color: '#3B82F6', // Blue
    description: 'Leon S. Kennedy is a former police officer who survived the Raccoon City incident. Now a federal agent, he has become one of the most skilled operatives in combating bioterrorism threats worldwide.',
    weapon: {
      name: 'SG-09 R',
      image: '/images/leon_weapon.png',
      type: 'Handgun',
      caliber: '9mm Parabellum',
      capacity: '10 rounds',
      description: 'A customized Heckler & Koch USP handgun, the SG-09 R is Leon\'s signature weapon.'
    }
  },
  {
    id: 'jill',
    firstName: 'JILL',
    lastName: 'VALENTINE',
    image: '/images/jill.png',
    color: '#A855F7', // Purple
    description: 'Jill Valentine is a founding member of S.T.A.R.S. and one of the original survivors of the Spencer Mansion incident that exposed Umbrella Corporation\'s horrific experiments.',
    weapon: {
      name: 'Samurai Edge',
      image: '/images/jill_weapon.png',
      type: 'Handgun',
      caliber: '9mm Parabellum',
      capacity: '15 rounds',
      description: 'Custom Beretta 92F handgun issued to S.T.A.R.S. members.'
    }
  },
  {
    id: 'wesker',
    firstName: 'ALBERT',
    lastName: 'WESKER',
    image: '/images/wesker.png',
    color: '#EF4444', // Red
    description: 'Albert Wesker is a former S.T.A.R.S. captain turned bioterrorist. Enhanced by experimental viruses, he possesses superhuman strength, speed, and regenerative abilities.',
    weapon: {
      name: 'Samurai Edge (Custom)',
      image: '/images/wesker_weapon.png',
      type: 'Handgun',
      caliber: '.45 ACP',
      capacity: '7 rounds',
      description: 'Wesker\'s personally modified Samurai Edge with enhanced stopping power.'
    }
  },
  {
    id: 'ada',
    firstName: 'ADA',
    lastName: 'WONG',
    image: '/images/ada.png',
    color: '#DC2626', // Dark Red
    description: 'Ada Wong is a mysterious spy whose allegiances remain unclear. Her skills in espionage and combat make her a formidable operative in the shadows of the bioterrorism underworld.',
    weapon: {
      name: 'Crossbow',
      image: '/images/ada_weapon.png',
      type: 'Crossbow',
      caliber: 'Bolts',
      capacity: '10 bolts',
      description: 'Ada\'s signature weapon, a compact crossbow perfect for silent eliminations.'
    }
  }
]

function AppNew() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showBodyParts, setShowBodyParts] = useState(false)
  const [bodyPartsCharacter, setBodyPartsCharacter] = useState(null)
  const [showWeapon, setShowWeapon] = useState(false)
  const [showClothingAnalytics, setShowClothingAnalytics] = useState(false)
  const [analyticsCharacter, setAnalyticsCharacter] = useState(null)
  const swiperRef = useRef(null)

  const toggleMute = () => {
    setIsMuted(!isMuted)
    backgroundMusic.muted = !isMuted
  }

  const handleOpenBodyParts = (character) => {
    setBodyPartsCharacter(character)
    setShowBodyParts(true)
  }

  const handleCloseBodyParts = () => {
    setShowBodyParts(false)
    setBodyPartsCharacter(null)
  }

  const handleOpenClothingAnalytics = (character) => {
    setAnalyticsCharacter(character)
    setShowClothingAnalytics(true)
  }

  const handleCloseClothingAnalytics = () => {
    setShowClothingAnalytics(false)
    setAnalyticsCharacter(null)
  }

  // Play background music on mount
  useEffect(() => {
    const playMusic = async () => {
      try {
        await backgroundMusic.play()
      } catch (error) {
        console.log('Autoplay prevented. User interaction required.')
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
    <div className="app-new">
      {/* Mute Button */}
      <button className="mute-btn" onClick={toggleMute}>
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Swiper Slider */}
      <Swiper
        modules={[EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={800}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="character-swiper"
      >
        {characters.map((character, index) => (
          <SwiperSlide key={character.id}>
            <div 
              className="slide-content"
              style={{
                '--character-color': character.color
              }}
            >
              {/* Background with character color */}
              <div className="slide-bg" style={{ backgroundColor: '#1a1a1a' }}>
                <div 
                  className="color-overlay"
                  style={{
                    background: `linear-gradient(135deg, ${character.color}20 0%, transparent 70%)`
                  }}
                />
              </div>

              {/* Diagonal Geometric Shape */}
              <div 
                className="diagonal-shape"
                style={{ backgroundColor: character.color }}
              />

              {/* Content Grid */}
              <div className="content-grid">
                {/* Left Side - Text Content */}
                <div className="left-content">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    

                    <h1 className="character-name">
                      <span className="first-name">{character.firstName}</span>
                      <br />
                      <span className="last-name">{character.lastName}</span>
                    </h1>

                    <p className="character-desc">{character.description}</p>

                    <div className="action-buttons">
                      <button 
                        className="btn-primary"
                        style={{ backgroundColor: character.color }}
                        onClick={() => handleOpenBodyParts(character)}
                      >
                        VIEW DETAILS
                      </button>
                      <button 
                        className="btn-secondary"
                        onClick={() => setShowWeapon(!showWeapon)}
                      >
                        WEAPON INFO
                      </button>
                      <button 
                        className="btn-secondary"
                        onClick={() => {
                          const name = `${character.firstName.charAt(0)}${character.firstName.slice(1).toLowerCase()} ${character.lastName.charAt(0)}${character.lastName.slice(1).toLowerCase()}`;
                          handleOpenClothingAnalytics(name);
                        }}
                      >
                        OUTFIT CHARACTER
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Right Side - Character Image */}
                <div className="right-content">
                  <motion.div
                    className="character-image-container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <img 
                      src={character.image} 
                      alt={`${character.firstName} ${character.lastName}`}
                      className="character-img"
                      onClick={() => handleOpenBodyParts(character)}
                    />
                  </motion.div>

                  {/* Weapon Info Panel */}
                  <AnimatePresence>
                    {showWeapon && (
                      <motion.div
                        className="weapon-panel"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                      >
                        <h3>WATCH GAME TRAILER</h3>
                        <div className="weapon-info">
                          <img src={character.weapon.image} alt={character.weapon.name} />
                          <div>
                            <h4>{character.weapon.name}</h4>
                            <p>{character.weapon.type}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Slide Counter */}
              <div className="slide-counter">
                <span className="current">{String(index + 1).padStart(2, '0')}</span>
                <span className="separator"> / </span>
                <span className="total">{String(characters.length).padStart(2, '0')}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Body Part Viewer Modal */}
      <AnimatePresence>
        {showBodyParts && bodyPartsCharacter && (
          <BodyPartViewer
            character={bodyPartsCharacter}
            onClose={handleCloseBodyParts}
          />
        )}
      </AnimatePresence>

      {/* Clothing Analytics Modal */}
      <AnimatePresence>
        {showClothingAnalytics && analyticsCharacter && (
          <ClothingAnalytics
            character={analyticsCharacter}
            onClose={handleCloseClothingAnalytics}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default AppNew
