import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Navigation.css'

const navItems = ['INICIO', 'SYNOPSIS', 'CAST', 'GALLERY', 'TRAILER']

function Navigation() {
  const [activeNav, setActiveNav] = useState(0)

  return (
    <motion.header
      className="top-nav"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <nav className="nav-links">
        {navItems.map((item, index) => (
          <motion.a
            key={item}
            href="#"
            className={`nav-link ${index === activeNav ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              setActiveNav(index)
            }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            {item}
            {index === activeNav && (
              <motion.div
                className="nav-underline"
                layoutId="navUnderline"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.a>
        ))}
      </nav>
    </motion.header>
  )
}

export default Navigation
