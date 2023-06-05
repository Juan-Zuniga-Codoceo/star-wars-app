// Obtener los datos de la API de Star Wars
async function getCharacterData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('API request failed');
  }
  const data = await response.json();
  return data;
}

// Generar bloques de contenido para un rango de personajes
function generateCharacterBlocks(start, end, containerId) {
  const charactersContainer = document.getElementById(containerId);
  charactersContainer.innerHTML = '';

  const promises = [];

  for (let i = start; i <= end; i++) {
    const characterUrl = `https://swapi.dev/api/people/${i}/`;
    const promise = getCharacterData(characterUrl);
    promises.push(promise);
  }

  return promises;
}

// Mostrar los datos en los bloques de contenido generados
function displayCharacterData(characters, containerId) {
  const charactersContainer = document.getElementById(containerId);
  charactersContainer.innerHTML = '';

  characters.forEach(character => {
    const characterBlock = document.createElement('div');
    characterBlock.classList.add('characters');

    const name = document.createElement('p');
    name.textContent = `Name: ${character.name}`;

    const height = document.createElement('p');
    height.textContent = `Height: ${character.height}`;

    const mass = document.createElement('p');
    mass.textContent = `Weight: ${character.mass}`;

    characterBlock.appendChild(name);
    characterBlock.appendChild(height);
    characterBlock.appendChild(mass);

    charactersContainer.appendChild(characterBlock);
  });
}

// Mostrar los datos en los bloques de contenido generados con animación
function displayCharacterDataWithAnimation(characters, sectionId) {
  const charactersContainer = $(`#${sectionId}`);
  charactersContainer.html('');

  characters.forEach(character => {
    const characterBlock = $('<div>').addClass('characters');

    const name = $('<p>').text(`Name: ${character.name}`);
    const height = $('<p>').text(`Height: ${character.height}`);
    const mass = $('<p>').text(`Weight: ${character.mass}`);

    characterBlock.append(name, height, mass);
    characterBlock.hide().appendTo(charactersContainer).fadeIn();
  });
}

// Generar bloques de contenido para la sección "1 - 5"
const characterPromises1to5 = generateCharacterBlocks(1, 5, 'characters-1-5');

// Generar bloques de contenido para la sección "6 - 11"
const characterPromises6to11 = generateCharacterBlocks(6, 11, 'characters-6-11');

// Generar bloques de contenido para la sección "12 - 16"
const characterPromises12to16 = generateCharacterBlocks(12, 16, 'characters-12-16');

// Mostrar los datos en los bloques de contenido generados para la sección "1 - 5"
Promise.allSettled(characterPromises1to5).then(results => {
  const characters = results.map(result => result.status === 'fulfilled' ? result.value : null);
  displayCharacterData(characters, 'characters-1-5');
});

// Mostrar los datos en los bloques de contenido generados para la sección "6 - 11"
Promise.allSettled(characterPromises6to11).then(results => {
  const characters = results.map(result => result.status === 'fulfilled' ? result.value : null);
  displayCharacterData(characters, 'characters-6-11');
});

// Mostrar los datos en los bloques de contenido generados para la sección "12 - 16"
Promise.allSettled(characterPromises12to16).then(results => {
  const characters = results.map(result => result.status === 'fulfilled' ? result.value : null);
  displayCharacterData(characters, 'characters-12-16');
});

// Agregar eventos de escucha al espacio sobre los rangos de números
const section1to5 = document.getElementById('characters-1-5');
section1to5.addEventListener('mouseenter', () => {
  displayCharacterDataWithAnimation(characterPromises1to5, 'characters-1-5');
});

const section6to11 = document.getElementById('characters-6-11');
section6to11.addEventListener('mouseenter', () => {
  displayCharacterDataWithAnimation(characterPromises6to11, 'characters-6-11');
});

const section12to16 = document.getElementById('characters-12-16');
section12to16.addEventListener('mouseenter', () => {
  displayCharacterDataWithAnimation(characterPromises12to16, 'characters-12-16');
});

