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

    // Affichage des jeux récents
    const gamesPreview = document.getElementById('gamesPreview');
      gamesList.innerHTML = '';
      db.collection("gamesPreview").orderBy("year", "desc").get().then(snapshot => {
        snapshot.forEach(doc => {
          const game = doc.data();
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <img src="${game.image}" alt="${game.name}" onerror="this.src='https://via.placeholder.com/150x200.png?text=Image'">
            <h3>${game.name}</h3>
            <p>${game.console}</p>
          `;
          gamesList.appendChild(card);
        });
      });


    // Affichage des consoles
    const consolesPreview = document.getElementById('consolesPreview');
    db.collection("consoles").orderBy("year", "desc").limit(4).get().then(snapshot => {
      snapshot.forEach(doc => {
        const console = doc.data();
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
          <img src="${console.image}" alt="${console.name}" onerror="this.src='https://via.placeholder.com/150x150.png?text=Console'">
          <h3>${console.name}</h3>
          <p>${console.type} • ${console.year}</p>
        `;
        consolesPreview.appendChild(div);
      });
    });