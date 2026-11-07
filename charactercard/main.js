const character = {
  name: 'Snortleblat',
  class: 'Swamp Beast Diplomat',
  level: 1,
  health: 100,
  image: 'snortleblat.webp',

  attacked() {
    this.health = Math.max(0, this.health - 20);
    if (this.health === 0) {
      alert('Character died');
    }
  },

  levelUp() {
    this.level += 1;
  }
};

const nameElement = document.querySelector('#character-name');
const classElement = document.querySelector('#character-class');
const levelElement = document.querySelector('#character-level');
const healthElement = document.querySelector('#character-health');
const imageElement = document.querySelector('#character-image');
const statusElement = document.querySelector('#status');
const levelUpButton = document.querySelector('#level-up');
const attackButton = document.querySelector('#attack');

function render() {
  nameElement.textContent = character.name;
  classElement.textContent = character.class;
  levelElement.textContent = character.level;
  healthElement.textContent = character.health;
  imageElement.src = character.image;

  if (character.health === 0) {
    statusElement.textContent = `${character.name} has fallen in battle.`;
    attackButton.disabled = true;
  } else {
    statusElement.textContent = 'Ready for adventure.';
  }
}

levelUpButton.addEventListener('click', () => {
  character.levelUp();
  render();
  statusElement.textContent = `${character.name} reached level ${character.level}!`;
});

attackButton.addEventListener('click', () => {
  character.attacked();
  render();
});

render();
