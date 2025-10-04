function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) sidebar.classList.add("show");
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) sidebar.classList.remove("show");
}

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const clickSound = document.getElementById("clickSound");

// حركة الماوس
window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 500, fill: "forwards" }
  );
});

// تغيير الشكل عند المرور على اللينك
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursorDot.classList.add("active");
    cursorOutline.classList.add("active");
  });
  link.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("active");
    cursorOutline.classList.remove("active");
  });
});

// تشغيل الصوت عند الكليك
window.addEventListener("click", () => {
  clickSound.currentTime = 0; // علشان يعيد الصوت من الأول
  clickSound.play();
});

window.addEventListener("load", () => {
  document.querySelector(".loader").style.display = "none";
});


const slide = document.querySelector(".logo-slide");
if (slide) {
  const copy = slide.cloneNode(true);
  document.querySelector(".logos").appendChild(copy);
}

  document.addEventListener("DOMContentLoaded", function() {
    // نجيب كل عناصر h1 في الصفحة
    const headings = document.querySelectorAll("h1");

    // نعدل عليهم واحد واحد
    headings.forEach(h1 => {
      h1.style.fontFamily = "'Space Mono', monospace"; // font-family اللي عايزه
      h1.style.fontWeight = "700"; // الوزن (bold مثلاً)
    });
  });

// === Elements ===
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("chatbot-btn");
  const win = document.getElementById("chatbot-window");
  const closeBtn = document.getElementById("chat-close");
  const body = document.getElementById("chat-body");
  const input = document.getElementById("chat-input");
  const send = document.getElementById("chat-send");

// === Open/Close Bot ===
btn.onclick = () => win.classList.toggle("show");
closeBtn.onclick = () => win.classList.remove("show");


  send.onclick = sendMessage;
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    append("user", text);
    input.value = "";
    setTimeout(() => reply(text), 500);
  }

  function append(sender, text) {
    const div = document.createElement("div");
    div.className = "msg " + sender;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function reply(text) {
    let r = "Sorry, I didn’t get that. 😅";
    // مثال بسيط للردود
    if (text.toLowerCase().includes("hi")) r = "Hi there! 👋";
    append("bot", r);
  }
});


 document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("chatbot-btn");
  const win = document.getElementById("chatbot-window");
  const closeBtn = document.getElementById("chat-close");
  const body = document.getElementById("chat-body");
  const input = document.getElementById("chat-input");
  const send = document.getElementById("chat-send");

  // === Open/Close Bot ===
  btn.onclick = () => win.classList.toggle("show");
  closeBtn.onclick = () => win.classList.remove("show");

  send.onclick = sendMessage;
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    append("user", text);
    input.value = "";
    append("bot", "Typing...");

    // هنا بقى الـ API Key مباشرة
    const API_KEY = "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";

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: text }]
        })
      });

      const data = await res.json();
      const botReply = data.choices?.[0]?.message?.content || "Sorry, I didn’t get that 😅";

      // شيل آخر رسالة "Typing..." قبل ما تضيف الرد الحقيقي
      const lastMsg = body.querySelector(".msg.bot:last-child");
      if (lastMsg && lastMsg.textContent === "Typing...") lastMsg.remove();

      append("bot", botReply);

    } catch (err) {
      console.error(err);
      append("bot", "Error connecting to OpenAI 😅");
    }
  }

  function append(sender, text) {
    const div = document.createElement("div");
    div.className = "msg " + sender;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }
});

