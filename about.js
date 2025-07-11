document.addEventListener('DOMContentLoaded', () => {
const data = [
  { year: "1958", text: "Premier jeu électronique : Tennis for Two" },
  { year: "1962", text: "Développement de Spacewar! au MIT" },
  { year: "1971", text: "Première borne d'arcade : Computer Space" },
  { year: "1972", text: "Sortie de Pong et création d'Atari" },
  { year: "1972", text: "Première console de salon : Magnavox Odyssey" },
  { year: "1977", text: "Lancement de l'Atari 2600" },
  { year: "1980", text: "Sortie de Pac-Man, phénomène mondial" },
  { year: "1981", text: "Donkey Kong introduit Mario" },
  { year: "1983", text: "Krach du jeu vidéo en Amérique du Nord" },
  { year: "1983", text: "Lancement de la Famicom (NES) au Japon" },
  { year: "1985", text: "Sortie de la NES et de Super Mario Bros en Europe" },
  { year: "1989", text: "Nintendo lance le Game Boy avec Tetris" },
  { year: "1991", text: "Sortie de la Super Nintendo (SNES)" },
  { year: "1991", text: "Sega cartonne avec Sonic the Hedgehog sur Mega Drive" },
  { year: "1993", text: "Sortie de Doom, pionnier du FPS" },
  { year: "1994", text: "Sony lance la première PlayStation" },
  { year: "1996", text: "Super Mario 64 et Tomb Raider imposent la 3D" },
  { year: "1997", text: "Final Fantasy VII démocratise le JRPG" },
  { year: "1998", text: "Pokémon et Game Boy Color arrivent en Europe" },
  { year: "2000", text: "Sortie de la PlayStation 2" },
  { year: "2001", text: "Lancement de la Xbox et de la GameCube" },
  { year: "2004", text: "World of Warcraft révolutionne le MMO" },
  { year: "2005", text: "Xbox 360 : première console HD" },
  { year: "2006", text: "Nintendo sort la Wii avec détection de mouvement" },
  { year: "2007", text: "Call of Duty 4 pose les bases du FPS en ligne moderne" },
  { year: "2008", text: "GTA IV et Metal Gear Solid 4 marquent l'histoire" },
  { year: "2010", text: "Explosion du jeu mobile avec Angry Birds" },
  { year: "2011", text: "Minecraft devient un phénomène mondial" },
  { year: "2013", text: "Lancement de la PS4 et Xbox One" },
  { year: "2016", text: "Pokémon Go démocratise la réalité augmentée" },
  { year: "2017", text: "Sortie de la Nintendo Switch" },
  { year: "2018", text: "Fortnite atteint 250 millions de joueurs" },
  { year: "2020", text: "Sortie de la PS5 et Xbox Series X en pleine pandémie" },
  { year: "2020", text: "Explosion du jeu vidéo durant le confinement" },
  { year: "2022", text: "Succès mondial de Elden Ring" },
  { year: "2023", text: "Sortie acclamée de Zelda: Tears of the Kingdom" },
  { year: "2024", text: "Premiers jeux AAA avec IA générative" },
  { year: "2025", text: "Cloud gaming en plein essor (Xbox Cloud, GeForce Now)" }
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
  }, {
    threshold: 0.2
  });

  document.querySelectorAll('.timeline-event').forEach(el => {
    observer.observe(el);
  });
});