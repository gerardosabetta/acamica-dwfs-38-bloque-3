var fs = require("fs");

fs.writeFile("myfile.txt", "Hola acamica!", (err) => {
  if (err) {
    throw err;
  } else {
    console.log("Saved");
  }
});
