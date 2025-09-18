// vomit-chatbot.js – Infant Vomiting Chatbot

const steps = {
  1: { text: "How long has your child been suffering from vomiting?", options: [
      { label: "Less than 24 hours", next: 2 },
      { label: "More than 24 hours", next: "doctor" }
    ]
  },
  2: { text: "Did you give any feeds before vomiting?", options: [
      { label: "Yes", next: 3 },
      { label: "No", next: 4 }
    ]
  },
  3: { text: "Did your child vomit the last feed?", options: [
      { label: "Yes", next: 4 },
      { label: "No", next: "sip_continue" }
    ]
  },
  sip_continue: {
    text: "Continue giving sips of fluids (kanji, juice, buttermilk, water, soups) if >6 months, or breast/formula feeds if <6 months. Avoid bottles. If vomits again.",
    options: [{ label: "Restart", next: 1 }]
  },
  4: { text: "Does your child show dehydration signs (dry tongue, reduced urine)?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: 5 }
    ]
  },
  5: { text: "Is your child active?", options: [
      { label: "Yes", next: 6 },
      { label: "No", next: "doctor" }
    ]
  },
  6: { text: "Does your child have breathing difficulty?", options: [
      { label: "Yes", next: "doctor" },
      { label: "No", next: 7 }
    ]
  },
  7: { text: "What is your child's age?", options: [
      { label: "<6 months", next: 8 },
      { label: "6–12 months", next: 11 },
      { label: "1–3 years", next: 14 },
      { label: "3–6 years", next: 16 },
      { label: "6–10 years", next: 18 },
      { label: ">10 years", next: 20 }
    ]
  },
  8: { text: "Does your child have fever?", options: [
      { label: "Yes", next: "dose_100_40" },
      { label: "No", next: 9 }
    ]
  },
  dose_100_40: {
    text: "Give P100 drops (parecetamol-100 mg/ml): 8 drops (40 mg) every 6h. Consult fever chart.",
    options: [{ label: "Restart", next: 1 }]
  },
  9: { text: "Is your child only on breast feeds?", options: [
      { label: "Yes", next: "burp_normal" },
      { label: "No", next: 10 }
    ]
  },
  burp_normal: {
    text: "Likely normal. Burp adequately after every feed.",
    options: [{ label: "Restart", next: 1 }]
  },
  10: { text: "Do you use bottle feeds?", options: [
      { label: "Yes", next: "stop_bottle" },
      { label: "No", next: "burp_normal" }
    ]
  },
  stop_bottle: {
    text: "Stop bottle; give milk via spoon/paladai. Restart.",
    options: [{ label: "Restart", next: 1 }]
  },
  11: { text: "Does your child have fever?", options: [
      { label: "Yes", next: "dose_100_50_eme" },
      { label: "No", next: 12 }
    ]
  },
  dose_100_50_eme: {
    text: "Give  P100 drops (parecetamol-100 mg/ml): 10 drops (50 mg) every 6h if fever. Also Emeset (ondansetron 2mg/5ml) 2.5 ml every 12 hours if vomit. Consult fever chat.",
    options: [{ label: "Restart", next: 1 }]
  },
  12: { text: "Do you use bottle feeds?", options: [
      { label: "Yes", next: "stop_bottle_eme" },
      { label: "No", next: 13 }
    ]
  },
  stop_bottle_eme: {
    text: "Stop bottle; give milk via spoon/paladai. Give Emeset (ondansetron 2mg/5ml) 2.5 ml every 12 hours if vomit.",
    options: [{ label: "Restart", next: 1 }]
  },
  13: { text: "Loose motions or cough present?", options: [
      { label: "Yes", next: "ref_loose_cough" },
      { label: "No", next: "eme_only" }
    ]
  },
  ref_loose_cough: {
    text: "Consult loose motions or cough chatbot. Give Emeset (ondansetron 2mg/5ml) 2.5 ml every 12 hours if vomit. Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  eme_only: {
    text: " Give Emeset (ondansetron 2mg/5ml) 2.5 ml every 12 hours if vomit. Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  14: { text: "Does your child have fever?", options: [
      { label: "Yes", next: "dose_125_5_eme5" },
      { label: "No", next: 15 }
    ]
  },
  dose_125_5_eme5: {
    text: "Give P125 syrup (paracetamol-125 mg/5 ml): 5 ml every 6h. Also Emeset (ondansetron 2mg/5ml) 5 ml every 12 hours if vomit. Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  15: { text: "Loose motions or cough?", options: [
      { label: "Yes", next: "ref_loose_cough_eme5" },
      { label: "No", next: "eme_only_5" }
    ]
  },
  ref_loose_cough_eme5: {
    text: "Consult loose/cough chatbot. Give Emeset (ondansetron 2mg/5ml) 5 ml every 12 hours if vomit. Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  eme_only_5: {
    text: "Give Emeset (ondansetron 2mg/5ml) 5 ml every 12 hours if vomit. Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  16: { text: "Does your child have fever?", options: [
      { label: "Yes", next: "dose_125_75_eme75" },
      { label: "No", next: 17 }
    ]
  },
  dose_125_75_eme75: {
    text: "Give  P125 syrup (paracetamol-125 mg/5 ml): 7.5 ml every 6 hrs Also Emeset (ondansetron 2mg/5ml) 7.5 ml every 12 hours if vomit. Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  17: { text: "Loose motions or cough?", options: [
      { label: "Yes", next: "ref_loose_cough_eme75" },
      { label: "No", next: "eme_only_75" }
    ]
  },
  ref_loose_cough_eme75: {
    text: "Consult loose motions /cough chatbot.Also Emeset (ondansetron 2mg/5ml) 7.5 ml every 12 hours if vomit. Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  eme_only_75: {
    text: "Give Emeset (ondansetron 2mg/5ml) 7.5 ml every 12 hours if vomit. Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  18: { text: "Does your child have fever?", options: [
      { label: "Yes", next: "dose_250_5_vom4" },
      { label: "No", next: 19 }
    ]
  },
  dose_250_5_vom4: {
    text: "Give  P 250 syrup (paracetamol-250 mg/5 ml: 5 ml every 6h. Also Vomikind (ondansetron) 4 mg tablet every 12 hours . Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  19: { text: "Loose motions or cough?", options: [
      { label: "Yes", next: "ref_loose_cough_vom4" },
      { label: "No", next: "vom4_only" }
    ]
  },
  ref_loose_cough_vom4: {
    text: "Consult loose motions /cough chatbot. Give Vomikind (ondansetron 4 mg) tablet every 12 hours . Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  vom4_only: {
    text: "Give Vomikind 4 mg (ondansetron) tablet every 12 hours . Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  20: { text: "Does your child have fever?", options: [
      { label: "Yes", next: "dose_500_vom42" },
      { label: "No", next: 21 }
    ]
  },
  dose_500_vom42: {
    text: "Give P500 ( paracetamol 500mg) tablet every 6 hrs if fever and Vomikind (ondansetron 4 mg)-   2 tablets every 12 hours . Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  21: { text: "Loose motions or cough?", options: [
      { label: "Yes", next: "ref_loose_cough_vom42" },
      { label: "No", next: "vom42_only" }
    ]
  },
  ref_loose_cough_vom42: {
    text: "Consult loose motions /cough chatbot. Give Vomikind (ondansetron 4 mg)-   2 tablets every 12 hours . Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  vom42_only: {
    text: "Give Vomikind (Ondansetron 4 mg)-   2 tablets every 12 hours . Observe 24h, fluids every 15 mins.",
    options: [{ label: "Restart", next: 1 }]
  },
  doctor: { text: "Consult doctor immediately.", options: [{ label: "Restart", next: 1 }] }
};

function showStep(id) {
  const chatLog = document.getElementById("chat-log");
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
    btn.className = "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg m-2";
    chatLog.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("chat-container");
  const log = document.createElement("div");
  log.id = "chat-log";
  container.appendChild(log);
  showStep(1);
});
