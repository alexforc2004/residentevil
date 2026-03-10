import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './RightSidebar.css'

const sidebarLinks = ['PORTADA', 'HISTORIA', 'POSTER', 'ONLINE', 'CRITICA', 'ESP']

function RightSidebar() {
  const [activeLink, setActiveLink] = useState(0)

  return (
    <motion.aside
      className="right-sidebar"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="sidebar-links">
        {sidebarLinks.map((link, index) => (
          <motion.a
            key={link}
            href="#"
            className={`sidebar-link ${index === activeLink ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              setActiveLink(index)
            }}
            whileHover={{ x: -3, color: '#ff3366' }}
            transition={{ duration: 0.2 }}
          >
            {link}
          </motion.a>
        ))}
      </div>
    </motion.aside>
  )
}

export default RightSidebar
