const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', handleSendMessage);


userInput.addEventListener('keypress', function(e) {
    if (e.key ==='Enter') {
        handleSendMessage();
    }
});



async function handleSendMessage() {
    const text = userInput.value.trim();

    if (text === '') return;


    appendMessage(text, 'user-message');
    userInput.value = "";


    const thinkingBubble = appendMessage("Thinking...", "bot-message");

    try{

        const response = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: text })
});
        const data = await response.json();
        console.log("Received response from backend:", data);

        thinkingBubble.innerText = data.reply;

    } catch (error) {
        console.error("Error fetching AI response:", error);
        thinkingBubble.innerText = "Error: Could not connect to the AI server.";
    }
}


function appendMessage(text, className){
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.innerText = text;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    return messageDiv;
}