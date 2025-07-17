const dbAbout = firebase.firestore();

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Compter les jeux
    const jeuxSnap = await dbAbout.collection('games').get();
    const totalJeux = jeuxSnap.size;

    // Compter les consoles
    const consolesSnap = await dbAbout.collection('consoles').get();
    const totalConsoles = consolesSnap.size;

    // Données de la frise
    const data = [
      { year: "Licence Préférée", text: "The Legend of Zelda" },
      { year: "Nombre de jeux", text: `${totalJeux}` },
      { year: "Nombre de consoles", text: `${totalConsoles}` },
      { year: "1998", text: "Pokémon et Game Boy Color arrivent en Europe" },
      { year: "2000", text: "Sortie de la PlayStation 2" },
      { year: "2001", text: "Lancement de la Xbox et de la GameCube" },
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
