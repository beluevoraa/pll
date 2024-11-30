const express = require('express');
const mysql = require('mysql2'); // No necesitamos cambiar esto, sigue funcionando para MariaDB
const bcrypt = require('bcryptjs');
const session = require('express-session');
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la sesión
app.use(session({
  secret: 'secretoDeSesion',
  resave: false,
  saveUninitialized: true
}));

// Conexión a la base de datos MariaDB
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nueva_contraseña', // Cambia esto por tu nueva contraseña de MariaDB
  database: 'pll'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Ruta para el login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Buscar usuario en la base de datos
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      return res.status(500).send('Error en el servidor');
    }

    if (results.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    const user = results[0];

    // Comparar la contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        return res.status(500).send('Error en el servidor');
      }

      if (!isMatch) {
        return res.status(401).send('Contraseña incorrecta');
      }

      // Iniciar sesión del usuario
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      res.send('Login exitoso');
    });
  });
});

// Ruta para registrar un usuario
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario ya existe
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      return res.status(500).send('Error en el servidor');
    }

    if (results.length > 0) {
      return res.status(400).send('El usuario ya existe');
    }

    // Encriptar la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error al encriptar la contraseña:', err);
        return res.status(500).send('Error en el servidor');
      }

      // Insertar el usuario en la base de datos
      db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
        if (err) {
          console.error('Error al insertar usuario:', err);
          return res.status(500).send('Error en el servidor');
        }
        res.send('Usuario registrado con éxito');
      });
    });
  });
});

// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión');
    }
    res.send('Sesión cerrada');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
