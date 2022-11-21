const sectionSeleccionarAtaque = document.getElementById('seleccionarAtaque');
const btnReiniciar = document.getElementById('botonReiniciar');
const botonMascotaJugador = document.getElementById('botonMascota');
const botonReiniciar = document.getElementById('botonReiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionarMascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorAtaques = document.getElementById('contenedorAtaques');

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let jugadorId = null;
let enemigoId = null;
let mokepones = [];
let mokeponesEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputTucapalma;
let inputLangostelvis;
let inputPydos;
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonTierra;
let botonFuego; 
let botonAgua;
let botones = {};
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext('2d');
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.png';
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 500;

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = []
    this.ancho = 50;
    this.alto = 50;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage ( // drawImage se utiliza cuando vamos a cargar una imagen
    this.mapaFoto,
    this.x,
    this.y,
    this.ancho,
    this.alto
  )
  }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodogeHead.png');
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepoHead.png');
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueyaHead.png');
let tucapalma = new Mokepon('Tucapalma', './assets/tucapalma.webp', 5, './assets/tucapalma.webp');
let langostelvis = new Mokepon('Langostelvis', './assets/langostelvis.webp', 5, './assets/langostelvis.webp');
let pydos = new Mokepon('Pydos', './assets/pydos.webp', 5, './assets/pydos.webp');

// ATAQUES
const hipodogeAtaques = [
  { nombre: '💧', id: 'botonAgua'},
  { nombre: '💧', id: 'botonAgua'},
  { nombre: '💧', id: 'botonAgua'},
  { nombre: '🔥', id: 'botonFuego'},
  { nombre: '🌱', id: 'botonTierra'}
]
const capipepoAtaques = [
  { nombre: '🌱', id: 'botonTierra'},
  { nombre: '🌱', id: 'botonTierra'},
  { nombre: '🌱', id: 'botonTierra'},
  { nombre: '💧', id: 'botonAgua'},
  { nombre: '🔥', id: 'botonFuego'},
]
const ratigueyaAtaques = [
  { nombre: '🔥', id: 'botonFuego'},
  { nombre: '🔥', id: 'botonFuego'},
  { nombre: '🔥', id: 'botonFuego'},
  { nombre: '💧', id: 'botonAgua'},
  { nombre: '🌱', id: 'botonTierra'}
]
const tucapalmaAtaques = [
  { nombre: '🔥', id: 'botonFuego'},
  { nombre: '💧', id: 'botonAgua'},
  { nombre: '💧', id: 'botonAgua'},
  { nombre: '🌱', id: 'botonTierra'},
  { nombre: '🌱', id: 'botonTierra'}
]
const langostelvisAtaques = [
  {nombre: '🔥', id: 'botonFuego'},
  {nombre: '🔥', id: 'botonAgua'},
  {nombre: '💧', id: 'botonAgua'},
  {nombre: '💧', id: 'botonAgua'},
  {nombre: '🌱', id: 'botonTierra'}
]
const pydosAtaques = [
  {nombre: '🔥', id: 'botonFuego'},
  {nombre: '💧', id: 'botonAgua'},
  {nombre: '🌱', id: 'botonTierra'},
  {nombre: '🌱', id: 'botonTierra'},
  {nombre: '🌱', id: 'botonTierra'}
]

hipodoge.ataques.push(...hipodogeAtaques); // Los tres puntos sirven para extraer los datos de la lista
capipepo.ataques.push(...capipepoAtaques);
ratigueya.ataques.push(...ratigueyaAtaques);
tucapalma.ataques.push (...tucapalmaAtaques);
langostelvis.ataques.push (...langostelvisAtaques);
pydos.ataques.push (...pydosAtaques);

mokepones.push(hipodoge, capipepo, ratigueya, tucapalma, langostelvis, pydos);

