document.addEventListener('DOMContentLoaded', () => {
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
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const gameId = getQueryParam('id');
if (gameId) {
  db.collection('games').doc(gameId).get().then(doc => {
    if (doc.exists) {
      const game = doc.data();
      updateBreadcrumb(game.name);
    } else {
      updateBreadcrumb('Jeu inconnu');
    }
  });
} else {
  updateBreadcrumb('Jeu inconnu');
}
function updateBreadcrumb(gameName) {
  const breadcrumb = document.querySelector('.breadcrumb ol');
  if (!breadcrumb) return;

  // Ajoute le jeu en dernier élément (sans lien)
  const li = document.createElement('li');
  li.textContent = gameName;
  breadcrumb.appendChild(li);
}



});