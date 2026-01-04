document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.querySelector('.input-field');
    const sendBtn = document.querySelector('.chat-controls .btn-primary');
    const messagesContainer = document.querySelector('.chat-messages');
    const promptUseBtn = document.querySelector('.prompt-widget .btn-secondary');
    const promptText = document.querySelector('.prompt-text');

    function addMessage(text, isSent) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(isSent ? 'msg-sent' : 'msg-received');
        msgDiv.innerText = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        // User sends
        addMessage(text, true);
        chatInput.value = '';

        // Simulate reply
        setTimeout(() => {
            // Simple logic to vary replies
            const replies = [
                "That resonates with me deeply.",
                "Tell me more about that.",
                "I was just thinking the same thing.",
                "It's rare to meet someone who speaks so openly."
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            addMessage(randomReply, false);
        }, 1500);
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Prompt Widget Logic
    if (promptUseBtn) {
        promptUseBtn.addEventListener('click', () => {
            // Extract text without quotes
            let text = promptText.innerText;
            if (text.startsWith('"') && text.endsWith('"')) {
                text = text.slice(1, -1);
            }
            chatInput.value = text;
            chatInput.focus();
        });
    }
});
