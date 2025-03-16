

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 3002;


const pool = new Pool({
  host: 'localhost',      
  port: 5432,            
  database: 'todo_list', 
  user: 'postgres',      
  password: '12345', 
});

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('error al conectarse a la base de datos', err);
    }
else {
    console.log('Conexión exitosa a la base de datos');
  }     
  release()
});

app.use(cors());

app.use(express.json());

app.post('/register', async (req, res) => {
  console.log(req.body);
 try {
    const { nombre, email, password } = req.body;
    
     const resultUser =  await pool.query(
      'INSERT INTO public.usuarios (usuario, email, contraseña) VALUES ($1, $2, $3) RETURNING *',
      [nombre, email, password],
     
    );
    res.status(200).json({
        mensaje: 'Datos insertados en la base de datos',
         user: resultUser.rows[0],
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
        mensaje: 'error al insertar datos en la base de datos'
      });
      console.log('error al insertar datos en la base de datos', error);
  }
    });  

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await pool.query(
        'SELECT * FROM public.usuarios WHERE email = $1 AND contraseña = $2',
        [email, password]
      );

      if (result.rows.length > 0) {
        res.status(200).json({
          valid: true,
          mensaje: 'Inicio de sesión exitoso',
          user: result.rows[0],
        });
      } else {
        res.status(401).json({
          valid: false,
          mensaje: 'Credenciales incorrectas',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        valid: false,
        mensaje: 'Error al validar las credenciales',
      });
    }
  });


    

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
  