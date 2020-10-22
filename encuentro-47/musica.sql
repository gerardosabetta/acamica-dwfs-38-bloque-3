DROP DATABASE IF EXISTS music_database;
CREATE DATABASE music_database;
USE music_database;

CREATE TABLE bandas (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  integrantes INT NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_separacion DATE,
  pais VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO bandas VALUES
(1, 'Foo Fighters', 6, '1994-01-01', NULL, 'US'),
(2, 'John Lennon', 1, '1994-01-01', NULL, 'UK'),
(3, 'System of a down', 5, '1994-01-01', '2006-01-01', 'US');


CREATE TABLE albums (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    banda INT NOT NULL,
    fecha_publicacion DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO albums  VALUES
(1, 'The colour and the Shape', 1, '1997-04-20'),
(2, 'Imagine', 2, '1971-01-20'),
(3, 'Toxicity', 3, '2001-09-04');

CREATE TABLE canciones (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  duracion INT NOT NULL,
  album INT NOT NULL,
  banda INT NOT NULL,
  fecha_publicacion DATE NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO canciones VALUES
(1, 'The pretender', 240, 1, 1, '1993-01-01'),
(2, 'Monkey wrench', 240, 1, 1, '1994-01-01'),
(3, 'Imagine', 350, 2, 2, '1970-01-01'),
(4, 'Toxicity', 350, 3, 3, '1970-01-01');

