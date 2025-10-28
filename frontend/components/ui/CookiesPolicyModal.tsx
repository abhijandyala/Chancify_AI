'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface CookiesPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CookiesPolicyModal({ isOpen, onClose }: CookiesPolicyModalProps) {
  const [agreed, setAgreed] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleAgree = () => {
    if (agreed) {
      onClose()
      setShowError(false)
    } else {
      setShowError(true)
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked)
    if (e.target.checked) {
      setShowError(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg bg-black/70"
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-black rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1e1e24 10%, #050505 60%)',
              position: 'relative',
              boxShadow: '0 0 100px rgba(255, 215, 0, 0.8), 0 0 200px rgba(255, 215, 0, 0.4), inset 0 0 50px rgba(255, 215, 0, 0.1)',
              border: '3px solid #FFD700'
            }}
          >
            {/* Background Glow Effect - Behind Content */}
            <div 
              className="absolute inset-[-20px] rounded-2xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.8) 0%, rgba(255, 165, 0, 0.6) 30%, rgba(255, 215, 0, 0.3) 60%, transparent 100%)',
                filter: 'blur(30px)',
                zIndex: -2,
                animation: 'glow-pulse 3s ease-in-out infinite alternate'
              }}
            />
            
            {/* Inner Glow Layer */}
            <div 
              className="absolute inset-[-10px] rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.6), rgba(255, 165, 0, 0.4), rgba(255, 215, 0, 0.6))',
                filter: 'blur(15px)',
                zIndex: -1,
                animation: 'glow-pulse 2s ease-in-out infinite alternate'
              }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Cookies Policy</h2>
              <p className="text-white/70 text-sm">Last Updated: October 27, 2024 | Effective Date: October 27, 2024</p>
            </div>

            <div className="space-y-6 text-white/80 text-base leading-relaxed">
              <h3 className="text-xl font-semibold text-white mt-8 mb-2">1. Introduction</h3>
              <p>This Cookies Policy explains how Chancify AI ("we," "us," or "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control our use of them.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">2. What Are Cookies</h3>
              <p>Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide reporting information.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">3. Types of Cookies We Use</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-white/20">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/20 p-3 text-left text-white font-semibold">Type of Cookie</th>
                      <th className="border border-white/20 p-3 text-left text-white font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/20 p-3 text-white/80">Essential Cookies</td>
                      <td className="border border-white/20 p-3 text-white/80">Required for basic website functions (login, navigation, etc.)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/20 p-3 text-white/80">Performance Cookies</td>
                      <td className="border border-white/20 p-3 text-white/80">Measure website performance and how users interact (e.g., Google Analytics)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/20 p-3 text-white/80">Functional Cookies</td>
                      <td className="border border-white/20 p-3 text-white/80">Remember preferences like language, theme, or region</td>
                    </tr>
                    <tr>
                      <td className="border border-white/20 p-3 text-white/80">Advertising Cookies</td>
                      <td className="border border-white/20 p-3 text-white/80">Track user activity to deliver personalized ads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/20 p-3 text-white/80">Third-Party Cookies</td>
                      <td className="border border-white/20 p-3 text-white/80">Set by external services like YouTube, Google, or Facebook</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">4. How We Use Cookies</h3>
              <p>We use cookies for the following purposes:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>To remember user preferences and settings</li>
                <li>To improve site speed and analytics</li>
                <li>To personalize user experiences</li>
                <li>To display relevant content and advertisements</li>
                <li>To ensure website security and prevent fraud</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">5. Managing Cookies (User Control)</h3>
              <p>You can control or delete cookies through your browser settings. If you choose to disable cookies, some parts of our website may not function properly.</p>
              <p>Browser Help Links:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">Google Chrome Help</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">Safari Help</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">Mozilla Firefox Help</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">Microsoft Edge Help</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">6. Consent</h3>
              <p>When you visit our website for the first time, a banner will appear asking you to accept or manage cookies. By clicking "Accept," you consent to our use of cookies as described in this policy.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">7. Updates to This Policy</h3>
              <p>We may update this Cookies Policy from time to time to reflect changes in technology or legal requirements. Any updates will appear on this page with a revised "Last Updated" date.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">8. Contact Information</h3>
              <p>If you have questions about our use of cookies, contact us at:</p>
              <p>Email: chancifyai@gmail.com</p>
              <p>Address: Marvin Ridge High School, Waxhaw, NC</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="cl-checkbox flex items-center">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={handleCheckboxChange}
                />
                <span className="text-white/90 text-sm ml-2">I have read and understood the Cookies Policy</span>
              </label>
              {showError && (
                <p className="text-red-500 text-sm mt-2 sm:mt-0">Please acknowledge the Cookies Policy to continue</p>
              )}
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-300"
                >
                  Close
                </button>
                <button
                  onClick={handleAgree}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!agreed}
                >
                  I Understand
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Custom CSS for the checkbox
const styles = `
  @keyframes glow-pulse {
    0% {
      opacity: 0.4;
      filter: blur(25px);
      transform: scale(1);
    }
    100% {
      opacity: 0.8;
      filter: blur(35px);
      transform: scale(1.05);
    }
  }

  .cl-checkbox {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .cl-checkbox input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #FFD700;
    border-radius: 3px;
    background-color: transparent;
    cursor: pointer;
    position: relative;
    margin-right: 8px;
    transition: all 0.2s ease;
  }

  .cl-checkbox input[type="checkbox"]:checked {
    background-color: #FFD700;
    border-color: #FFD700;
  }

  .cl-checkbox input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 10px;
    border: solid #000;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .cl-checkbox input[type="checkbox"]:hover {
    border-color: #FFA500;
  }

  .cl-checkbox input[type="checkbox"]:checked:hover {
    background-color: #FFA500;
    border-color: #FFA500;
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}
