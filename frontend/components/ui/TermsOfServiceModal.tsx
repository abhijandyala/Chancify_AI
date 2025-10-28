'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface TermsOfServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
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
              <h2 className="text-3xl font-bold text-white mb-2">Terms of Service</h2>
              <p className="text-white/70 text-sm">Last updated: October 27, 2024 | Effective Date: October 27, 2024</p>
            </div>

            <div className="space-y-6 text-white/80 text-base leading-relaxed">
              <p>By accessing or using Chancify AI ("we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please discontinue use of our website and services immediately.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">2. Eligibility</h3>
              <p>You must be at least 13 years old (or the age of majority in your country) to use our services. By using our site, you represent that you meet these requirements.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">3. Use of Services</h3>
              <p>You agree to use our services only for lawful purposes and in compliance with all applicable laws. You may not:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Copy, modify, or distribute our content without permission.</li>
                <li>Use the service to harass, spam, or impersonate others.</li>
                <li>Attempt to hack, reverse-engineer, or disrupt our systems.</li>
              </ul>
              <p>We reserve the right to suspend or terminate accounts violating these terms.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">4. Intellectual Property</h3>
              <p>All content, designs, code, and trademarks on Chancify AI are owned or licensed by us. Unauthorized use of our intellectual property is prohibited.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">5. User Content</h3>
              <p>By submitting, uploading, or posting any content on our platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content for the operation of our service. You are responsible for the legality and originality of all content you provide.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">6. Third-Party Links</h3>
              <p>Our service may include links to third-party sites. We are not responsible for their content, terms, or privacy practices. Access them at your own risk.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">7. Disclaimers</h3>
              <p>Our service is provided "as is" and "as available" without warranties of any kind. We do not guarantee uninterrupted or error-free service, or that all content will be accurate and secure.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">8. Limitation of Liability</h3>
              <p>To the fullest extent permitted by law, Chancify AI and its affiliates shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">9. Termination</h3>
              <p>We may suspend or terminate your access at any time, without notice, for any violation of these Terms or any misuse of our service.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">10. Governing Law</h3>
              <p>These Terms are governed by and interpreted under the laws of North Carolina, USA, without regard to its conflict of law principles.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">11. Changes to Terms</h3>
              <p>We may update these Terms from time to time. When we do, we will post the updated version on this page and update the "Last Updated" date above. Continued use of our service after changes means you accept the revised Terms.</p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-2">12. Contact Information</h3>
              <p>If you have questions or concerns about these Terms, please contact us at:</p>
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
                <span className="text-white/90 text-sm ml-2">I agree to the Terms of Service</span>
              </label>
              {showError && (
                <p className="text-red-500 text-sm mt-2 sm:mt-0">Please agree to continue</p>
              )}
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAgree}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!agreed}
                >
                  I Agree
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
