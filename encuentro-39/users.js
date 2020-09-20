var User = require("./user_module.js");
var person = new User("Gerardo", "Sabetta", 1000);

//Inprimo objeto completo
console.log(person);

//Imprimo propiedad
console.log(person.nombre);

//Ejecuto metodo
console.log(person.getInfo());
