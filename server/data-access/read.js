module.exports = {
    items: async function (db, collectionName) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).find({}).toArray(function (err, result) {
                if (err) throw err
                console.log(result)
                resolve(result)
            })
        })
    }
}