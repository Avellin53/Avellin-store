import React, { useState } from 'react';
import './HowItWorks.css';

interface Props {
  currentLang: string;
}

const getMockMessage = (lang: string) => {
  switch(lang) {
    case 'Français': return "Bonjour! Est-ce disponible?";
    case 'Español': return "¡Hola! ¿Está disponible?";
    case 'Italiano': return "Ciao! È disponibile?";
    case 'Deutsch': return "Hallo! Ist das verfügbar?";
    case 'Yorùbá': return "Bawo ni! Se ohun yii wa?";
    case 'Ndi Igbo': return "Ndeewo! Ọ dị?";
    case 'Hausa': return "Sannu! Akwai wannan?";
    default: return "Hello! Is this available?";
  }
};

const HowItWorks: React.FC<Props> = ({ currentLang }) => {
  const [typedMessage, setTypedMessage] = useState('');

  return (
    <section className="hiw-section" id="about">
      <div className="container hiw-grid">
        <div className="hiw-content">
          <h2 className="section-title">The Negotiation & Safety Engine</h2>
          
          <div className="hiw-steps">
            <div className="hiw-step">
              <h4>01. Discover & Compare</h4>
              <p>Find the perfect item by comparing multiple sellers in shared categories.</p>
            </div>
            <div className="hiw-step active">
              <h4>02. Connect Instantly</h4>
              <p>Use our real-time chat to negotiate. You type in your language; the seller reads in theirs. Avellin translates seamlessly.</p>
            </div>
            <div className="hiw-step">
              <h4>03. Transact Safely</h4>
              <p>Our AI safeguards your chat, blocking external links and numbers to ensure you remain 100% protected.</p>
            </div>
          </div>
        </div>
        
        <div className="hiw-visual">
          <div className="mock-chat">
            <div className="chat-header">
              <span className="seller-name">Maison D'Or (Italiano)</span>
              <span className="live-status">● Live Translation</span>
            </div>
            <div className="chat-body">
              <div className="chat-bubble received">
                Ciao! The bag is available. (Translated)
              </div>
              <div className="chat-bubble sent">
                {getMockMessage(currentLang)}
              </div>
              <div className="chat-warning">
                ⚠️ Keep conversation and transactions inside Avellin. External links hidden.
              </div>
            </div>
            <div className="chat-footer">
              <input 
                type="text" 
                placeholder={`Type in ${currentLang}...`} 
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
              />
              <button className="chat-send">Send</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
