'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function PrivacyPage() {
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleAgreeClick = () => {
    if (!agreedToTerms) {
      setShowError(true)
      return
    }
    setShowTermsModal(false)
    setShowError(false)
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreedToTerms(e.target.checked)
    if (e.target.checked) {
      setShowError(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-black" />
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Navigation */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <Link href="/" className="font-black text-xl text-white">
              Chancify AI
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-4"
          >
            Company
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            Privacy Policy
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-white/70 leading-relaxed mb-8"
          >
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={() => setShowTermsModal(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-full transition-colors flex items-center space-x-2 mx-auto"
          >
            <span>Read Full Policy</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">GDPR</div>
            <div className="text-white/60 text-sm font-medium">Compliant</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">SOC 2</div>
            <div className="text-white/60 text-sm font-medium">Certified</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">256-bit</div>
            <div className="text-white/60 text-sm font-medium">Encryption</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">Zero</div>
            <div className="text-white/60 text-sm font-medium">Data Selling</div>
          </motion.div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Data Collection</h3>
            <p className="text-white/70 text-sm">We only collect data necessary to provide our services and improve your experience.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Data Usage</h3>
            <p className="text-white/70 text-sm">Your data is used solely to provide personalized college admission predictions and recommendations.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Data Protection</h3>
            <p className="text-white/70 text-sm">We implement industry-standard security measures to protect your personal information.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Your Rights</h3>
            <p className="text-white/70 text-sm">You have the right to access, modify, or delete your personal data at any time.</p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              Copyright © {new Date().getFullYear()} Chancify AI. All rights reserved.
            </div>
            
            <div className="flex gap-6 text-white/60">
              <Link href="/company/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/company/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/company/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/company/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/company/privacy" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowTermsModal(false)}
          >
            {/* Blurred Background */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-black border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, #1e1e24 10%, #050505 60%)',
                position: 'relative',
                boxShadow: '0 0 50px rgba(255, 215, 0, 0.3)'
              }}
            >
              {/* Glowing Border Effect */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 0 0, hsl(27deg 93% 60%), transparent), radial-gradient(circle at 100% 0, #FFC000, transparent), radial-gradient(circle at 0 100%, #FFC000, transparent), radial-gradient(circle at 100% 100%, #FFC000, transparent)',
                  padding: '2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />

              {/* Close Button */}
              <button
                onClick={() => setShowTermsModal(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Terms Content */}
              <div className="text-white space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">Terms of Service</h2>
                  <p className="text-white/70">Last updated: October 27, 2024</p>
                  <p className="text-white/70">Effective Date: October 27, 2024</p>
                </div>

                <div className="space-y-6 text-sm leading-relaxed">
                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">1. Agreement to Terms</h3>
                    <p className="text-white/80">By accessing or using Chancify AI ("we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please discontinue use of our website and services immediately.</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">2. Eligibility</h3>
                    <p className="text-white/80">You must be at least 13 years old (or the age of majority in your country) to use our services. By using our site, you represent that you meet these requirements.</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">3. Use of Services</h3>
                    <p className="text-white/80 mb-3">You agree to use our services only for lawful purposes and in compliance with all applicable laws. You may not:</p>
                    <ul className="list-disc list-inside text-white/80 space-y-1 ml-4">
                      <li>Copy, modify, or distribute our content without permission</li>
                      <li>Use the service to harass, spam, or impersonate others</li>
                      <li>Attempt to hack, reverse-engineer, or disrupt our systems</li>
                    </ul>
                    <p className="text-white/80 mt-3">We reserve the right to suspend or terminate accounts violating these terms.</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">4. Intellectual Property</h3>
                    <p className="text-white/80">All content, designs, code, and trademarks on Chancify AI are owned or licensed by us. Unauthorized use of our intellectual property is prohibited.</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">5. User Content</h3>
                    <p className="text-white/80">By submitting, uploading, or posting any content on our platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content for the operation of our service. You are responsible for the legality and originality of all content you provide.</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">6. Third-Party Links</h3>
                    <p className="text-white/80">Our service may include links to third-party sites. We are not responsible for their content, terms, or privacy practices. Access them at your own risk.</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">7. Disclaimers</h3>
                    <p className="text-white/80">Our service is provided "as is" and "as available" without warranties of any kind. We do not guarantee uninterrupted or error-free service, or that all content will be accurate and secure.</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">8. Limitation of Liability</h3>
                    <p className="text-white/80">To the fullest extent permitted by law, Chancify AI and its affiliates shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">9. Termination</h3>
                    <p className="text-white/80">We may suspend or terminate your access at any time, without notice, for any violation of these Terms or any misuse of our service.</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">10. Governing Law</h3>
                    <p className="text-white/80">These Terms are governed by and interpreted under the laws of North Carolina, United States, without regard to its conflict of law principles.</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">11. Changes to Terms</h3>
                    <p className="text-white/80">We may update these Terms from time to time. When we do, we will post the updated version on this page and update the "Last Updated" date above. Continued use of our service after changes means you accept the revised Terms.</p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3">12. Contact Information</h3>
                    <p className="text-white/80">If you have questions or concerns about these Terms, please contact us at:</p>
                    <p className="text-white/80 mt-2">📧 chancifyai@gmail.com</p>
                    <p className="text-white/80">🏢 Marvin Ridge High School, Waxhaw, NC</p>
                  </section>
                </div>

                {/* Agreement Checkbox */}
                <div className="border-t border-white/20 pt-6 mt-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <label className="cl-checkbox">
                      <input 
                        type="checkbox" 
                        checked={agreedToTerms}
                        onChange={handleCheckboxChange}
                      />
                      <span></span>
                    </label>
                    <span className="text-white text-sm">I have read and agree to the Terms of Service</span>
                  </div>
                  
                  {showError && (
                    <p className="text-red-400 text-sm mb-4">Please agree to continue</p>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={handleAgreeClick}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-full transition-colors"
                    >
                      I Agree
                    </button>
                    <button
                      onClick={() => setShowTermsModal(false)}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS */}
      <style jsx>{`
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
          border-color: rgba(255, 255, 255, 0.6);
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

        .cl-checkbox > input:checked {
          background-color: #018786;
        }

        .cl-checkbox > input:checked + span::before {
          border-color: #FFD700;
          background-color: #000000;
        }

        .cl-checkbox > input:checked + span::after {
          border-color: #fff;
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
      `}</style>
    </div>
  )
}