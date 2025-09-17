
// vomiting-chatbot.js - Infant Vomiting Chatbot

const steps = {
  1: { text: "How long has your child been vomiting?", options: [
      { label: "Less than 24 hours", next: 2 },
      { label: "1–3 days", next: 7 },
      { label: "More than 3 days", next: 12 }
  ]},
  2: { text: "How many episodes in the past 6 hours?", options: [
      { label: "1–3 times", next: 3 },
      { label: "4–6 times", next: 4 },
      { label: "More than 6 times", next: 5 }
  ]},
  3: { text: "Is the vomit projectile or spraying?", options: [
      { label: "Yes", next: "pyloric" },
      { label: "No", next: 6 }
  ]},
  pyloric: { text: "Projectile vomiting may indicate pyloric stenosis. Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
  ]},
  4: { text: "Is your child able to keep any fluids down?", options: [
      { label: "Yes", next: 6 },
      { label: "No", next: 5 }
  ]},
  5: { text: "Is there blood or green bile in vomit?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: "dehydrate" }
  ]},
  dehydrate: { text: "Risk of dehydration. Encourage small sips of ORS every 5 minutes. If unable, consult doctor.", options: [
      { label: "Restart", next: 1 }
  ]},
  6: { text: "Monitor and offer small frequent feeds or sips of clear fluids.", options: [
      { label: "Restart", next: 1 }
  ]},
  7: { text: "Any fever (>100.4°F) or severe abdominal pain?", options: [
      { label: "Yes", next: "infection" },
      { label: "No", next: 8 }
  ]},
  infection: { text: "Possible infection. If fever persists or pain worsens, consult doctor.", options: [
      { label: "Restart", next: 1 }
  ]},
  8: { text: "Is there diarrhea present?", options: [
      { label: "Yes", next: "dehydrate" },
      { label: "No", next: 9 }
  ]},
  9: { text: "Is your child alert and tolerating small sips?", options: [
      { label: "Yes", next: 6 },
      { label: "No", next: "doctor" }
  ]},
  12: { text: "Chronic or recurrent vomiting requires evaluation. Consult pediatrician.", options: [
      { label: "Restart", next: 1 }
  ]},
  doctor: { text: "Consult doctor immediately.", options: [
      { label: "Restart", next: 1 }
  ]}
};

function showStep(id) {
  const chatLog = document.getElementById("vomit-chat-log");
  chatLog.innerHTML = "";
  const step = steps[id];
  const msg = document.createElement("div");
  msg.className = "bot mb-4";
  msg.innerHTML = step.text.replace(/\n/g, "<br>");
  chatLog.appendChild(msg);
  step.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.label;
    btn.onclick = () => showStep(opt.next);
    btn.className = "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg m-2";
    chatLog.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("vomit-chat-container");
  const logDiv = document.createElement("div");
  logDiv.id = "vomit-chat-log";
  container.appendChild(logDiv);
  showStep(1);
});
