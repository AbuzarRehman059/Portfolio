console.log("JS Loaded");

/* 🔐 Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyCTJ1iUZb0mEvzn5cExsuZ7XlszBN-0sa8",
  authDomain: "resume-builder-afd62.firebaseapp.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* ================= AUTH ================= */

window.signup = function () {
  let email = document.getElementById("userEmail").value;
  let password = document.getElementById("userPassword").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => alert("User Created"))
    .catch(err => alert(err.message));
};

window.login = function () {
  let email = document.getElementById("userEmail").value;
  let password = document.getElementById("userPassword").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => alert("Login Success"))
    .catch(err => alert(err.message));
};

/* ================= RESUME GENERATION ================= */

window.generateResume = function () {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let skills = document.getElementById("skills").value.split(",");
  let education = document.getElementById("education").value;

  document.getElementById("pName").innerText = name || "Your Name";
  document.getElementById("pEmail").innerText = email || "Email";
  document.getElementById("pEducation").innerText = education || "";

  let skillList = document.getElementById("pSkills");
  skillList.innerHTML = "";

  skills.forEach(skill => {
    if (skill.trim() !== "") {
      let li = document.createElement("li");
      li.innerText = skill.trim();
      skillList.appendChild(li);
    }
  });
};

/* ================= THEME ================= */

window.toggleTheme = function () {
  document.body.classList.toggle("light");
};

/* ================= TEMPLATE SWITCH ================= */

window.setTemplate = function (template) {
  let preview = document.getElementById("resumePreview");
  preview.className = "preview " + template;
};

/* ================= IMAGE UPLOAD ================= */

document.getElementById("imageInput").addEventListener("change", function (e) {
  let reader = new FileReader();

  reader.onload = function () {
    document.getElementById("previewImg").src = reader.result;
  };

  if (e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0]);
  }
});

/* ================= PDF DOWNLOAD ================= */

window.downloadPDF = function () {
  let element = document.getElementById("resumePreview");

  html2pdf().from(element).save();
};

/* ================= DRAG & DROP ================= */

const container = document.getElementById("sectionsContainer");

// Add drag events to elements
document.querySelectorAll(".draggable").forEach(el => {
  el.addEventListener("dragstart", () => {
    el.classList.add("dragging");
  });

  el.addEventListener("dragend", () => {
    el.classList.remove("dragging");
  });
});

// Drag over container
container.addEventListener("dragover", e => {
  e.preventDefault();

  const dragging = document.querySelector(".dragging");
  const afterElement = getDragAfter(container, e.clientY);

  if (!afterElement) {
    container.appendChild(dragging);
  } else {
    container.insertBefore(dragging, afterElement);
  }
});

// Helper function
function getDragAfter(container, y) {
  const elements = [...container.querySelectorAll(".draggable:not(.dragging)")];

  return elements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}