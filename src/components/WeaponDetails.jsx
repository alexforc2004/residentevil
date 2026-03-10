import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import './WeaponDetails.css'

function WeaponDetails({ weapon, isOpen, onClose }) {
  const contentRef = useRef(null)

  useEffect(() => {
    if (isOpen && contentRef.current) {
      // GSAP animation for weapon details
      gsap.fromTo(
        contentRef.current.querySelectorAll('.detail-item'),
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out'
        }
      )
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="weapon-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="weapon-modal"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="close-button"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>

            <div className="weapon-content" ref={contentRef}>
              <div className="weapon-image-container">
                <motion.img
                  src={weapon.image}
                  alt={weapon.name}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
                <div className="weapon-glow" />
              </div>

              <div className="weapon-info">
                <motion.h2
                  className="weapon-name"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {weapon.name}
                </motion.h2>

                <div className="weapon-specs">
                  <div className="detail-item">
                    <span className="label">TYPE</span>
                    <span className="value">{weapon.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">CALIBER</span>
                    <span className="value">{weapon.caliber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">CAPACITY</span>
                    <span className="value">{weapon.capacity}</span>
                  </div>
                </div>

                <motion.p
                  className="weapon-description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {weapon.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WeaponDetails
