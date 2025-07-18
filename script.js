const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');
const revealButton = document.getElementById('revealButton');
const restartButton = document.getElementById('restartButton');
const normalHeader = document.getElementById('normalHeader');
const revealHeader = document.getElementById('revealHeader');

// Templates
const hiddenMessageTemplate = document.getElementById('hiddenMessageTemplate');
const visibleMessageTemplate = document.getElementById('visibleMessageTemplate');

// Store all messages
let messages = [];
let isRevealed = false;

// Initialize the chat
function initChat() {
    messages = [];
    chatMessages.innerHTML = '';
    messageInput.value = '';
    normalHeader.style.display = 'block';
    revealHeader.style.display = 'none';
    isRevealed = false;
}

// Add a new message to the chat
function addMessage(text, isHidden = true) {
    messages.push({
        text,
        isHidden,
        timestamp: new Date().toISOString()
    });
    
    renderMessages();
}

// Render all messages based on current state
function renderMessages() {
    chatMessages.innerHTML = '';
    
    messages.forEach((message, index) => {
        if (isRevealed) {
            // Show all messages as visible
            const messageElement = visibleMessageTemplate.content.cloneNode(true);
            messageElement.querySelector('.message-text').textContent = message.text;
            chatMessages.appendChild(messageElement);
        } else if (index === messages.length - 1) {
            // Show only the last message as visible
            const messageElement = visibleMessageTemplate.content.cloneNode(true);
            messageElement.querySelector('.message-text').textContent = message.text;
            chatMessages.appendChild(messageElement);
        } else {
            // Show hidden message placeholders
            const hiddenElement = hiddenMessageTemplate.content.cloneNode(true);
            const messageElement = hiddenElement.querySelector('.hidden-message');
            const textElement = hiddenElement.querySelector('.message-text');
            
            textElement.textContent = message.text;
            
            // Add click handler to reveal individual messages
            messageElement.addEventListener('click', () => {
                message.isHidden = false;
                renderMessages();
            });
            
            chatMessages.appendChild(hiddenElement);
        }
    });
    
    // Scroll to bottom with smooth behavior
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

// Handle sending a message
function sendMessage() {
    const text = messageInput.value.trim();
    if (text) {
        addMessage(text, false);
        messageInput.value = '';
        // Ensure we're scrolled to bottom after message is added and rendered
        setTimeout(() => {
            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);
    }
}

// Handle reveal button click
revealButton.addEventListener('click', () => {
    isRevealed = true;
    normalHeader.style.display = 'none';
    revealHeader.style.display = 'block';
    renderMessages();
});

// Handle restart button click
restartButton.addEventListener('click', initChat);

// Handle send button click
sendButton.addEventListener('click', sendMessage);

// Handle Enter key
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Focus the input field when the page loads
window.addEventListener('load', () => {
    messageInput.focus();
});

// Initialize the chat when page loads
window.addEventListener('DOMContentLoaded', initChat);
