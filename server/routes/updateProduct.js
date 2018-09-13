module.exports = function (app, db, collectionName, update) {
    app.post('/updateProduct/:_id', async (req, res) => {
        const updateQuery = {_id: req.params._id}
        const newValues = { $set: 
            { 
                name: req.body.name, 
                price: req.body.price,
                type: req.body.type,
                desc: req.body.desc 
            } 
        }

        try {
            const products = await update.item(db, collectionName, updateQuery, newValues)
            const prodString = JSON.stringify(products)
            res.send({ success: true, products: prodString })
        }
        catch (error) {
            console.log(error)
            res.send({ success: false })
        }
    })
}
