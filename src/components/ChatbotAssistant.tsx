import React, { useState, useRef, useEffect } from 'react';
import './ChatbotAssistant.css';

interface Product {
  id: string;
  name: string;
  category: 'FASHION' | 'SKINCARE';
  price: number;
  emoji: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  products?: Product[];
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Velvet Midnight Evening Dress', category: 'FASHION', price: 299.00, emoji: '👗' },
  { id: '2', name: 'Hydra-Glow Dewy Moisturizer', category: 'SKINCARE', price: 45.00, emoji: '🧴' },
  { id: '3', name: 'Pure Radiance Vitamin C Serum', category: 'SKINCARE', price: 68.00, emoji: '✨' },
  { id: '4', name: 'Classic Tailored Blazer', category: 'FASHION', price: 185.00, emoji: '🧥' }
];

const ChatbotAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I'm your AVELLIN stylistic assistant. Looking for a new skincare routine or a fresh outfit for an event? Tell me what you need!", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    // Simulate AI thinking
    setTimeout(() => {
      const lowerQuery = userMsg.text.toLowerCase();
      const matched = MOCK_PRODUCTS.filter(p => 
        lowerQuery.includes(p.name.toLowerCase()) || 
        lowerQuery.includes(p.category.toLowerCase()) ||
        (p.category === 'SKINCARE' && lowerQuery.includes('skin')) ||
        (p.category === 'FASHION' && (lowerQuery.includes('dress') || lowerQuery.includes('outfit')))
      );

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: matched.length > 0 ? "I've found these recommendations for you:" : "That's an interesting request! I'm still learning your style, but check these out.",
        sender: 'bot',
        products: matched.length > 0 ? matched.slice(0, 3) : MOCK_PRODUCTS.slice(0, 2)
      };

      setIsThinking(false);
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  return (
    <div className="chatbot-widget">
      {!isOpen ? (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          <span className="sparkle">✨</span> Ask AI
        </button>
      ) : (
        <div className="chat-window shadow-glass">
          <div className="chat-header">
            <div className="status-container">
              <span className="status-dot"></span>
              <h3>AVELLIN AI</h3>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>&times;</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className="message-wrapper">
                <div className={`message-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
                {msg.products && (
                  <div className="product-results">
                    {msg.products.map(product => (
                      <div key={product.id} className="mini-product-card">
                        <div className="mini-img">{product.emoji}</div>
                        <div className="mini-info">
                          <span className="mini-cat">{product.category}</span>
                          <h4>{product.name}</h4>
                          <p>${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isThinking && (
              <div className="thinking-dots">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type your request..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotAssistant;
