const filters = document.querySelector('.filters');
const buttons = [...filters.querySelectorAll('button')];
const projects = [...document.querySelectorAll('#video-grid [data-category]')];
const workCount = document.getElementById('work-count');
const players = [...document.querySelectorAll('video')];

filters.hidden = false;

filters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;

  const category = button.dataset.filter;
  let shown = 0;
  for (const project of projects) {
    project.hidden = category !== 'all' && project.dataset.category !== category;
    if (project.hidden) {
      project.querySelector('video').pause();
    } else {
      shown += 1;
    }
  }
  for (const peer of buttons) {
    peer.setAttribute('aria-pressed', String(peer === button));
  }
  workCount.textContent = shown === 1 ? '1 video' : `${shown} videos`;
});

for (const player of players) {
  player.addEventListener('play', () => {
    for (const other of players) {
      if (other !== player) other.pause();
    }
  });
}

