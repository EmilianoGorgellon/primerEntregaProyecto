let express = require("express");
let app = express();
let cors = require("cors");
let path = require('path');
const {config} = require("./config");
const PORT = config.port;
const CORS = config.cors;
// Middlewares
app.use(express.static(path.join(__dirname, "public", "html")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(`${CORS}`));


// Routes
app.use('/api/productos', require('./routes/productos'));
app.use('/api/carrito', require('./routes/carrito'))


app.listen(PORT);