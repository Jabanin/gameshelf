
async function loadInclude(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  }

  loadInclude("header", "header.html");
  loadInclude("footer", "footer.html");
  
// 🔐 Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1jpwKHdwD_lKp-i1b_PmsKwcXJK9Nw9g",
  authDomain: "gameshelf-4e8f5.firebaseapp.com",
  projectId: "gameshelf-4e8f5",
  storageBucket: "gameshelf-4e8f5.firebasestorage.app",
  messagingSenderId: "567826044551",
  appId: "1:567826044551:web:1f06af0cd95cd572fb0a22",
  measurementId: "G-DMKXREHX43"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function updateAuthUI(user) {
  const authLink = document.getElementById('authLink');
  if (!authLink) return;

  if (user) {
    db.collection('users').doc(user.uid).get().then(doc => {
      const data = doc.data();
      const pseudo = data?.pseudo || user.displayName || "Profil";

      authLink.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <a href="admin.html">Admin</a>
          <button id="logout-nav-btn" style="margin-left:10px;">Déconnexion</button>
        </div>
      `;

      // Ajout de l'événement déconnexion
      const logoutBtn = document.getElementById('logout-nav-btn');
      logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
          window.location.href = 'index.html';
        });
      });
    }).catch(error => {
      console.error("Erreur chargement pseudo :", error);
      authLink.innerHTML = `
        <a href="profil.html">Profil</a>
        <button id="logout-nav-btn">Déconnexion</button>
      `;
    });
  } else {
    authLink.innerHTML = `<a href="login.html">Se connecter</a>`;
  }
}

auth.onAuthStateChanged(user => {
  updateAuthUI(user);
});



// 🎯 Scripts UI
document.addEventListener('DOMContentLoaded', () => {
  // Header scroll animé
  const header = document.getElementById('mainHeader');
  let lastScrollY = 0;
  let ticking = false;
  let isScrolled = false;
  const threshold = 10;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastScrollY > threshold && !isScrolled) {
          header?.classList.add('scrolled');
          isScrolled = true;
        } else if (lastScrollY <= threshold && isScrolled) {
          header?.classList.remove('scrolled');
          isScrolled = false;
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll);


  // 🗓️ Date du jour sur input
  const dateInput = document.getElementById('obtenue');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }
});


