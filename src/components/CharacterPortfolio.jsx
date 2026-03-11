import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import './CharacterPortfolio.css'

// Three.js Particle Background
function ParticleField({ color }) {
  const ref = useRef()
  const [sphere] = React.useState(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }))

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const CharacterPortfolio = ({ character, onClose }) => {
  // Portfolio data for each character with theme colors
  const portfolioData = {
    leon: {
      title: 'LEON',
      subtitle: 'KENNEDY',
      role: 'Federal Agent & Bioterrorism Expert',
      image: '/images/leon_kennedy.png',
      themeColor: '#000000',
      accentColor: '#1a1a1a',
      particleColor: '#333333',
      stats: [
        { label: 'Experience', value: '15+ Years' },
        { label: 'Missions', value: '50+' },
        { label: 'Specialization', value: 'Bioterrorism' },
        { label: 'Status', value: 'Active' }
      ],
      bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.'
    },
    jill: {
      title: 'JILL',
      subtitle: 'VALENTINE',
      role: 'S.T.A.R.S. Founding Member',
      image: '/images/jill.png',
      themeColor: '#0066ff',
      accentColor: '#1a3d7a',
      particleColor: '#0066ff',
      stats: [
        { label: 'Experience', value: '20+ Years' },
        { label: 'Missions', value: '75+' },
        { label: 'Specialization', value: 'Tactical Operations' },
        { label: 'Status', value: 'Active' }
      ],
      bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.'
    },
    albert: {
      title: 'ALBERT',
      subtitle: 'WESKER',
      role: 'Former S.T.A.R.S. Captain',
      image: '/images/Albert_Wesker-re.png',
      themeColor: '#dc143c',
      accentColor: '#1a0a0a',
      particleColor: '#dc143c',
      stats: [
        { label: 'Experience', value: '25+ Years' },
        { label: 'Missions', value: 'Classified' },
        { label: 'Specialization', value: 'Bioweapons' },
        { label: 'Status', value: 'Unknown' }
      ],
      bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.'
    },
    ada: {
      title: 'ADA',
      subtitle: 'WONG',
      role: 'Mysterious Spy',
      image: '/images/__𝐀𝐝𝐚_𝐖𝐨𝐧𝐠.png',
      themeColor: '#dc143c',
      accentColor: '#1a0a0a',
      particleColor: '#dc143c',
      stats: [
        { label: 'Experience', value: 'Unknown' },
        { label: 'Missions', value: 'Classified' },
        { label: 'Specialization', value: 'Espionage' },
        { label: 'Status', value: 'Active' }
      ],
      bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.'
    }
  }

  const data = portfolioData[character?.id] || portfolioData.leon

  return (
    <motion.div
      className="portfolio-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        '--theme-color': data.themeColor,
        '--accent-color': data.accentColor
      }}
    >
      {/* Three.js Background */}
      <div className="portfolio-canvas">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleField color={data.particleColor} />
        </Canvas>
      </div>

      {/* Animated Background Gradient */}
      <div className="portfolio-gradient-bg" style={{
        background: `linear-gradient(135deg, ${data.accentColor} 0%, ${data.themeColor} 50%, ${data.accentColor} 100%)`
      }}></div>

      {/* Close Button */}
      <motion.button
        className="portfolio-close"
        onClick={onClose}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        style={{ borderColor: data.themeColor }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.button>

      {/* Main Content Container */}
      <div className="portfolio-container">
        {/* Glassmorphism Card */}
        <motion.div
          className="portfolio-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Top Navigation */}
          <div className="portfolio-nav">
            <div className="nav-brand">{data.title.substring(0, 5)}</div>
            <div className="nav-links">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
            <button className="nav-login" style={{ background: data.themeColor }}>Login</button>
          </div>

          {/* Main Content Grid */}
          <div className="portfolio-content">
            {/* Left Side - Text Content */}
            <div className="portfolio-left">
              <motion.div
                className="portfolio-title-section"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h1 className="portfolio-main-title">
                  {data.title} <span className="title-highlight" style={{ color: data.themeColor }}>{data.subtitle}</span>
                </h1>
                <p className="portfolio-description">{data.bio}</p>
                <div className="portfolio-buttons">
                  <button className="btn-watch">WATCH</button>
                  <button className="btn-signup" style={{ background: data.themeColor }}>SIGN UP</button>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                className="portfolio-stats"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {data.stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <div className="stat-label">{stat.label}</div>
                      <div className="stat-text">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Character Image */}
            <motion.div
              className="portfolio-right"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <img src={data.image} alt={`${data.title} ${data.subtitle}`} className="portfolio-character-image" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CharacterPortfolio
