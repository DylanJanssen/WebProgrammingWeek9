module.exports = function (app, db, collectionName, read) {
    app.get('/getProducts', async (request, response) => {
        try {
            const products = await read.items(db, collectionName)
            const prodString = JSON.stringify(products)
            response.send({ success: true, products: prodString })
        }
        catch (error) {
            console.log(error)
            response.send({ success: false })
        }
    })
}