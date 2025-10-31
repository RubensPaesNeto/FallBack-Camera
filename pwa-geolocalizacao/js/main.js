if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });
      console.log('Service worker registrado! 😎', reg);
    } catch (err) {
      console.log('😥 Falha ao registrar service worker: ', err);
    }
  });
}

// Elementos da página
const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const iframe = document.getElementById('gmap_canvas');

const latitudeInput = document.getElementById('latitudePassada');
const longitudeInput = document.getElementById('longitudePassada');
const iframeInput = document.getElementById('gmap_canvasInput');

// Função de sucesso da geolocalização
const sucesso = (posicao) => {
  const lat = posicao.coords.latitude;
  const lon = posicao.coords.longitude;

  // Atualiza o primeiro mapa com a posição atual
  latitude.innerHTML = lat;
  longitude.innerHTML = lon;
  iframe.src = `https://maps.google.com/maps?q=${lat},${lon}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  // Atualiza o segundo mapa com base nos valores digitados (caso existam)
  const latInput = latitudeInput.value.trim();
  const lonInput = longitudeInput.value.trim();

  if (latInput && lonInput) {
    iframeInput.src = `https://maps.google.com/maps?q=${latInput},${lonInput}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  } else {
    // Se não houver valores digitados, limpa o mapa
    iframeInput.src = "";
  }
};

// Função de erro
const erro = (error) => {
  let errorMessage;
  switch (error.code) {
    case 0:
      errorMessage = "Erro desconhecido";
      break;
    case 1:
      errorMessage = "Permissão negada!";
      break;
    case 2:
      errorMessage = "Captura de posição indisponível!";
      break;
    case 3:
      errorMessage = "Tempo de solicitação excedido!";
      break;
  }
  console.log('Ocorreu um erro: ' + errorMessage);
};

// Ao clicar no botão
capturarLocalizacao.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(sucesso, erro);
});
