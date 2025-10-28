'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
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
              <h2 className="text-3xl font-bold text-white mb-2">Privacy Policy</h2>
              <p className="text-white/70 text-sm">Last Updated: October 27, 2024 | Effective Date: October 27, 2024</p>
            </div>

            <div className="space-y-6 text-white/80 text-base leading-relaxed">
              <h3 className="text-xl font-semibold text-white mt-8 mb-2">1. Introduction</h3>
              <p>Welcome to Chancify AI ("we," "us," or "our"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website, use our app, or interact with our services.</p>
              <p>By using Chancify AI, you agree to the terms described in this Privacy Policy.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">2. Information We Collect</h3>
              <p>We collect information in the following ways:</p>
              
              <h4 className="text-lg font-semibold text-white mt-6 mb-2">A. Information You Provide Directly</h4>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Name, email address, phone number, or account information</li>
                <li>Payment details (processed securely through third-party providers)</li>
                <li>Messages, uploads, or other content you submit</li>
              </ul>

              <h4 className="text-lg font-semibold text-white mt-6 mb-2">B. Information Collected Automatically</h4>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>IP address, browser type, device information, and usage data</li>
                <li>Cookies, pixels, and similar tracking technologies</li>
                <li>Log data (pages visited, session duration, and referral URLs)</li>
              </ul>

              <h4 className="text-lg font-semibold text-white mt-6 mb-2">C. Information from Third Parties</h4>
              <p>We may receive information from analytics providers, payment processors, or social media accounts (if you log in through them).</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">3. How We Use Your Information</h3>
              <p>We use your data to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send confirmations</li>
                <li>Communicate with you about updates, support, or marketing</li>
                <li>Personalize your user experience</li>
                <li>Comply with legal obligations and prevent fraud</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">4. How We Share Your Information</h3>
              <p>We do not sell your personal data. We may share your information with:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Service providers who help operate our business (e.g., hosting, analytics, payment processing)</li>
                <li>Legal authorities when required by law or to protect rights and safety</li>
                <li>Business transfers, such as mergers or acquisitions</li>
              </ul>
              <p>All third parties are required to protect your data and use it only for the intended purpose.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">5. Cookies and Tracking Technologies</h3>
              <p>We use cookies and similar technologies to improve functionality and analyze traffic. You can control or disable cookies in your browser settings, but some features may not work properly without them.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">6. Data Retention</h3>
              <p>We retain your information only as long as necessary to provide our services, comply with legal obligations, and resolve disputes.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">7. Data Security</h3>
              <p>We implement industry-standard security measures (encryption, firewalls, access controls) to protect your data. However, no system is 100% secure — you use our services at your own risk.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">8. Your Privacy Rights</h3>
              <p>Depending on your region (e.g., U.S., EU, UK, Canada, etc.), you may have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Access, correct, or delete your personal data</li>
                <li>Withdraw consent or object to processing</li>
                <li>Request a copy of your data (data portability)</li>
              </ul>
              <p>To exercise these rights, contact us at chancifyai@gmail.com.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">9. Children's Privacy</h3>
              <p>Our services are not intended for children under 13. We do not knowingly collect information from minors. If you believe we have, contact us to delete it.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">10. International Data Transfers</h3>
              <p>Your information may be stored or processed in countries outside your own. We take steps to ensure appropriate data protection measures are in place.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">11. Updates to This Policy</h3>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Continued use of our services means you accept the revised policy.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">12. Contact Us</h3>
              <p>If you have questions or concerns about this Privacy Policy, contact us at:</p>
              <p>📧 chancifyai@gmail.com</p>
              <p>🏢 Marvin Ridge High School, Waxhaw, NC</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="cl-checkbox flex items-center">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={handleCheckboxChange}
                />
                <span className="text-white/90 text-sm ml-2">I have read and understood the Privacy Policy</span>
              </label>
              {showError && (
                <p className="text-red-500 text-sm mt-2 sm:mt-0">Please acknowledge the Privacy Policy to continue</p>
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
    display: inline-block;
  }

  .cl-checkbox > input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    z-index: -1;
    position: absolute;
    left: -10px;
    top: -8px;
    display: block;
    margin: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.6);
    box-shadow: none;
    outline: none;
    opacity: 0;
    transform: scale(1);
    pointer-events: none;
    transition: opacity 0.3s, transform 0.2s;
  }

  .cl-checkbox > span {
    display: inline-block;
    width: 100%;
    cursor: pointer;
  }

  .cl-checkbox > span::before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    margin: 3px 11px 3px 1px;
    border: solid 2px;
    border-color: rgba(0, 0, 0, 0.6);
    border-radius: 2px;
    width: 18px;
    height: 18px;
    vertical-align: top;
    transition: border-color 0.2s, background-color 0.2s;
  }

  .cl-checkbox > span::after {
    content: "";
    display: block;
    position: absolute;
    top: 3px;
    left: 1px;
    width: 10px;
    height: 5px;
    border: solid 2px transparent;
    border-right: none;
    border-top: none;
    transform: translate(3px, 4px) rotate(-45deg);
  }

  .cl-checkbox > input:checked,
  .cl-checkbox > input:indeterminate {
    background-color: #018786;
  }

  .cl-checkbox > input:checked + span::before,
  .cl-checkbox > input:indeterminate + span::before {
    border-color: #FFD700;
    background-color: #000000;
  }

  .cl-checkbox > input:checked + span::after,
  .cl-checkbox > input:indeterminate + span::after {
    border-color: #fff;
  }

  .cl-checkbox > input:indeterminate + span::after {
    border-left: none;
    transform: translate(4px, 3px);
  }

  .cl-checkbox:hover > input {
    opacity: 0.04;
  }

  .cl-checkbox > input:focus {
    opacity: 0.12;
  }

  .cl-checkbox:hover > input:focus {
    opacity: 0.16;
  }

  .cl-checkbox > input:active {
    opacity: 1;
    transform: scale(0);
    transition: transform 0s, opacity 0s;
  }

  .cl-checkbox > input:active + span::before {
    border-color: #FFD700;
  }

  .cl-checkbox > input:checked:active + span::before {
    border-color: transparent;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .cl-checkbox > input:disabled {
    opacity: 0;
  }

  .cl-checkbox > input:disabled + span {
    color: rgba(0, 0, 0, 0.38);
    cursor: initial;
  }

  .cl-checkbox > input:disabled + span::before {
    border-color: currentColor;
  }

  .cl-checkbox > input:checked:disabled + span::before,
  .cl-checkbox > input:indeterminate:disabled + span::before {
    border-color: transparent;
    background-color: currentColor;
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}
