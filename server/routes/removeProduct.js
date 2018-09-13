module.exports = function (app, db, collectionName, remove) {
    app.delete('/removeProduct', async (req, res) => {
        delQuery = {_id: req.body._id}
        console.log(delQuery)
        try {
            await remove.item(db, collectionName, delQuery)
            res.send({ success: true })
        }
        catch (error) {
            console.log(error)
            response.send({ success: false })
        }
    })
}
