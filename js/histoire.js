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
