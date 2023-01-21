var admin = require("firebase-admin");

var serviceAccount = require("../config/finalserviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports=admin