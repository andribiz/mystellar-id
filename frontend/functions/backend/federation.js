const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.federation = functions.https.onRequest((request, res) => {
  const strName = request.query.q;
  db.collection('federation')
    .doc(strName)
    .get()
    .then(doc => {
      res.set('Access-Control-Allow-Origin', '*');
      if (!(doc && doc.exists)) {
        return res.status(404).send({ error: 'Unable to find the document' });
      }
      const data = doc.data();
      var jsonStellar = {
        account_id: data.stellar_addr,
        memo_type: data.memo_type,
        memo: data.memo,
      };
      return res.status(200).send(jsonStellar);
    })
    .catch(err => {
      console.error(err);
      res.set('Access-Control-Allow-Origin', '*');
      return res.status(404).send({ error: err.message });
    });
});

exports.insertMystellarAddr = functions.https.onCall(
  async (request, context) => {
    // if (!context.auth) {
    //     // Throwing an HttpsError so that the client gets the error details.
    //     throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
    //         'while authenticated.');
    // }

    const domain = '*mystellar.id';
    let address = request.address;
    if (!address)
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function parameter address not found'
      );
    address = address.replace(domain, '');
    // const email = context.auth.token.email || "";
    const email = 'test@gmail.com';

    const stellar_addr = request.stellar_addr;
    if (!stellar_addr)
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function parameter Stellar address not found'
      );

    const memo_type = request.memo_type || 'text';
    const memo = request.memo_type || '';

    let doc = await db
      .collection('federation')
      .doc(address + domain)
      .get();
    if (doc.exists)
      throw new functions.https.HttpsError(
        'already-exists',
        'Address duplicate'
      );
    await db
      .collection('federation')
      .doc(address + domain)
      .set({
        email: email,
        stellar_addr: stellar_addr,
        memo_type: memo_type,
        memo: memo,
      });
    return { errMsg: '' };
  }
);
