// Mock Database based on our earlier JSON schemas
const mockProducts = [
    {
        id: '1',
        name: 'Velvet Midnight Evening Dress',
        category: 'FASHION',
        price: 299.00,
        attributes: {
            fashion: { fit: 'Slim', sizeType: 'EU', gender: 'Women' }
        },
        tags: ['formal', 'evening', 'party'],
        emoji: '👗'
    },
    {
        id: '2',
        name: 'Hydra-Glow Dewy Moisturizer',
        category: 'SKINCARE',
        price: 45.00,
        attributes: {
            skincare: { skinType: ['dry', 'sensitive'], concerns: ['hydration'] }
        },
        tags: ['moisturizer', 'daily', 'soothing'],
        emoji: '🧴'
    },
    {
        id: '3',
        name: 'Pure Radiance Vitamin C Serum',
        category: 'SKINCARE',
        price: 68.00,
        attributes: {
            skincare: { skinType: ['oily', 'dry', 'normal'], concerns: ['aging'] }
        },
        tags: ['serum', 'treatment', 'brightening'],
        emoji: '✨'
    },
    {
        id: '4',
        name: 'Classic Tailored Blazer',
        category: 'FASHION',
        price: 185.00,
        attributes: {
            fashion: { fit: 'Regular', sizeType: 'US', gender: 'Unisex' }
        },
        tags: ['formal', 'office', 'classic'],
        emoji: '🧥'
    }
];

// DOM Elements
const chatToggle = document.getElementById('chat-toggle');
const chatClose = document.getElementById('chat-close');
const chatContainer = document.getElementById('chat-container');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const thinkingIndicator = document.getElementById('thinking');

// UI Handlers
chatToggle.addEventListener('click', () => {
    chatContainer.classList.remove('hidden');
    chatToggle.classList.add('hidden');
});

chatClose.addEventListener('click', () => {
    chatContainer.classList.add('hidden');
    chatToggle.classList.remove('hidden');
});

// Message Handling
const addMessage = (text, type = 'ai') => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

const showProductCards = (products) => {
    if (products.length === 0) {
        addMessage("I couldn't find exactly what you're looking for, but here are some of our trending pieces!", 'ai');
        return;
    }

    addMessage("I've found these recommendations for you:", 'ai');

    const cardContainer = document.createElement('div');
    cardContainer.style.display = 'flex';
    cardContainer.style.flexDirection = 'column';
    cardContainer.style.gap = '10px';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img">${product.emoji}</div>
            <div class="product-info">
                <span class="product-tag">${product.category}</span>
                <h4>${product.name}</h4>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        `;
        cardContainer.appendChild(card);
    });

    chatMessages.appendChild(cardContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Mock AI Logic
const processAIResponse = async (query) => {
    thinkingIndicator.classList.remove('hidden');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1800));

    thinkingIndicator.classList.add('hidden');

    const lowerQuery = query.toLowerCase();
    
    // Simple Keyword matching
    const matched = mockProducts.filter(p => {
        const inTags = p.tags.some(t => lowerQuery.includes(t.toLowerCase()));
        const inName = p.name.toLowerCase().includes(lowerQuery);
        const inCategory = p.category.toLowerCase().includes(lowerQuery);
        
        // Deep attribute matching (e.g., 'dry skin')
        let inAttrs = false;
        if (p.attributes.skincare && p.attributes.skincare.skinType) {
            inAttrs = p.attributes.skincare.skinType.some(s => lowerQuery.includes(s));
        }
        
        return inTags || inName || inCategory || inAttrs;
    });

    if (matched.length > 0) {
        showProductCards(matched.slice(0, 3));
    } else {
        addMessage("That's an interesting request! I'm still learning about your specific style, but I'll make sure to note that for future collections.", 'ai');
    }
};

const handleSend = () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    userInput.value = '';
    
    processAIResponse(text);
};

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
