import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const CharacterAnalysis = ({ character, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !character) return null;

  const analysisData = {
    leon: {
      name: "Leon S. Kennedy",
      overview: "Former R.P.D. officer turned U.S. government agent. Known for his exceptional combat skills and unwavering determination.",
      physical: {
        height: "180 cm (5'11\")",
        weight: "70 kg (154 lbs)",
        bloodType: "A",
        age: "21-39 (varies by game)",
        eyeColor: "Blue-gray",
        hairColor: "Dirty blonde"
      },
      face: {
        description: "Sharp, defined features with a strong jawline. His eyes reflect both determination and the weight of his experiences.",
        characteristics: ["Piercing blue-gray eyes", "Signature swept hair", "Determined expression", "Battle scars"]
      },
      body: {
        description: "Athletic build optimized for combat and agility. Years of training have honed his physique for survival.",
        characteristics: ["Lean muscular build", "Combat-ready stance", "Quick reflexes", "Peak physical condition"]
      },
      images: {
        fullbody: "/images/leon_fullbody.png",
        face: "/images/leon_face.png"
      }
    },
    jill: {
      name: "Jill Valentine",
      overview: "Former S.T.A.R.S. member and co-founder of the BSAA. One of the most capable bioterrorism fighters in the world.",
      physical: {
        height: "166 cm (5'5\")",
        weight: "50 kg (111 lbs)",
        bloodType: "B",
        age: "23-39 (varies by game)",
        eyeColor: "Blue",
        hairColor: "Brown"
      },
      face: {
        description: "Beautiful yet fierce features that command respect. Her eyes show both compassion and steely resolve.",
        characteristics: ["Striking blue eyes", "Determined gaze", "Natural beauty", "Battle-hardened expression"]
      },
      body: {
        description: "Athletic and agile build perfect for infiltration and combat. Her training shows in every movement.",
        characteristics: ["Toned athletic build", "Agile frame", "Combat specialist physique", "Peak conditioning"]
      },
      images: {
        fullbody: "/images/jill_fullbody.png",
        face: "/images/jill_face.png"
      }
    },
    wesker: {
      name: "Albert Wesker",
      overview: "Former S.T.A.R.S. captain turned bioterrorist mastermind. Enhanced by the Prototype virus, he possesses superhuman abilities.",
      physical: {
        height: "183 cm (6'0\")",
        weight: "84 kg (185 lbs)",
        bloodType: "O",
        age: "38-49 (varies by game)",
        eyeColor: "Red (post-infection)",
        hairColor: "Blonde"
      },
      face: {
        description: "Cold, calculating features hidden behind signature sunglasses. His expression reveals nothing but superiority.",
        characteristics: ["Iconic sunglasses", "Slicked-back blonde hair", "Menacing red eyes", "Cold, calculating expression"]
      },
      body: {
        description: "Superhuman physique enhanced by viral infection. Possesses incredible speed, strength, and regeneration.",
        characteristics: ["Enhanced muscular build", "Superhuman capabilities", "Intimidating presence", "Perfect posture"]
      },
      images: {
        fullbody: "/images/wesker_fullbody.png",
        face: "/images/wesker_face.png"
      }
    },
    ada: {
      name: "Ada Wong",
      overview: "Mysterious spy working for various organizations. Her true allegiances remain unknown, but her skills are unquestionable.",
      physical: {
        height: "170 cm (5'7\")",
        weight: "52 kg (115 lbs)",
        bloodType: "AB",
        age: "24-39 (varies by game)",
        eyeColor: "Brown",
        hairColor: "Black"
      },
      face: {
        description: "Elegant Asian features with an air of mystery. Her beauty is matched only by her deadly skills.",
        characteristics: ["Captivating dark eyes", "Elegant features", "Mysterious smile", "Flawless complexion"]
      },
      body: {
        description: "Sleek and agile build perfect for espionage. Her movements are graceful yet deadly.",
        characteristics: ["Slender athletic build", "Graceful movements", "Spy-trained physique", "Elegant posture"]
      },
      images: {
        fullbody: "/images/ada_fullbody.png",
        face: "/images/ada_face.png"
      }
    }
  };

  const data = analysisData[character];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'face', label: 'Face Analysis' },
    { id: 'body', label: 'Body Analysis' },
    { id: 'stats', label: 'Physical Stats' }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-[95vw] max-w-6xl h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl overflow-hidden border border-red-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-red-600/20 hover:bg-red-600/40 transition-colors"
          >
            <span className="text-white text-2xl">&times;</span>
          </button>

          {/* Header */}
          <div className="p-6 border-b border-red-500/20">
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-4xl font-bold text-white"
            >
              {data.name}
            </motion.h2>
            <p className="text-gray-400 mt-2">Character Analysis</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-4 border-b border-red-500/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto h-[calc(90vh-180px)]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-red-500 mb-4">Profile</h3>
                    <p className="text-gray-300 leading-relaxed">{data.overview}</p>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <span className="text-gray-500 text-sm">Height</span>
                        <p className="text-white font-semibold">{data.physical.height}</p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <span className="text-gray-500 text-sm">Weight</span>
                        <p className="text-white font-semibold">{data.physical.weight}</p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <span className="text-gray-500 text-sm">Eye Color</span>
                        <p className="text-white font-semibold">{data.physical.eyeColor}</p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <span className="text-gray-500 text-sm">Hair Color</span>
                        <p className="text-white font-semibold">{data.physical.hairColor}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={data.images.fullbody}
                      alt={`${data.name} full body`}
                      className="max-h-[500px] object-contain rounded-lg"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'face' && (
                <motion.div
                  key="face"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="flex justify-center">
                    <img
                      src={data.images.face}
                      alt={`${data.name} face`}
                      className="max-h-[400px] object-contain rounded-lg border-2 border-red-500/30"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-red-500 mb-4">Facial Analysis</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">{data.face.description}</p>
                    
                    <h4 className="text-lg font-semibold text-white mb-3">Key Characteristics</h4>
                    <ul className="space-y-2">
                      {data.face.characteristics.map((char, index) => (
                        <motion.li
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-gray-300"
                        >
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          {char}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'body' && (
                <motion.div
                  key="body"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-red-500 mb-4">Body Analysis</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">{data.body.description}</p>
                    
                    <h4 className="text-lg font-semibold text-white mb-3">Physical Attributes</h4>
                    <ul className="space-y-2">
                      {data.body.characteristics.map((char, index) => (
                        <motion.li
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-gray-300"
                        >
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          {char}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={data.images.fullbody}
                      alt={`${data.name} full body`}
                      className="max-h-[500px] object-contain rounded-lg border-2 border-red-500/30"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="text-2xl font-bold text-red-500 mb-6">Physical Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {Object.entries(data.physical).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-red-500/20"
                      >
                        <span className="text-gray-500 text-sm uppercase tracking-wider">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <p className="text-white text-xl font-bold mt-2">{value}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CharacterAnalysis;
