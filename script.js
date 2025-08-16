
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// ⚠️ Replace with your OpenAI API key
const API_KEY = "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"; 

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    appendMessage("You", message);
    userInput.value = "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
        })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    appendMessage("Lunychat", reply);
}

function appendMessage(sender, message) {
    const messageEl = document.createElement("div");
    messageEl.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageEl);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});
