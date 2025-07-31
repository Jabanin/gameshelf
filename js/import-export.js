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
