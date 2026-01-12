
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { PalmSilhouettes, API_CONFIG } from './constants';
import { validateEmail, getSourceFromURL, getDomainSuggestion } from './utils';
import { AppStatus } from './types';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<AppStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (!consent) {
      setErrorMessage("Please toggle Subscribe to continue");
      return;
    }

    setIsSubmitting(true);
    setStatus('submitting');

    try {
      await fetch(API_CONFIG.scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          consent: consent,
          source: getSourceFromURL()
        })
      });

      setTimeout(() => {
        setStatus('success');
        setIsSubmitting(false);
      }, 1500);

    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage('Network error. Please check your connection.');
      setIsSubmitting(false);
    }
  }, [email, consent]);

  const handleEmailBlur = () => {
    const suggested = getDomainSuggestion(email);
    setSuggestion(suggested);
  };

  const useSuggestion = () => {
    if (suggestion) {
      setEmail(suggestion);
      setSuggestion(null);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-montserrat overflow-x-hidden bg-black text-white">
      <PalmSilhouettes />
      
      <main className="relative z-10 w-full max-w-[600px] mx-auto px-5 py-6 md:py-10 flex flex-col flex-grow">
        <Header />
        <Hero />

        {status === 'success' ? (
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center animate-in fade-in zoom-in duration-500 border-t-8 border-[#DD3333]">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="font-bebas text-4xl text-[#DD3333] mb-4 tracking-wide">Check Your Email!</h2>
            <div className="space-y-4 text-[#2C2C2C]">
              <p className="font-semibold">
                We sent a confirmation link to:<br />
                <span className="text-[#B22222] break-all">{email}</span>
              </p>
              <p className="text-sm opacity-90 font-medium">
                Click the link to unlock your <strong>two $5 discount codes</strong> instantly!
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-xs font-bold text-[#DD3333] underline uppercase tracking-widest block mx-auto"
              >
                Start Over
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                disabled={isSubmitting}
                className={`w-full bg-white text-black border-2 rounded-2xl px-6 py-5 text-lg font-montserrat outline-none transition-all
                  ${errorMessage ? 'border-[#DC3545]' : 'border-transparent focus:border-[#DD3333]'}
                  disabled:opacity-60 disabled:cursor-not-allowed shadow-xl`}
              />
              {suggestion && (
                <div className="absolute top-full left-0 right-0 mt-2 text-sm text-white/70 bg-white/10 p-2 rounded-lg backdrop-blur-md">
                  Did you mean <button type="button" onClick={useSuggestion} className="text-[#DD3333] font-bold underline">{suggestion}</button>?
                </div>
              )}
              {errorMessage && (
                <p className="text-[#DC3545] text-sm font-bold mt-3 ml-1">⚠️ {errorMessage}</p>
              )}
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="relative inline-flex items-center cursor-pointer">
                <input
                  id="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={isSubmitting}
                  className="w-8 h-8 rounded-lg accent-[#DD3333] cursor-pointer"
                />
              </div>
              <label htmlFor="consent" className="text-xl font-bebas tracking-widest text-white cursor-pointer select-none">
                Subscribe
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#DD3333] text-white font-bebas tracking-widest text-3xl py-5 px-10 rounded-2xl shadow-[0_10px_20px_rgba(221,51,51,0.3)] transition-all
                hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed
                flex items-center justify-center gap-3`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  SUBMITTING...
                </>
              ) : (
                'CLAIM MY CODES'
              )}
            </button>
          </form>
        )}

        <Footer />
      </main>
    </div>
  );
};

export default App;
