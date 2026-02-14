const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");

function addMessage(content, className, isHTML = false) {
    const div = document.createElement("div");
    div.className = className;

    if (isHTML) {
        div.innerHTML = content;
    } else {
        div.innerText = content;
    }

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    return div;
}

function addTypingIndicator() {
    const typing = document.createElement("div");
    typing.className = "typing-indicator";
    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typing;
}

function renderTaskCards(text) {
    const lines = text.split("\n").slice(1);
    let html = `<div class="task-list">`;

    lines.forEach(line => {
        if (!line.trim()) return;

        const status = line.includes("✅") ? "Completed" : "Pending";
        const statusIcon = status === "Completed" ? "✅" : "⏳";

        const title = line
            .replace(/\d+\.\s*/, "")
            .replace("✅", "")
            .replace("⏳", "")
            .trim();

        html += `
            <div class="task-card">
                <div class="task-title">📝 ${title}</div>
                <div class="task-meta">
                    ${statusIcon} ${status}
                </div>
            </div>
        `;
    });

    html += `</div>`;
    return html;
}

async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user-message");
    input.value = "";

    const typing = addTypingIndicator();

    try {
        const response = await fetch(
            "http://127.0.0.1:8000/chat/?message=" + encodeURIComponent(message),
            { method: "POST" }
        );

        const data = await response.json();
        chatBox.removeChild(typing);

        if (data.reply.startsWith("📋")) {
            addMessage(renderTaskCards(data.reply), "bot-message", true);
        } else {
            addMessage(data.reply, "bot-message");
        }

    } catch (error) {
        chatBox.removeChild(typing);
        addMessage("❌ Server not reachable", "bot-message");
    }
}

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
