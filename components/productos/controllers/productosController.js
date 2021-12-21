let Products = require("../services/productosService");
let products = new Products("./data/productos.txt");
let moment = require("moment");
let admin = true;

const getProducts = async (req, res) => {
    try {
        return res.json(await products.getProductById(req.params))
    } catch (error) {
        console.log(error)
    }
}

const sendProduct = async (req, res) => {
    try {
        if (admin) {
            let newProduct = {
                "timestamp": moment().format('MMMM Do YYYY, h:mm:ss a'),
                "nombre": req.body.nombre,
                "descripcion": req.body.descripcion,
                "codigo": req.body.codigo,
                "foto": req.body.foto,
                "precio": req.body.precio,
                "stock": req.body.stock
            }
            return res.json(await products.sendProduct(newProduct))
        }
        return {"error": "Necesitas ser administrador para acceder a este contenido"}  
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (req,res) => {
    try {
        if (admin) {
            let updateData = {
                "timestamp": moment().format('MMMM Do YYYY, h:mm:ss a'),
                "nombre": req.body.nombre,
                "descripcion": req.body.descripcion,
                "codigo": req.body.codigo,
                "foto": req.body.foto,
                "precio": req.body.precio,
                "stock": req.body.stock
            }
            return res.json(await products.updateProduct(req.params, updateData))
        }
        return {"error": "Necesitas ser administrador para acceder a este contenido"}
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        if (admin){
            return res.json(await products.deleteProduct(req.params))
        }
        return {"error": "Necesitas ser administrador para acceder a este contenido"}
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getProducts, sendProduct, updateProduct, deleteProduct}