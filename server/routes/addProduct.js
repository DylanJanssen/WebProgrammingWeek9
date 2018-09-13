module.exports = function (app, db, collectionName, add) {
    app.post('/addProduct', async (req, res) => {

        const product = [
            { 
                _id: req.body._id,
                name: req.body.name,
                price: req.body.price,
                type: req.body.type,
                desc: req.body.desc
            }
        ]

        console.log(product)
        try {
            await add.item(db, collectionName, product)
            res.send({ success: true })
        }
        catch (error) {
            console.log(error)
            res.send({ success: false })
        }
    })
}