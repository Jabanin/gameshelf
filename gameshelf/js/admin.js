// === ADMIN AUTH ===
const adminUIDs = [
  "yzAfKSOC92XfIOJDoz9Zgw21vQH3"
];

auth.onAuthStateChanged(user => {
  if (user && adminUIDs.includes(user.uid)) {
    document.getElementById('adminContent').style.display = 'block';
    initAdminPage();
  } else {
    document.getElementById('authError').style.display = 'block';
  }
});

function initAdminPage() {
  // === GESTION JEUX ===
  const gameForm = document.getElementById('gameForm');
  const gameList = document.getElementById('gameList');
 const borrowerInput = document.getElementById('borrower');
 
  gameForm.addEventListener('submit', async e => {
    e.preventDefault();
    const id = document.getElementById('gameId').value;
    const game = {
      name: document.getElementById('name').value,
      console: document.getElementById('console').value,
      genre: document.getElementById('genre').value,
      year: parseInt(document.getElementById('year').value) || null,
      rating: parseFloat(document.getElementById('rating').value) || null,
      image: document.getElementById('image').value,
      status: document.getElementById('statut').value,
      borrower: document.getElementById('borrower').value,
      obtenue: document.getElementById('obtenue').value,
      resume: document.getElementById('resume').value,
      avis: document.getElementById('avis').value,
      favorite: document.getElementById('favorite').checked,
      materiel: document.getElementById('materiel').value,
      editeur: document.getElementById('editeur').value,
      developpeur: document.getElementById('developpeur').value
    };
    if (id) {
      await db.collection('games').doc(id).set(game);
    } else {
      await db.collection('games').add(game);
    }
    gameForm.reset();
    borrowerInput.style.display = 'none';
  });

  function renderGames() {
    db.collection('games').onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(doc => docs.push({ id: doc.id, data: doc.data() }));
      filterAndDisplay(docs, gameList, 'games', game => {
        const div = document.createElement('div');
        const g = game.data;
        div.className = 'card card-admin';
        div.innerHTML = `
          <p>${g.name}</p>
          <button class="edit-game"
            data-id="${game.id}"
            data-name="${g.name}"
            data-console="${g.console}"
            data-genre="${g.genre}"
            data-year="${g.year || ''}"
            data-rating="${g.rating || ''}"
            data-image="${g.image}"
            data-statut="${g.status}"
            data-borrower="${g.borrower}"
            data-obtenue="${g.obtenue || ''}"
            data-editeur="${g.editeur || ''}"
            data-developpeur="${g.developpeur || ''}"
            data-favorite="${g.favorite ? 'true' : 'false'}"
            data-resume="${g.resume?.replace(/"/g, '&quot;') || ''}"
            data-avis="${g.avis?.replace(/"/g, '&quot;') || ''}"
            data-materiel="${g.materiel}"
          >Modifier</button>
          <button onclick="deleteGame('${game.id}')">Supprimer</button>
        `;
        return div;
      });
    });
    document.getElementById('searchGames').addEventListener('input', () => renderGames());
    document.getElementById('searchConsoles').addEventListener('input', () => renderConsoles());
  }

  document.addEventListener('click', e => {
    if (e.target.classList.contains('edit-game')) {
      const btn = e.target;
      document.getElementById('gameId').value = btn.dataset.id;
      document.getElementById('name').value = btn.dataset.name;
      document.getElementById('console').value = btn.dataset.console;
      document.getElementById('genre').value = btn.dataset.genre;
      document.getElementById('year').value = btn.dataset.year;
      document.getElementById('rating').value = btn.dataset.rating;
      document.getElementById('image').value = btn.dataset.image;
      document.getElementById('statut').value = btn.dataset.statut;
      document.getElementById('borrower').value = btn.dataset.borrower;
      document.getElementById('obtenue').value = btn.dataset.obtenue;
      document.getElementById('favorite').checked = btn.dataset.favorite === 'true';
      document.getElementById('resume').value = btn.dataset.resume;
      document.getElementById('avis').value = btn.dataset.avis;
      document.getElementById('materiel').value = btn.dataset.materiel;
      document.getElementById('editeur').value = btn.dataset.editeur;
      document.getElementById('developpeur').value = btn.dataset.developpeur;
    }
  });

  async function deleteGame(id) {
    if (confirm("Supprimer ce jeu ?")) {
      await db.collection('games').doc(id).delete();
    }
  }
  window.deleteGame = deleteGame;

  renderGames();

  // === GESTION CONSOLES ===
  const consoleForm = document.getElementById('consoleForm');
  const consoleList = document.getElementById('consoleList');

  consoleForm.addEventListener('submit', async e => {
    e.preventDefault();
    const id = document.getElementById('consoleId').value;
    const consoleData = {
      name: document.getElementById('consoleName').value,
      type: document.getElementById('consoleType').value,
      year: parseInt(document.getElementById('consoleYear').value) || null,
      image: document.getElementById('consoleImage').value,
      generation: document.getElementById('consoleGeneration').value,
      obtenue: document.getElementById('consoleObtenue').value,
      fabricant: document.getElementById('consoleFabricant').value
    };
    if (id) {
      await db.collection('consoles').doc(id).set(consoleData);
    } else {
      await db.collection('consoles').add(consoleData);
    }
    consoleForm.reset();
  });

  function renderConsoles() {
    db.collection('consoles').onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(doc => docs.push({ id: doc.id, data: doc.data() }));
      filterAndDisplay(docs, consoleList, 'consoles', c => {
        const div = document.createElement('div');
        const consoleData = c.data;
        div.className = 'card card-admin';
        div.innerHTML = `
          <p>${consoleData.name}</p>
          <button onclick="editConsole('${c.id}', ${JSON.stringify(consoleData).replace(/"/g, '&quot;')})">Modifier</button>
          <button onclick="deleteConsole('${c.id}')">Supprimer</button>
        `;
        return div;
      });
    });
    document.getElementById('searchConsoles').addEventListener('input', () => renderConsoles());
  }

  function editConsole(id, c) {
    document.getElementById('consoleId').value = id;
    document.getElementById('consoleName').value = c.name;
    document.getElementById('consoleType').value = c.type;
    document.getElementById('consoleYear').value = c.year;
    document.getElementById('consoleObtenue').value = c.obtenue;
    document.getElementById('consoleGeneration').value = c.generation;
    document.getElementById('consoleImage').value = c.image;
    document.getElementById('consoleFabricant').value = c.fabricant;
  }

  async function deleteConsole(id) {
    if (confirm("Supprimer cette console ?")) {
      await db.collection('consoles').doc(id).delete();
    }
  }
  window.deleteConsole = deleteConsole;

  renderConsoles();

  // === GESTION SOUHAITS ===
  const wishForm = document.getElementById('wishForm');
  const wishList = document.getElementById('wishList');

  wishForm.addEventListener('submit', async e => {
    e.preventDefault();
    const wishId = document.getElementById('wishId').value;
    const wishData = {
      name: document.getElementById('wishName').value,
      console: document.getElementById('wishConsole').value,
      type: document.getElementById('wishType').value,
      year: parseInt(document.getElementById('wishYear').value) || null,
      image: document.getElementById('wishImage').value,
    };
    if (wishId) {
      await db.collection('wishlist').doc(wishId).set(wishData);
    } else {
      await db.collection('wishlist').add(wishData);
    }
    wishForm.reset();
  });

  function renderWish() {
    db.collection('wishlist').onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(doc => docs.push({ id: doc.id, data: doc.data() }));
      filterAndDisplay(docs, wishList, 'wishlist', wish => {
        const div = document.createElement('div');
        const w = wish.data;
        div.className = 'card card-admin';
        div.innerHTML = `
          <p>${w.name}</p>
          <button 
            class="edit-wish"
            data-id="${wish.id}"
            data-name="${w.name}"
            data-type="${w.type}"
            data-console="${w.console}"
            data-year="${w.year || ''}"
            data-image="${w.image}"
          >Modifier</button>
          <button onclick="deleteWish('${wish.id}')">Supprimer</button>
        `;
        return div;
      });
    });
    document.getElementById('searchWishlist').addEventListener('input', () => renderWish());
  }

  document.addEventListener('click', e => {
    if (e.target.classList.contains('edit-wish')) {
      const btn = e.target;
      document.getElementById('wishId').value = btn.dataset.id;
      document.getElementById('wishName').value = btn.dataset.name;
      document.getElementById('wishConsole').value = btn.dataset.console;
      document.getElementById('wishType').value = btn.dataset.type;
      document.getElementById('wishYear').value = btn.dataset.year;
      document.getElementById('wishImage').value = btn.dataset.image;
    }
  });

  async function deleteWish(id) {
    if (confirm("Supprimer ce souhait ?")) {
      await db.collection('wishlist').doc(id).delete();
    }
  }
  window.deleteWish = deleteWish;

  renderWish();
    
    // === IMPORTER JSON ===
  async function importerJSONCompat(data, collectionName) {
    const ref = db.collection(collectionName);
    for (const item of data) {
      await ref.add(item);
    }
    alert(`Importation dans "${collectionName}" terminée !`);
  }

  function handleFileUploadTo(collectionName) {
    const input = document.getElementById("jsonFile");

    if (!input.files.length) {
      alert("Sélectionne un fichier à importer.");
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async function (e) {
      try {
        const json = JSON.parse(e.target.result);
        if (!Array.isArray(json)) throw new Error("Le JSON doit être un tableau.");
        await importerJSONCompat(json, collectionName);
      } catch (err) {
        alert("Erreur : " + err.message);
      }
    };

    reader.readAsText(file);
  }
document.getElementById('importGames').addEventListener('click', () => handleFileUploadTo('games'));
document.getElementById('importConsoles').addEventListener('click', () => handleFileUploadTo('consoles'));
document.getElementById('importSales').addEventListener('click', () => handleFileUploadTo('sales'));
document.getElementById('importEvents').addEventListener('click', () => handleFileUploadTo('timeline_events'));
document.getElementById('importWishlist').addEventListener('click', () => handleFileUploadTo('wishlist'));

  // === EXPORTER JSON===
  async function exportData() {
    const collection = document.getElementById("exportCollection").value;
    const snapshot = await db.collection(collection).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${collection}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
document.getElementById('exportButton').addEventListener('click', exportData);

//FILTRE

  function filterAndDisplay(list, container, type, renderFn) {
    const searchInput = document.getElementById(`search${type.charAt(0).toUpperCase() + type.slice(1)}`).value.toLowerCase();
    container.innerHTML = '';

    const filtered = list.filter(item => {
      const values = Object.values(item.data || item).map(v => (v || '').toString().toLowerCase());
      return values.some(value => value.includes(searchInput));
    });

    const itemsToShow = showMore[type] === Infinity ? filtered : filtered.slice(0, showMore[type]);

    for (const item of itemsToShow) {
      container.appendChild(renderFn(item));
    }
  }
const resetGameBtn = document.getElementById('resetGame');
const resetConsoleBtn = document.getElementById('resetConsole');
const resetWishBtn = document.getElementById('resetWish');

resetGameBtn.addEventListener('click', () => {
  gameForm.reset();
  document.getElementById('gameId').value = '';
  document.getElementById('borrower').style.display = 'none';
});

resetConsoleBtn.addEventListener('click', () => {
  consoleForm.reset();
  document.getElementById('consoleId').value = '';
});

resetWishBtn.addEventListener('click', () => {
  wishForm.reset();
  document.getElementById('wishId').value = '';
});


  // === AFFICHER PLUS / MOINS ===
  let showMore = {
    games: 4,
    consoles: 4,
    wishlist: 4
  };
  function toggleShowMore(type) {
  const isShowingAll = showMore[type] === Infinity;
  showMore[type] = isShowingAll ? 4 : Infinity;

  const button = document.getElementById(`toggle${type.charAt(0).toUpperCase() + type.slice(1)}`);
  button.textContent = isShowingAll ? 'Afficher plus' : 'Afficher moins';

  if (type === 'games') renderGames();
  if (type === 'consoles') renderConsoles();
  if (type === 'wishlist') renderWish();
};
document.getElementById('toggleGames').addEventListener('click', () => toggleShowMore('games'));
document.getElementById('toggleConsoles').addEventListener('click', () => toggleShowMore('consoles'));
document.getElementById('toggleWishlist').addEventListener('click', () => toggleShowMore('wishlist'));


}