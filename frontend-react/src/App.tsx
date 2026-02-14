import { useState, useRef, useEffect } from "react";

type Message = {
  sender: "user" | "bot";
  text?: string;
  typing?: boolean;
};

type Task = {
  id: number;
  title: string;
  status: "Pending" | "Completed";
  time?: string;
};

function parseTasks(text: string): Task[] {
  const lines = text.split("\n").slice(1);
  const tasks: Task[] = [];

  lines.forEach(line => {
    if (!line.trim()) return;

    const idMatch = line.match(/^(\d+)\./);
    const id = idMatch ? Number(idMatch[1]) : Math.random();

    const status = line.includes("✅") ? "Completed" : "Pending";

    const timeMatch = line.match(/at (.+)/);
    const time = timeMatch
      ? timeMatch[1].replace("⏳", "").replace("✅", "").trim()
      : undefined;

    const title = line
      .replace(/^(\d+)\.\s*/, "")
      .replace("✅", "")
      .replace("⏳", "")
      .replace(/at .*/, "")
      .trim();

    tasks.push({ id, title, status, time });
  });

  return tasks;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "👋 Hi! I can help manage your tasks." }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    setMessages(prev => [
      ...prev,
      { sender: "user", text: userText },
      { sender: "bot", typing: true }
    ]);

    setInput("");

    try {
      const res = await fetch(
        `https://taskbot-production-e2a6.up.railway.app/chat/?message=${encodeURIComponent(userText)}`,
        { method: "POST" }
      );

      const data = await res.json();

      setMessages(prev => {
        const filtered = prev.filter(m => !m.typing);
        return [...filtered, { sender: "bot", text: data.reply }];
      });
    } catch {
      setMessages(prev => {
        const filtered = prev.filter(m => !m.typing);
        return [...filtered, { sender: "bot", text: "❌ Server not reachable" }];
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500">
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Chat container */}
      <div className="relative z-10 w-[380px] h-[600px] bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-4">
          <h1 className="font-bold text-lg tracking-wide">🤖 TaskBot</h1>
          <p className="text-xs opacity-90 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Online
          </p>
        </div>

        {/* Chat messages */}
        <div className="flex-1 bg-gray-50 p-4 space-y-3 overflow-y-auto">
          {messages.map((msg, idx) => {
            if (msg.typing) {
              return (
                <div
                  key={idx}
                  className="bg-gray-200 px-4 py-2 rounded-xl w-fit flex gap-1"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              );
            }

            if (msg.text?.startsWith("📋")) {
              const tasks = parseTasks(msg.text);
              return (
                <div key={idx} className="space-y-2">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className="bg-white rounded-xl shadow px-4 py-3 text-sm"
                    >
                      <div className="font-semibold">📝 {task.title}</div>
                      <div className="text-xs text-gray-500 mt-1 flex gap-2">
                        <span>
                          {task.status === "Completed"
                            ? "✅ Completed"
                            : "⏳ Pending"}
                        </span>
                        {task.time && <span>⏰ {task.time}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <div
                key={idx}
                className={`text-sm px-4 py-2 rounded-xl max-w-[75%]
                  ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white ml-auto"
                      : "bg-gray-200 text-gray-900"
                  }`}
              >
                {msg.text}
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 text-sm border rounded-full outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
