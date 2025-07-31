const dbAbout = firebase.firestore();

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Compter les jeux
    const jeuxSnap = await dbAbout.collection('games').get();
    const totalJeux = jeuxSnap.size;

    // Compter les consoles
    const consolesSnap = await dbAbout.collection('consoles').get();
    const totalConsoles = consolesSnap.size;

    // Obtenir le dernier jeu acheté
    const dernierJeuSnap = await dbAbout.collection('games')
      .orderBy('obtenue', 'desc') // ⬅️ modifié ici
      .limit(1)
      .get();

    let dernierJeu = "Inconnu";

    if (!dernierJeuSnap.empty) {
      const jeu = dernierJeuSnap.docs[0].data();
      const nom = jeu.name || "Sans nom";
      const date = formatDate(jeu.obtenue); // ⬅️ modifié ici
      dernierJeu = `${nom} (${date})`;
    }

    // Obtenir la dernière console achetée
    const derniereConsoleSnap = await dbAbout.collection('consoles')
      .orderBy('obtenue', 'desc') // ⬅️ modifié ici
      .limit(1)
      .get();

    let derniereConsole = "Inconnue";

    if (!derniereConsoleSnap.empty) {
      const console = derniereConsoleSnap.docs[0].data();
      const nom = console.name || "Sans nom";
      const date = formatDate(console.obtenue); // ⬅️ modifié ici
      derniereConsole = `${nom} (${date})`;
    }

    // Données de la frise
    const data = [
      { year: "Licence Préférée", text: "The Legend of Zelda" },
      { year: "Nombre de jeux", text: `${totalJeux}` },
      { year: "Nombre de consoles", text: `${totalConsoles}` },
      { year: "Jeu du moment", text: "Assassin's Creed Shadows" },
      { year: "Dernier jeu acheté", text: dernierJeu },
      { year: "Dernière console achetée", text: derniereConsole },
    ];

    const timeline = document.getElementById('about');

    data.forEach((event) => {
      const item = document.createElement('div');
      item.className = 'timeline-item timeline-event card';
      item.innerHTML = `
        <div class="timeline-date">${event.year}</div>
        <div class="timeline-content">${event.text}</div>
      `;
      timeline.appendChild(item);
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.timeline-event').forEach(el => {
      observer.observe(el);
    });

  } catch (err) {
    console.error("Erreur Firebase :", err);
  }
});

// 🔧 Fonction pour formater la date (Timestamp ou string)
function formatDate(obtenue) {
  if (!obtenue) return "Date inconnue";

  try {
    if (typeof obtenue === 'string') {
      return obtenue;
    } else if (obtenue.toDate) {
      return obtenue.toDate().toLocaleDateString();
    } else {
      return "Format non reconnu";
    }
  } catch (e) {
    return "Erreur de format";
  }
}
