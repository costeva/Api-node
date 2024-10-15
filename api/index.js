const express = require('express');
const routerApi = require('./routes');
const cors = require('cors'); //sirve para que el front pueda hacer peticiones al back, si no se pone no se puede hacer peticiones, es decir, que pueda hacer peticiones desde otro dominio
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

//middleware que parsea el body a json
app.use(express.json());
const whitelist = ['http://localhost:8080', 'https://myapp.co']; // dominios permitidos
const options = {
  //configuración de cors
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(options)); //solo se permiten peticiones de los dominios de la whitelist

app.get('/api', (req, res) => {
  res.send('Hello server!');
});

app.get('/api/about', (req, res) => {
  res.send('About page');
});

routerApi(app);

//siempre los middleware de errores al final
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
