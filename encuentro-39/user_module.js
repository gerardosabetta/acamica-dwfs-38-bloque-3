class User {
  constructor(nombre, apellido, edad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }

  getInfo() {
    return `${this.nombre} ${this.apellido}, edad: ${this.edad}`;
  }
}
//Exporto la clase User
module.exports = User;
