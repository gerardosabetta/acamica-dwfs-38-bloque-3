const coolImages = require("cool-images");
const moment = require("moment");
const fs = require("fs");

var imagenUnica = coolImages.one(800, 600);
var horaActual = moment().format();
/*
let manyImages = coolImages.many(800, 600, 10);

manyImages.forEach((elemento) => {
  console.log(elemento);
});

console.log(imagenUnica);
console.log(manyImages);
*/
fs.appendFile("log.txt", `La ahora actual es: ${horaActual}, la imagen unica es: ${imagenUnica}\n`, function (err) {
  if (err) {
    console.log("Error!");
  }
});
