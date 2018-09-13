module.exports = {
    collection: async function (db, collectionName) {
        return new Promise((resolve, reject) => {
            db.createCollection(collectionName, function (err, res) {
                if (err) throw err
                console.log('Collection created')
                resolve()
            })
        })
    }
}