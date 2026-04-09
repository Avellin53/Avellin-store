import React, { useState, useRef, useEffect } from 'react';
import './ChatbotAssistant.css';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "Hello! I'm your Avellin AI Assistant, powered by Gemini. Whether you need help finding a product, checking sizes, or requesting skincare advice based on your skin type—I'm here to help. What are you looking for today?",
  sender: 'bot',
};

const ChatbotAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');

    // Simulate AI typing delay and response
    setTimeout(() => {
      let botReply = "I can certainly help with that. Let me scan our verified sellers for the best options that match your request.";
      
      if (newUserMsg.text.toLowerCase().includes('skin') || newUserMsg.text.toLowerCase().includes('face')) {
        botReply = "Based on my analysis of premium skincare available, I highly recommend checking out 'Alara Skincare' in the Spotlight section. They use organic ingredients highly rated for sensitive skin. Would you like me to take you to their storefront?";
      } else if (newUserMsg.text.toLowerCase().includes('bag') || newUserMsg.text.toLowerCase().includes('leather')) {
        botReply = "I found exactly what you need. 'Onyx Leather' offers 5-star rated accessories. I've curated a list of genuine leather pieces perfectly suited to a minimalist aesthetic.";
      }

      setMessages(prev => [...prev, { id: Date.now(), text: botReply, sender: 'bot' }]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-widget">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-title-content">
                <img src="/avellin-logo.jpeg" alt="Avellin Logo" className="chatbot-header-logo" />
                <span className="chatbot-title">Avellin Assistant</span>
              </div>
              <span className="chatbot-powered">Powered by Gemini AI</span>
            </div>
            <button className="chatbot-close" onClick={toggleChat}>✕</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                {msg.sender === 'bot' && <strong>✨ AI: </strong>}
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input-area">
            <input 
              type="text" 
              className="chatbot-input" 
              placeholder="Ask for recommendations..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="chatbot-send" onClick={handleSend}>
              ➤
            </button>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button className="chatbot-button has-img" onClick={toggleChat} aria-label="Open AI Assistant">
          <img src="/avellin-logo.jpeg" alt="Avellin Logo" className="chatbot-btn-img" />
        </button>
      )}
    </div>
  );
};

export default ChatbotAssistant;
