const textInput = document.getElementById("textInput");
const contenedor = document.getElementById("contenedor");
const boton = document.getElementById("boton");

const addNuevoItem = () => {
  const nuevoItem = document.createElement("li");
  nuevoItem.innerHTML = textInput.value;
  contenedor.appendChild(nuevoItem);
};

boton.addEventListener("click", addNuevoItem);

// payloads
/**
 *
 *   <button onclick="window.location.href='https://google.com'">Cambiar perfil</button>
 *   <img src="./404.jpg" onerror="console.log('XSS!!!')">
 */
