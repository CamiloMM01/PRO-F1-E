document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('noticias-container');
  const buscador = document.getElementById('buscador');

  function mostrarNoticias(data) {
    container.innerHTML = '';
    if (!data.results || data.results.length === 0) {
      container.innerHTML = "<p>No se encontraron noticias.</p>";
      return;
    }
    data.results.forEach(n => {
      const card = document.createElement('div');
      card.className = "noticia";
      card.innerHTML = `
        <img src="${n.image_url || 'https://via.placeholder.com/400x200?text=Sin+Imagen'}" alt="Noticia">
        <h3><a href="${n.link}" target="_blank">${n.title}</a></h3>
        <p>${n.description || 'Sin descripción disponible.'}</p>
        <small><strong>Fuente:</strong> ${n.source_name || 'Desconocida'} | ${new Date(n.pubDate).toLocaleDateString()}</small>
      `;
      container.appendChild(card);
    });
  }

  function cargarNoticias(palabraClave = "") {
    fetch(`/api/noticias-salud?q=${encodeURIComponent(palabraClave)}`)
      .then(r => r.json())
      .then(mostrarNoticias);
  }

  buscador.addEventListener('input', (e) => {
    cargarNoticias(e.target.value);
  });

  cargarNoticias();
});
