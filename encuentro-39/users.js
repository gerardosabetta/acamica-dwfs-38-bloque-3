var User = require("./user_module.js");
var person = new User("Gerardo", "Sabetta", 1000);

//Imprimo objeto completo
console.log(person);

//Imprimo propiedad
console.log(person.nombre);

//Ejecuto metodo
console.log(person.getInfo());
