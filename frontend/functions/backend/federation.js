const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp();
const db = admin.firestore();

exports.federation = functions.https.onRequest((request, res) => {
    const strName = request.query.q;
    db.collection("federation").doc(strName)
        .get()
        .then(doc => {
            res.set("Access-Control-Allow-Origin", "*");
            if (!(doc && doc.exists)) {
                return res.status(404).send({error: 'Unable to find the document'});
            }
            const data = doc.data();
            var jsonStellar = {
                account_id: data.stellar_addr,
                memo_type: data.memo_type,
                memo: data.memo
            }
            return res.status(200).send(jsonStellar);
        })
        .catch(err => {
            console.error(err);
            res.set("Access-Control-Allow-Origin", "*");
            return res.status(404).send({error: err.message});
        });
});