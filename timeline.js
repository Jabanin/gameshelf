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

  const timeline = document.getElementById('timeline');

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





// Dans la création de la carte :
const map = L.map('map').setView([20, 0], 2);

// Style sombre (tiles en noir)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors & CartoDB',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);


// Points importants du monde du jeu vidéo
const points = [
  // Japon
  { name: "Nintendo", lat: 34.669, lon: 135.503, desc: "Kyoto, Japon – NES, Game Boy, Switch." },
  { name: "Sony Interactive Entertainment", lat: 35.6895, lon: 139.6917, desc: "Tokyo, Japon – PlayStation." },
  { name: "Capcom", lat: 34.7025, lon: 135.4959, desc: "Osaka, Japon – Street Fighter, Resident Evil." },
  { name: "Sega", lat: 35.6222, lon: 139.7264, desc: "Tokyo, Japon – Sonic, Yakuza." },
  { name: "Square Enix", lat: 35.6938, lon: 139.7034, desc: "Tokyo, Japon – Final Fantasy, Kingdom Hearts." },
  { name: "Kojima Productions", lat: 35.6661, lon: 139.7578, desc: "Tokyo, Japon – Metal Gear, Death Stranding." },

  // USA
  { name: "Microsoft Xbox", lat: 47.6425, lon: -122.136, desc: "Redmond, USA – Xbox, Halo." },
  { name: "Rockstar Games", lat: 40.7433, lon: -73.9917, desc: "New York, USA – GTA, Red Dead Redemption." },
  { name: "Valve", lat: 47.6156, lon: -122.203, desc: "Bellevue, USA – Half-Life, Steam." },
  { name: "Naughty Dog", lat: 34.0165, lon: -118.4958, desc: "Santa Monica, USA – Uncharted, The Last of Us." },
  { name: "Activision Blizzard", lat: 33.9326, lon: -118.394, desc: "Santa Monica, USA – Call of Duty, Diablo." },
  { name: "Bethesda", lat: 39.0426, lon: -77.4875, desc: "Rockville, USA – Elder Scrolls, Fallout." },

  // Europe
  { name: "Ubisoft", lat: 48.8566, lon: 2.3522, desc: "Paris, France – Assassin’s Creed, Rayman." },
  { name: "CD Projekt", lat: 52.2297, lon: 21.0122, desc: "Varsovie, Pologne – The Witcher, Cyberpunk 2077." },
  { name: "Remedy Entertainment", lat: 60.2216, lon: 24.8056, desc: "Espoo, Finlande – Alan Wake, Control." },
  { name: "Rare", lat: 53.1121, lon: -2.2214, desc: "Twycross, Royaume-Uni – Banjo-Kazooie, Sea of Thieves." },
  { name: "Larian Studios", lat: 51.0500, lon: 3.7167, desc: "Gand, Belgique – Divinity, Baldur's Gate III." },

  // Autres
  { name: "Tencent Games", lat: 22.5419, lon: 114.0596, desc: "Shenzhen, Chine – Honor of Kings, éditeur majeur." },
  { name: "Bluehole (PUBG)", lat: 37.5665, lon: 126.9780, desc: "Séoul, Corée du Sud – PUBG." },
  
];
const MapIcon = L.icon({ iconUrl: 'map-icon.png', iconSize: [32, 32], iconAnchor: [16, 16] });
points.forEach(p => {
  L.marker([p.lat, p.lon],{ icon: MapIcon })
    .addTo(map)
    .bindPopup(`<strong>${p.name}</strong><br>${p.desc}`);
});
const ctx = document.getElementById('genreChart').getContext('2d');

const genreChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [
      "Shooter (PC)", "Shooter (Console)",
      "Adventure (PC)", "Adventure (Console)",
      "RPG (Mobile)", "Strategy (Mobile)",
      "Puzzle (Mobile)", "Casino (Mobile)",
      "Simulation (Mobile)","Action-Aventure (Console)"
    ],
    datasets: [{
      label: 'Revenus 2024 (en milliards $)',
      data: [
        7.4, 8.1,
        5.8, 7.7,
        4.2, 4.1,
        2.89, 2.88,
        1.28, 5.95
      ],
      backgroundColor: [
        "#ff6384", "#ff9f40",
        "#36a2eb", "#4bc0c0",
        "#9966ff", "#ffcd56",
        "#c9cbcf", "#8bcb8f",
        "#f5707a", "#ea7c40"
      ],
      borderRadius: 80
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Milliards USD" }
      },
      x: {
        ticks: { maxRotation: 45, minRotation: 20 }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: {
        label: ctx => `$${ctx.raw.toFixed(2)} milliards`
      }}
    }
  }
});

// Données fictives (peuvent être ajustées avec de vraies études de marché)
const genreByCountry = [
  { country: "États-Unis", lat: 37.0902, lon: -95.7129, genre: "Shooter", color: "#ff6384" },
  { country: "Japon", lat: 36.2048, lon: 138.2529, genre: "RPG", color: "#9966ff" },
  { country: "Chine", lat: 35.8617, lon: 104.1954, genre: "Puzzle", color: "#c9cbcf" },
  { country: "France", lat: 46.6034, lon: 1.8883, genre: "Action-Aventure", color: "#4bc0c0" },
  { country: "Brésil", lat: -14.2350, lon: -51.9253, genre: "Sport", color: "#ffcd56" },
  { country: "Royaume-Uni", lat: 55.3781, lon: -3.4360, genre: "Simulation", color: "#8bcb8f" },
  { country: "Allemagne", lat: 51.1657, lon: 10.4515, genre: "Stratégie", color: "#36a2eb" },
  { country: "Corée du Sud", lat: 35.9078, lon: 127.7669, genre: "MOBA", color: "#f5707a" },
  { country: "Canada", lat: 56.1304, lon: -106.3468, genre: "Shooter", color: "#ff6384" },
  { country: "Inde", lat: 20.5937, lon: 78.9629, genre: "Battle Royale", color: "#ff9f40" },
];

// Affichage des marqueurs avec des cercles colorés
genreByCountry.forEach(entry => {
  L.circleMarker([entry.lat, entry.lon], {
    radius: 15,
    fillColor: entry.color,
    color: "#fff",
    weight: 1,
    fillOpacity: 0.8
  
  })
    .addTo(map)
    .bindPopup(`<strong>${entry.country}</strong><br>Genre dominant : <b>${entry.genre}</b>`);
});