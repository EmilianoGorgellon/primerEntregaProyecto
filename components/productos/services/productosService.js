const fs = require("fs");
class Products {
    constructor(url){
        this.url = url
    }

    async getAll() {
        try {
            let getAllProducts = await fs.promises.readFile(`${this.url}`, 'utf-8');
            return JSON.parse(getAllProducts);
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            let getAllProducts = await this.getAll();
            if (id.id !== undefined) {
                if(parseInt(id.id) >= getAllProducts.length || parseInt(id.id) <= 0){
                    return { "error": `No hay producto con id: ${id.id}`}
                }
                let getProduct = getAllProducts.filter(data => data.id === parseInt(id.id));
                return getProduct;
            } 
            return getAllProducts;
        } catch (error) {
            console.log(error);
        }
    }


    async sendProduct(data) {
        try {
            let getAllProducts = await this.getAll();
            let newId = await this.newId(getAllProducts);
            let sendData = {
                "id": newId,
                ...data
            }
            getAllProducts.push(sendData)
            await fs.promises.writeFile(`${this.url}`, JSON.stringify(getAllProducts, null, 2));
            return sendData;
        } catch (error) {
            console.log(error)
        }
    }

    async newId(data) {
        try {
            let idMax = data.reduce((prev, current) => {
                if (prev.id > current.id){
                    return prev.id;
                } else {
                    return current.id;
                }
            })
            return idMax + 1;
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateProduct(id, updateData){
        try {
            let getAllProducts = await this.getAll();
            id = parseInt(id.id)
            if (id <= getAllProducts.length && id > 0){
                let newProduct = {
                    "id": id,
                    ...updateData
                }
                getAllProducts.splice(id - 1, 1, newProduct);
                await fs.promises.writeFile(`${this.url}`, JSON.stringify(getAllProducts, null, 2))
                return newProduct;
            }
            return {"error": `No hay producto con el id ${id}`}
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id){
        try {
            id = parseInt(id.id);
            let getAllProducts = await this.getAll();
            let newAllProducts = getAllProducts.filter(data => data.id !== id);
            let deleteProduct = getAllProducts.filter(data => data.id === id);
            await fs.promises.writeFile(`${this.url}`, JSON.stringify(newAllProducts, null, 2));
            return deleteProduct;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Products;