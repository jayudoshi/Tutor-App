// const firebase = require('firebase');
const admin = require("firebase-admin");
const serviceAccount = require('./serviceAccount.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET
});

exports.firebaseStorage = admin.storage();
exports.bucket = admin.storage().bucket();