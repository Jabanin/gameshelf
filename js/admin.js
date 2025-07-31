// --- AUTHENTIFICATION ADMIN ---
const adminUIDs = [
  "yzAfKSOC92XfIOJDoz9Zgw21vQH3" // Remplace par tes UID admin
];

let adminInitialized = false;

auth.onAuthStateChanged(user => {
  if (user && adminUIDs.includes(user.uid)) {
    document.getElementById('adminContent').style.display = 'block';
    document.getElementById('authError').style.display = 'none';
    if (!adminInitialized) {
      initAdminPage();
      adminInitialized = true;
    }
  } else {
    document.getElementById('adminContent').style.display = 'none';
    document.getElementById('authError').style.display = 'block';
    adminInitialized = false;
  }
});

function initAdminPage() {
  gestionJeux();
  gestionConsoles();
  gestionSouhaits();
  gestionImportExport();
}

// ==================
// --- GESTION JEUX ---
// ==================
function gestionJeux() {
  const gameForm = document.getElementById('gameForm');
  const gameList = document.getElementById('gameList');
  const borrowerInput = document.getElementById('borrower');

  gameForm.addEventListener('submit', async e => {
    e.preventDefault();
    const id = document.getElementById('gameId').value;
    const game = {
      name: document.getElementById('name').value.trim(),
      console: document.getElementById('console').value.trim(),
      genre: document.getElementById('genre').value.trim(),
      year: parseInt(document.getElementById('year').value) || null,
      rating: parseFloat(document.getElementById('rating').value) || null,
      image: document.getElementById('image').value.trim(),
      status: document.getElementById('statut').value.trim(),
      borrower: document.getElementById('borrower').value.trim(),
      obtenue: document.getElementById('obtenue').value.trim(),
      resume: document.getElementById('resume').value.trim(),
      avis: document.getElementById('avis').value.trim(),
      favorite: document.getElementById('favorite').checked,
      materiel: document.getElementById('materiel').value.trim(),
      editeur: document.getElementById('editeur').value.trim(),
      developpeur: document.getElementById('developpeur').value.trim()
    };
    try {
      if (id) {
        await db.collection('games').doc(id).set(game);
      } else {
        await db.collection('games').add(game);
      }
      gameForm.reset();
      borrowerInput.style.display = 'none';
      renderGames(document.getElementById('searchGames').value);
    } catch (error) {
      alert("Erreur lors de l'enregistrement : " + error.message);
    }
  });

  function createGameCard(game) {
    const div = document.createElement('div');
    const g = game.data;
    div.className = 'card card-admin';
    div.innerHTML = `
      <p><strong>${g.name}</strong></p>
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
        data-editeur="${g.editeur}"
        data-developpeur="${g.developpeur}"
        data-favorite="${g.favorite ? 'true' : 'false'}"
        data-resume="${(g.resume || '').replace(/"/g, '&quot;')}"
        data-avis="${(g.avis || '').replace(/"/g, '&quot;')}"
        data-materiel="${g.materiel || ''}"
      >Modifier</button>
      <button onclick="deleteGame('${game.id}')">Supprimer</button>
    `;
    return div;
  }

  window.renderGames = async function(filter = '') {
    try {
      const snapshot = await db.collection('games').orderBy('name').get();
      const docs = [];
      snapshot.forEach(doc => docs.push({ id: doc.id, data: doc.data() }));
      const filtered = docs.filter(doc => 
        doc.data.name.toLowerCase().includes(filter.toLowerCase()) ||
        doc.data.console.toLowerCase().includes(filter.toLowerCase())
      );
      const itemsToShow = showMore.games === Infinity ? filtered : filtered.slice(0, showMore.games);
      gameList.innerHTML = '';
      itemsToShow.forEach(game => gameList.appendChild(createGameCard(game)));
      toggleButtonsVisibility('games', filtered.length);
    } catch (e) {
      alert("Erreur chargement jeux : " + e.message);
    }
  }

  document.getElementById('searchGames').addEventListener('input', e => {
    renderGames(e.target.value);
  });

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
      borrowerInput.style.display = btn.dataset.statut.toLowerCase() === 'prêté' ? 'inline-block' : 'none';
    }
  });

  window.deleteGame = async function(id) {
    if (confirm("Supprimer ce jeu ?")) {
      try {
        await db.collection('games').doc(id).delete();
        renderGames(document.getElementById('searchGames').value);
      } catch (e) {
        alert("Erreur suppression : " + e.message);
      }
    }
  };

  document.getElementById('resetGame').addEventListener('click', () => {
    gameForm.reset();
    document.getElementById('gameId').value = '';
    borrowerInput.style.display = 'none';
  });

  renderGames();
}
// ======================
// --- GESTION CONSOLES ---
// ======================
function gestionConsoles() {
  const consoleForm = document.getElementById('consoleForm');
  const consoleList = document.getElementById('consoleList');

  consoleForm.addEventListener('submit', async e => {
    e.preventDefault();
    const id = document.getElementById('consoleId').value;
    const c = {
      name: document.getElementById('consoleName').value.trim(),
      fabricant: document.getElementById('consoleFabricant').value.trim(),
      year: parseInt(document.getElementById('consoleYear').value) || null,
      obtenue: parseInt(document.getElementById('consoleObtenue').value) || null,
      type: document.getElementById('consoleType').value.trim(),
      image: document.getElementById('consoleImage').value.trim(),
      generation: document.getElementById('consoleGeneration').value.trim()
    };
    try {
      if (id) {
        await db.collection('consoles').doc(id).set(c);
      } else {
        await db.collection('consoles').add(c);
      }
      consoleForm.reset();
      renderConsoles(document.getElementById('searchConsoles').value);
    } catch (e) {
      alert("Erreur sauvegarde console : " + e.message);
    }
  });

  function createConsoleCard(c) {
    const div = document.createElement('div');
    const data = c.data;
    div.className = 'card card-admin';
    div.innerHTML = `
      <p><strong>${data.name}</strong></p>
      <button class="edit-console"
        data-id="${c.id}"
        data-name="${data.name}"
        data-fabricant="${data.fabricant}"
        data-year="${data.year || ''}"
        data-obtenue="${data.obtenue || ''}"
        data-type="${data.type}"
        data-image="${data.image}"
        data-generation="${data.generation}"
      >Modifier</button>
      <button onclick="deleteConsole('${c.id}')">Supprimer</button>
    `;
    return div;
  }

  window.renderConsoles = async function(filter = '') {
    try {
      const snapshot = await db.collection('consoles').orderBy('name').get();
      const docs = [];
      snapshot.forEach(doc => docs.push({ id: doc.id, data: doc.data() }));
      const filtered = docs.filter(doc =>
        doc.data.name.toLowerCase().includes(filter.toLowerCase()) ||
        doc.data.brand.toLowerCase().includes(filter.toLowerCase())
      );
      const itemsToShow = showMore.consoles === Infinity ? filtered : filtered.slice(0, showMore.consoles);
      consoleList.innerHTML = '';
      itemsToShow.forEach(c => consoleList.appendChild(createConsoleCard(c)));
      toggleButtonsVisibility('consoles', filtered.length);
    } catch (e) {
      alert("Erreur chargement consoles : " + e.message);
    }
  }

  document.getElementById('searchConsoles').addEventListener('input', e => {
    renderConsoles(e.target.value);
  });

  document.addEventListener('click', e => {
    if (e.target.classList.contains('edit-console')) {
      const btn = e.target;
      document.getElementById('consoleId').value = btn.dataset.id;
      document.getElementById('consoleName').value = btn.dataset.name;
      document.getElementById('consoleFabricant').value = btn.dataset.fabricant;
      document.getElementById('consoleYear').value = btn.dataset.year;
      document.getElementById('consoleObtenue').value = btn.dataset.year
      document.getElementById('consoleType').value = btn.dataset.type;
      document.getElementById('consoleImage').value = btn.dataset.image;
      document.getElementById('consoleGeneration').value = btn.dataset.generation;
    }
  });

  window.deleteConsole = async function(id) {
    if (confirm("Supprimer cette console ?")) {
      try {
        await db.collection('consoles').doc(id).delete();
        renderConsoles(document.getElementById('searchConsoles').value);
      } catch (e) {
        alert("Erreur suppression : " + e.message);
      }
    }
  }

  document.getElementById('resetConsole').addEventListener('click', () => {
    consoleForm.reset();
    document.getElementById('consoleId').value = '';
  });

  renderConsoles();
}
// =======================
// --- GESTION SOUHAITS ---
// =======================
function gestionSouhaits() {
  const wishForm = document.getElementById('wishForm');
  const wishList = document.getElementById('wishList');

  wishForm.addEventListener('submit', async e => {
    e.preventDefault();
    const id = document.getElementById('wishId').value;
    const w = {
      name: document.getElementById('wishName').value.trim(),
      console: document.getElementById('wishConsole').value.trim(),
      year: parseInt(document.getElementById('wishYear').value) || null,
      image: document.getElementById('wishImage').value.trim(),
      type: document.getElementById('wishType').value.trim()
    };
    try {
      if (id) {
        await db.collection('wishlist').doc(id).set(w);
      } else {
        await db.collection('wishlist').add(w);
      }
      wishForm.reset();
      renderWishlist(document.getElementById('searchWishlist').value);
    } catch (e) {
      alert("Erreur sauvegarde souhait : " + e.message);
    }
  });

  function createWishCard(w) {
    const div = document.createElement('div');
    const data = w.data;
    div.className = 'card card-admin';
    div.innerHTML = `
      <p><strong>${data.name}</strong></p>
      <button class="edit-wish"
        data-id="${w.id}"
        data-name="${data.name}"
        data-type="${data.type}"
        data-console="${data.console}"
        data-year="${data.year || ''}"
        data-image="${data.image}"
      >Modifier</button>
      <button onclick="deleteWish('${w.id}')">Supprimer</button>
    `;
    return div;
  }

  window.renderWishlist = async function(filter = '') {
    try {
      const snapshot = await db.collection('wishlist').orderBy('name').get();
      const docs = [];
      snapshot.forEach(doc => docs.push({ id: doc.id, data: doc.data() }));
      const filtered = docs.filter(doc =>
        doc.data.name.toLowerCase().includes(filter.toLowerCase()) ||
        doc.data.console.toLowerCase().includes(filter.toLowerCase())
      );
      const itemsToShow = showMore.wishlist === Infinity ? filtered : filtered.slice(0, showMore.wishlist);
      wishList.innerHTML = '';
      itemsToShow.forEach(w => wishList.appendChild(createWishCard(w)));
      toggleButtonsVisibility('wishlist', filtered.length);
    } catch (e) {
      alert("Erreur chargement souhaits : " + e.message);
    }
  }

  document.getElementById('searchWishlist').addEventListener('input', e => {
    renderWishlist(e.target.value);
  });

  document.addEventListener('click', e => {
    if (e.target.classList.contains('edit-wish')) {
      const btn = e.target;
      document.getElementById('wishId').value = btn.dataset.id;
      document.getElementById('wishName').value = btn.dataset.name;
      document.getElementById('wishConsole').value = btn.dataset.console;
      document.getElementById('wishYear').value = btn.dataset.year;
      document.getElementById('wishImage').value = btn.dataset.image;
      document.getElementById('wishType').value = btn.dataset.type;
    }
  });

  window.deleteWish = async function(id) {
    if (confirm("Supprimer ce souhait ?")) {
      try {
        await db.collection('wishlist').doc(id).delete();
        renderWishlist(document.getElementById('searchWishlist').value);
      } catch (e) {
        alert("Erreur suppression : " + e.message);
      }
    }
  }

  document.getElementById('resetWish').addEventListener('click', () => {
    wishForm.reset();
    document.getElementById('wishId').value = '';
  });

  renderWishlist();
}
// ============================
// --- IMPORT / EXPORT JSON ---
// ============================
function gestionImportExport() {
  document.getElementById('exportBtn').addEventListener('click', async () => {
    const collections = ['games', 'consoles', 'wishlist', 'sales' ];
    const exportData = {};
    for (const col of collections) {
      const snapshot = await db.collection(col).get();
      exportData[col] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export_firebase.json';
    a.click();
  });

  document.getElementById('importBtn').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const data = JSON.parse(e.target.result);
        for (const col in data) {
          for (const doc of data[col]) {
            const { id, ...fields } = doc;
            await db.collection(col).doc(id).set(fields);
          }
        }
        alert("Importation réussie !");
        renderGames();
        renderConsoles();
        renderWishlist();
      } catch (e) {
        alert("Erreur importation : " + e.message);
      }
    };
    reader.readAsText(file);
  });
}


const showMore = {
  games: 4,
  consoles: 4,
  wishlist: 4
};

function toggleShowMore(type) {
  showMore[type] = showMore[type] === Infinity ? 4 : Infinity;
  const button = document.getElementById(`toggle${type.charAt(0).toUpperCase() + type.slice(1)}`);
  button.textContent = showMore[type] === Infinity ? 'Réduire' : 'Afficher plus';
  if (type === 'games') renderGames(document.getElementById('searchGames').value);
  if (type === 'consoles') renderConsoles(document.getElementById('searchConsoles').value);
  if (type === 'wishlist') renderWishlist(document.getElementById('searchWishlist').value);
}

function toggleButtonsVisibility(type, totalCount) {
  const button = document.getElementById(`toggle${type.charAt(0).toUpperCase() + type.slice(1)}`);
  button.style.display = totalCount > 4 ? 'block' : 'none';
}

// ====================
// --- DOM Ready ---
// ====================
document.addEventListener('DOMContentLoaded', () => {
  gestionImportExport();
});