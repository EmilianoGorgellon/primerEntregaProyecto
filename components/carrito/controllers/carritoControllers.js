let Carrito = require("../services/carritoServices");
let carrito = new Carrito("./data/carrito.txt");
let moment = require("moment");

const createCarrito = async (req, res) => {
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');
    res.json(await carrito.createCarrito(time));
}
const deleteCarrito = async (req, res) => {
    res.json(await carrito.deleteCarrito(req.params));
}

const getCarritoProducts = async (req, res) => {
    res.json(await carrito.getCarritoProducts(req.params));
}

const addProductCarrito = async (req, res) => {
    res.json(await carrito.addProductCarrito(req.params, req.body));
}

const deleteCarritoProductByIds = async (req, res) => {
    let time = moment().format('MMMM Do YYYY, h:mm:ss a');
    res.json(await carrito.deleteCarritoProductByIds(req.params, time));
}

module.exports = {createCarrito, deleteCarrito, getCarritoProducts, addProductCarrito, deleteCarritoProductByIds}