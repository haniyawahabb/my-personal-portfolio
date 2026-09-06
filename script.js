const rain = document.getElementById("rain");
for(let i=0;i<90;i++){
  const d=document.createElement("span");
  d.className="drop";
  d.style.left=Math.random()*100+"%";
  d.style.height=(35+Math.random()*65)+"px";
  d.style.opacity=(.18+Math.random()*.5);
  d.style.animationDuration=(.7+Math.random()*1.2)+"s";
  d.style.animationDelay=(-Math.random()*2)+"s";
  rain.appendChild(d);
}

const navbar=document.getElementById("navbar");
window.addEventListener("scroll",()=>{
  navbar.classList.toggle("scrolled",window.scrollY>30);
});

const menuToggle=document.getElementById("menuToggle");
const navMenu=document.getElementById("navMenu");
menuToggle.addEventListener("click",()=>navMenu.classList.toggle("open"));
document.querySelectorAll("#navMenu a").forEach(a=>a.addEventListener("click",()=>navMenu.classList.remove("open")));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach((entry,i)=>{
    if(entry.isIntersecting){
      entry.target.style.transitionDelay=(i%5)*70+"ms";
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const sections=document.querySelectorAll("section[id]");
const navLinks=document.querySelectorAll("#navMenu a");
const activeObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>activeObserver.observe(s));

const chatToggle=document.getElementById("chatToggle");
const chatbot=document.getElementById("chatbot");
document.getElementById("closeChat").onclick=()=>chatbot.classList.remove("open");
chatToggle.onclick=()=>chatbot.classList.toggle("open");

const input=document.getElementById("chatInput");
const send=document.getElementById("sendChat");
const messages=document.getElementById("chatMessages");

const knowledge=[
 {keys:["who","about","introduce","yourself","haniya"],answer:"Haniya Wahabb is an AI & Data Science enthusiast and Python Developer. She is a BS English graduate with professional training in Artificial Intelligence and Data Science. She enjoys turning ideas into practical, technology-driven solutions."},
 {keys:["skill","skills","technology","technologies","stack"],answer:"Haniya works with Python, HTML, CSS and JavaScript; NumPy, Pandas, EDA, data visualization and statistics; machine learning models such as Linear Regression, Logistic Regression, KNN, Decision Tree and Random Forest; and AI technologies including CNN, ANN, Transfer Learning, MobileNetV2, Computer Vision and NLP."},
 {keys:["project","projects","work"],answer:"Haniya has worked on Facial Emotion Recognition, Plant Disease Detection, Fresh Fruit Classification, Car Sales Data Analysis, and Nova AI Chatbot. Her projects cover computer vision, deep learning, data analysis and AI application development."},
 {keys:["emotion","facial"],answer:"Her Facial Emotion Recognition project uses Transfer Learning with MobileNetV2 and TensorFlow/Keras to classify seven emotions: Angry, Disgust, Fear, Happy, Neutral, Sad and Surprise."},
 {keys:["plant","disease"],answer:"Her Plant Disease Detection project uses deep learning and Transfer Learning with MobileNetV2 to detect plant diseases from images, applying AI to an agricultural problem."},
 {keys:["fruit","fresh"],answer:"Her Fresh Fruit Classification project uses CNN-based deep learning and computer vision to identify different types of fresh fruits from images."},
 {keys:["car","sales","analysis"],answer:"Her Car Sales Data Analysis project uses Python, Pandas, NumPy and Matplotlib to clean data, explore patterns, visualize information and generate useful insights."},
 {keys:["nova","chatbot","fastapi"],answer:"Nova AI Chatbot is a web-based AI chatbot built with a FastAPI backend and an HTML, CSS and JavaScript frontend, connected to an AI-powered API."},
 {keys:["education","qualification","degree"],answer:"Haniya is a BS English graduate and has professional training/certification in AI & Data Science."},
 {keys:["service","services","hire"],answer:"Haniya offers Python Development, Data Analysis, Data Visualization, Machine Learning Projects, Deep Learning Projects, Computer Vision Solutions, AI Chatbot Development, and FastAPI & API Development."},
 {keys:["interest","interested","future"],answer:"Haniya is interested in Artificial Intelligence, Data Science, Machine Learning, Deep Learning, Computer Vision, NLP and building practical AI-powered applications."},
 {keys:["contact","email","phone","reach"],answer:"You can contact Haniya at haniyawahab@gmail.com or 03700272600. She is open to internships, learning opportunities, collaborations and meaningful projects."}
];

function getAnswer(text){
  const t=text.toLowerCase();
  let best=null,score=0;
  knowledge.forEach(item=>{
    const s=item.keys.reduce((n,k)=>n+(t.includes(k)?1:0),0);
    if(s>score){score=s;best=item.answer}
  });
  return best || "I can answer questions about Haniya's background, education, skills, projects, services, interests and contact details. Try asking: “What are her skills?”";
}

function addMessage(text,type){
  const el=document.createElement("div");
  el.className="message "+type;
  el.textContent=text;
  messages.appendChild(el);
  messages.scrollTop=messages.scrollHeight;
  return el;
}

function speak(text){
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.rate=.95;
  u.pitch=1;
  u.volume=1;
  speechSynthesis.speak(u);
}

function typeBot(text){
  const el=addMessage("", "bot");
  let i=0;
  const timer=setInterval(()=>{
    el.textContent=text.slice(0,++i);
    messages.scrollTop=messages.scrollHeight;
    if(i>=text.length){
      clearInterval(timer);
      const voice=document.createElement("button");
      voice.textContent=" 🔊";
      voice.title="Listen";
      voice.style.cssText="border:0;background:none;cursor:pointer;font-size:13px";
      voice.onclick=()=>speak(text);
      el.appendChild(voice);
      speak(text);
    }
  },16);
}

function sendMessage(text=input.value.trim()){
  if(!text) return;
  addMessage(text,"user");
  input.value="";
  const answer=getAnswer(text);
  setTimeout(()=>typeBot(answer),450);
}

send.onclick=()=>sendMessage();
input.addEventListener("keydown",e=>{if(e.key==="Enter")sendMessage()});
document.querySelectorAll(".quick-prompts button").forEach(btn=>{
  btn.addEventListener("click",()=>sendMessage(btn.dataset.q));
});

document.querySelectorAll(".project").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(700px) rotateY(${x*2}deg) rotateX(${-y*2}deg)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="");
});