function iniciarJuego () {
  btnReiniciar.style.display = 'none';
  sectionSeleccionarAtaque.style.display = 'none';
  sectionVerMapa.style.display = 'none';

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
      <input type="radio" name="mascota" id=${mokepon.nombre}>
      <label class="tarjeta-de-mokepon hipodoge" for=${mokepon.nombre}>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
      </label>
    `
    contenedorTarjetas.innerHTML += opcionDeMokepones;

     inputHipodoge = document.getElementById('Hipodoge');
     inputCapipepo = document.getElementById('Capipepo');
     inputRatigueya = document.getElementById('Ratigueya');
     inputTucapalma = document.getElementById('Tucapalma');
     inputLangostelvis = document.getElementById('Langostelvis');
     inputPydos = document.getElementById('Pydos');
  })

  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
  botonReiniciar.addEventListener('click', reiniciarJuego);

  unirseAlJuego();
}

function unirseAlJuego () {
  // Fetch permite realizar llamadas a otros servicios
  fetch('http://192.168.1.72:8080/unirse')
  // Peticion asincrona --> no sabemos cuando vamos a obtener una respuesta
    .then(function (res) {
      if (res.ok) {
        res.text()
          .then(function (respuesta) {
              console.log(respuesta);
              jugadorId = respuesta;
          })
      }
    })
}

function seleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = 'none';

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else if(inputTucapalma.checked) {
    spanMascotaJugador.innerHTML = inputTucapalma.id;
    mascotaJugador = inputTucapalma.id;
  } else if (inputLangostelvis.checked) {
    spanMascotaJugador.innerHTML = inputLangostelvis.id;
    mascotaJugador = inputLangostelvis.id;
  } else if (inputPydos.checked) {
    spanMascotaJugador.innerHTML = inputPydos.id;
    mascotaJugador = inputPydos.id;
  } else {
    alert('Selecciona una mascota');
    reiniciarJuego();
  }

  seleccionarMokepon(mascotaJugador)
  extraerAtaques(mascotaJugador);
  sectionVerMapa.style.display = 'flex';
  iniciarMapa();
  document.getElementById('botonMascota').disabled = true;
}

function seleccionarMokepon (mascotaJugador) {
  fetch(`http://192.168.1.72:8080/mokepon/${jugadorId}`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      mokepon: mascotaJugador
    })
  })
}

