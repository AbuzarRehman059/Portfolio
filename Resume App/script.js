
// 🔥 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCTJ1iUZb0mEvzn5cExsuZ7XlszBN-0sa8",
  authDomain: "resume-builder-afd62.firebaseapp.com",
  projectId: "resume-builder-afd62"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

/* AUTH */
function signup(){
  auth.createUserWithEmailAndPassword(
    document.getElementById("userEmail").value,
    document.getElementById("userPassword").value
  ).then(()=>alert("Signed Up"))
   .catch(e=>alert(e.message));
}

function login(){
  auth.signInWithEmailAndPassword(
    document.getElementById("userEmail").value,
    document.getElementById("userPassword").value
  ).then(()=>alert("Logged In"))
   .catch(e=>alert(e.message));
}

function logout(){
  auth.signOut();
}

/* FIXED RESUME GENERATION */
function generateResume(){

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const summaryEl = document.getElementById("summary");
  const skillsEl = document.getElementById("skills");
  const educationEl = document.getElementById("education");
  const expEl = document.getElementById("experience");
  const projEl = document.getElementById("projects");

  // Safety check (prevents undefined bugs)
  if(!nameEl) return;

  document.getElementById("pName").innerText = nameEl.value || "Your Name";
  document.getElementById("pEmail").innerText = emailEl.value || "Email";
  document.getElementById("pSummary").innerText = summaryEl.value || "";
  document.getElementById("pEducation").innerText = educationEl.value || "";

  // Skills
  const skillList = document.getElementById("pSkills");
  skillList.innerHTML = "";
  skillsEl.value.split(",").forEach(s=>{
    if(s.trim()){
      let li = document.createElement("li");
      li.innerText = s.trim();
      skillList.appendChild(li);
    }
  });

  // Experience
  const expList = document.getElementById("pExperience");
  expList.innerHTML = "";
  expEl.value.split("\n").forEach(e=>{
    if(e.trim()){
      let li = document.createElement("li");
      li.innerText = e.trim();
      expList.appendChild(li);
    }
  });

  // Projects
  const projList = document.getElementById("pProjects");
  projList.innerHTML = "";
  projEl.value.split("\n").forEach(p=>{
    if(p.trim()){
      let li = document.createElement("li");
      li.innerText = p.trim();
      projList.appendChild(li);
    }
  });
}

/* TEMPLATE SWITCH */
function setTemplate(t){
  const preview = document.getElementById("resumePreview");

  preview.classList.remove("t1","t2","t3","t4");
  preview.classList.add(t);


  // animation reset
  preview.style.animation = "none";
  preview.offsetHeight; 
  preview.style.animation = "fadeIn 0.5s ease";
}
/* IMAGE */
document.getElementById("imageInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const size = 200;
      canvas.width = size;
      canvas.height = size;

      // 🔥 Calculate crop area (center crop)
      let sx, sy, sWidth, sHeight;

      if (img.width > img.height) {
        sHeight = img.height;
        sWidth = img.height;
        sx = (img.width - img.height) / 2;
        sy = 0;
      } else {
        sWidth = img.width;
        sHeight = img.width;
        sx = 0;
        sy = (img.height - img.width) / 2;
      }

      // Draw cropped image
      ctx.drawImage(
        img,
        sx, sy, sWidth, sHeight,
        0, 0, size, size
      );

      const finalImg = canvas.toDataURL("image/jpeg", 0.8);
      document.getElementById("previewImg").src = finalImg;
    };
  };

  reader.readAsDataURL(file);
});

/* SAVE */
function saveResume(){
  let user = auth.currentUser;
  if(!user) return alert("Login first");

  db.collection("resumes").doc(user.uid).set({
    name: name.value,
    email: email.value,
    skills: skills.value,
    education: education.value,
    experience: experience.value,
    projects: projects.value
  });

  alert("Saved!");
}
/* LOAD */
function loadResume(){
  let user = auth.currentUser;
  if(!user) return alert("Login first");

  db.collection("resumes").doc(user.uid).get()
  .then(doc=>{
    if(!doc.exists) return alert("No data");

    let d = doc.data();

    name.value = d.name || "";
    email.value = d.email || "";
    skills.value = d.skills || "";
    education.value = d.education || "";
    experience.value = d.experience || "";
    projects.value = d.projects || "";

    generateResume();
  });
}

/* PDF */
function downloadPDF(){
  html2pdf().from(document.getElementById("resumePreview")).save();
}

/* THEME */
function toggleTheme(){
  document.body.classList.toggle("light");
}
