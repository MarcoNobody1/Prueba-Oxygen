// Inicializamos las variables

var selector;
var unit;
var unit2;
var input;
var result;
var heart;

// Carga el valor de las variables una vez se carga todo el contenido de la página.
window.onload = function () {
  selector = document.getElementById("selector");
  unit = document.getElementById("unit");
  unit2 = document.getElementById("unit2");
  input = document.getElementById("input");
  result = document.getElementById("result");
  heart = document.getElementById("heart_svg");
};

// Función utilizada para realizar las operaciones de conversión entre unidades de medida.
function operar() {
  var conversion = {
    kmtomil: [0.621371, "km", "miles"],
    miltokm: [1.60934, "miles", "km"],
    feettomt: [0.3048, "feet", "meters"],
    mttofeet: [3.281, "meters", "feet"],
    cmtoinch: [0.393701, "cm", "inches"],
    inchtocm: [2.54, "inches", "cm"],
  };

  var conversionValues = conversion[selector.value];
  var resultado = (input.value * conversionValues[0]).toFixed(2);
  result.innerText = resultado;
  unit.innerHTML = conversionValues[1];
  unit2.innerHTML = conversionValues[2];
}

/* Función utilizada para cambiar las unidades de medida que se reflejan en el conversor,
dependiendo de la opción seleccionada en el elemento select. Tambien hace una llamada a
la función operar() para que, al cambiar de opción seleccionada, se realice automáticamente
la operación con el input introducido */
function cambiarContenido() {
  var conversion = {
    kmtomil: ["km", "miles"],
    miltokm: ["miles", "km"],
    feettomt: ["feet", "meters"],
    mttofeet: ["meters", "feet"],
    cmtoinch: ["cm", "inches"],
    inchtocm: ["inches", "cm"],
  };

  var conversionValues = conversion[selector.value];
  unit.innerHTML = conversionValues[0];
  unit2.innerHTML = conversionValues[1];

  operar();
}

/* Función utilizada para intercambiar el valor del input con el del resultado, así como
sus respectivas unidades */
function cambiarUnidades() {
  var conversion = {
    kmtomil: ["miles", "km", "miltokm"],
    miltokm: ["km", "miles", "kmtomil"],
    feettomt: ["meters", "feet", "mttofeet"],
    mttofeet: ["feet", "meters", "feettomt"],
    cmtoinch: ["inches", "cm", "inchtocm"],
    inchtocm: ["cm", "inches", "cmtoinch"],
  };

  var temp = input.value;
  var temp2 = result.innerText;
  result.innerHTML = temp;
  input.value = temp2;

  var conversionValues = conversion[selector.value];
  unit.innerHTML = conversionValues[0];
  unit2.innerHTML = conversionValues[1];
  selector.value = conversionValues[2];
}

/* Función utilizada para eliminar una conversión guardada anteriormente al pulsar la "x"
del contenedor a eliminar */
function eliminarFav() {
  // Obtiene el div padre del elemento svg "cross" y, despues, lo elimina
  var divPadre = this.parentNode.parentNode;

  divPadre.remove();
}

/* Función utilizada para crear un contenedor que almacene la conversión actual y
añadirlo al div "saved_conv". Además, reproduce una pequeña animación en el corazon */
function favorito() {
  var inputsv = input.value;
  var unitsv1 = unit.innerHTML;
  var output = result.innerHTML;
  var unitsv2 = unit2.innerHTML;
  var heart = document.getElementById("heart_svg");

  var div = document.createElement("div");
  div.id = "1";
  div.className = "sv";
  div.innerHTML =
    "<p id='inputsv'>" +
    inputsv +
    "</p>" +
    "<p id='unitsv1'>" +
    unitsv1 +
    "</p>" +
    "<p id='arrow'>→</p>" +
    "<p id='output'>" +
    output +
    "</p>" +
    "<p id='unitsv2'>" +
    unitsv2 +
    "</p>" +
    "<span class='cross'>" +
    "  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>" +
    "    <path d='M16.0658 8.99479C16.3587 8.7019 16.3587 8.22703 16.0658 7.93413C15.773 7.64124 15.2981 7.64124 15.0052 7.93413L12 10.9393L8.99479 7.93413C8.70189 7.64124 8.22702 7.64124 7.93413 7.93413C7.64123 8.22703 7.64123 8.7019 7.93413 8.99479L10.9393 12L7.93412 15.0052C7.64122 15.2981 7.64122 15.773 7.93412 16.0659C8.22701 16.3588 8.70188 16.3588 8.99478 16.0659L12 13.0607L15.0052 16.0659C15.2981 16.3588 15.773 16.3588 16.0659 16.0659C16.3587 15.773 16.3587 15.2981 16.0659 15.0052L13.0606 12L16.0658 8.99479Z' fill='#676767'/>" +
    "  </svg>" +
    "</span>";

  var savedConv = document.getElementById("saved_conv");
  savedConv.appendChild(div);

  var cross = div.querySelector("svg");
  cross.addEventListener("click", eliminarFav);

  heart.style.transform = "rotateY(360deg)";
  heart.style.transition = "transform 2s";
  setTimeout(function () {
    heart.style.transform = "rotateY(0deg)";
  }, 500);
}