function extraerAtaques (mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
    <button id=${ataque.id} class="botonFuego btnsAtaque BAtaque">${ataque.nombre}</button>
    `
    contenedorAtaques.innerHTML += ataquesMokepon;
  })

  botonFuego = document.getElementById('botonFuego');
  botonAgua = document.getElementById('botonAgua');
  botonTierra = document.getElementById('botonTierra');
  botones = document.querySelectorAll('.BAtaque');
}

function secuenciaAtaque () {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if (e.target.textContent === '🔥') {
        ataqueJugador.push('FUEGO 🔥');
        console.log(ataqueJugador);
        boton.style.background = '#112F58';
        boton.disabled = true;
      } else if (e.target.textContent === '💧') {
        ataqueJugador.push('AGUA 💧');
        console.log(ataqueJugador);
        boton.style.background = '#112F58';
        boton.disabled = true;
      } else {
        ataqueJugador.push('TIERRA 🌱');
        console.log(ataqueJugador);
        boton.style.background = '#112F58';
        boton.disabled = true;
      }

      if (ataqueJugador.length === 5) {
        enviarAtaques();
      }
    })
  })
}

function enviarAtaques () {
  fetch(`http://192.168.1.72:8080/mokepon/${jugadorId}/ataques`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      ataques: ataqueJugador
    })
  })

  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch(`http://192.168.1.72:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res) {
      if (res.ok) {
        res.json()
          .then(function ({ ataques }) {
            if (ataques.length === 5) {
              ataqueEnemigo = ataques
              combate()
            }
          })
      }
    })
}

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;

  secuenciaAtaque();
}

function ataqueAleatorioEnemigo () {
  console.log('Ataques enemigo', ataquesMokeponEnemigo);
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push('FUEGO 🔥');
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push('AGUA 💧');
  } else {
    ataqueEnemigo.push('TIERRA 🌱');
  }
  console.log(ataqueEnemigo);
  iniciarPelea();
}

function iniciarPelea () {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes (jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate () {

  clearInterval(intervalo);

  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes (index, index)
      crearMensaje('Empate 😶‍🌫️');
    } else if (ataqueJugador[index] === 'FUEGO 🔥' && ataqueEnemigo[index] === 'TIERRA 🌱') {
      indexAmbosOponentes(index, index);
      crearMensaje('GANASTE');
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (ataqueJugador[index] === 'AGUA 💧' && ataqueEnemigo[index] === 'FUEGO 🔥') {
      indexAmbosOponentes(index, index);
      crearMensaje('GANASTE');
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje('PERDISTE');
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }
  revisarVictorias();
}

function revisarVictorias () {
  if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal('Esto fue un empate!!');
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
  } else if(victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal('Felicitaciones GANASTE!!! 🥳');
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
  } else {
    crearMensajeFinal('Perdiste!! 😭');
  }
}

function crearMensaje (resultado) {
  let nuevoAtaqueDelJugador = document.createElement('p');
  let nuevoAtaqueDelEnemigo = document.createElement('p');

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
  
  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal (resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  btnReiniciar.style.display = 'block';
}

function reiniciarJuego () {
  location.reload();
}

function aleatorio (min, max) {
  return Math.floor( Math.random() * (max - min + 1) + min);
}

function pintarCanvas () {

  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;

  lienzo.clearRect(0, 0, mapa.width, mapa.height ) // Esta funcion limpia el canvas y hay que indicarle que posicion va a limpiar
  lienzo.drawImage(
    mapaBackground,
    0,
    0,
    mapa.width,
    mapa.height
  )
  mascotaJugadorObjeto.pintarMokepon();

  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

  mokeponesEnemigos.forEach (function (mokepon) { // El forEach lo que hace es recorrer toda la lista y por cada elemento de la lista ejecuta una funcion
    mokepon.pintarMokepon()
    revisarColision(mokepon)
  })
}

function enviarPosicion (x, y) {
    fetch(`http://192.168.1.72:8080/mokepon/${jugadorId}/posicion`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        x,
        y
      })
    })
    .then(function (res) {
      if (res.ok) {
        res.json()
          .then(function ({ enemigos }) {
              console.log(enemigos);
              mokeponesEnemigos = enemigos.map(function (enemigo) { 
                let mokeponEnemigo = null
                const mokeponNombre = enemigo.mokepon.nombre || ''
                  if (mokeponNombre === 'Hipodoge') {
                    mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodogeHead.png', enemigo.id);
                  } else if (mokeponNombre === 'Capipepo') {
                    mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepoHead.png', enemigo.id);
                  } else if (mokeponNombre === 'Ratigueya') {
                    mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueyaHead.png', enemigo.id);
                  } else if (mokeponNombre === 'Tucapalma') {
                    mokeponEnemigo = new Mokepon('Tucapalma', './assets/tucapalma.webp', 5, './assets/tucapalma.webp', enemigo.id);
                  } else if (mokeponNombre === 'Langostelvis') {
                    mokeponEnemigo = new Mokepon('Langostelvis', './assets/langostelvis.webp', 5, './assets/langostelvis.webp', enemigo.id);
                  } else if (mokeponNombre === 'Pydos') {
                    mokeponEnemigo = new Mokepon('Pydos', './assets/pydos.webp', 5, './assets/pydos.webp', enemigo.id);
                  }

                  mokeponEnemigo.x = enemigo.x;
                  mokeponEnemigo.y = enemigo.y;
                  
                  return mokeponEnemigo
                })
          })
      }
    })
}


function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
}
function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
}
function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
}
function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
}

function detenerMovimiento () {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}
  // Cuando agregamos eventListeners estos retornan un evento
function sePresionoUnaTecla (event) {
  // Un switch case es una manera de hacer varios condicionales if juntos
          // value --> Valor que se va a usar para comparar las condiciones if que hace el switch
   switch (event.key) {
    case 'ArrowUp':
      moverArriba()
      break; // El break hace que termine de ejecutar el caso
    case 'ArrowDown':
      moverAbajo();
      break;
    case 'ArrowLeft':
      moverIzquierda();
      break;
    case 'ArrowRight':
      moverDerecha();
      break;
    default: // default se usa por si la condicion no entra en ninguna condicion
      break;
  }
}

function iniciarMapa () {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
  // console.log(mascotaJugadorObjeto, mascotaJugador);
  intervalo = setInterval(pintarCanvas, 50) // setInterval es la funcion que va llamando a la funcion constantemente esperando un cierto tiempo
  
  // lienzo.fillRect(5, 15, 20, 40); Lo que hace fillRect es crear un rectangulo dentro del canvas

  window.addEventListener('keydown', sePresionoUnaTecla);
  window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota () {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision (enemigo) {

  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;

  if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
    return;
  }

  detenerMovimiento();
  clearInterval(intervalo);
  console.log('Se detecto una colision');

  enemigoId = enemigo.id
  sectionSeleccionarAtaque.style.display = 'flex';
  sectionVerMapa.style.display = 'none';
  seleccionarMascotaEnemigo(enemigo);

}

window.addEventListener('load', iniciarJuego);