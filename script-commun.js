let lastScrollY = 0;
let ticking = false;

const header = document.getElementById('mainHeader');
const threshold = 10; // seuil de scroll pour appliquer le style
let isScrolled = false;

function onScroll() {
  lastScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (lastScrollY > threshold && !isScrolled) {
        header.classList.add('scrolled');
        isScrolled = true;
      } else if (lastScrollY <= threshold && isScrolled) {
        header.classList.remove('scrolled');
        isScrolled = false;
      }
      ticking = false;
    });

    ticking = true;
  }
}

window.addEventListener('scroll', onScroll);


  // Configuration Firebase (à personnaliser avec ton projet)
 const firebaseConfig = {
  apiKey: "AIzaSyD1jpwKHdwD_lKp-i1b_PmsKwcXJK9Nw9g",
  authDomain: "gameshelf-4e8f5.firebaseapp.com",
  projectId: "gameshelf-4e8f5",
  storageBucket: "gameshelf-4e8f5.firebasestorage.app",
  messagingSenderId: "567826044551",
  appId: "1:567826044551:web:1f06af0cd95cd572fb0a22",
  measurementId: "G-DMKXREHX43"
};

document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('obtenue');
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
});


