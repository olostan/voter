var admin = require("firebase-admin");
var serviceAccount = require("./voter-55a48-firebase-adminsdk-aqe5r-092c4c2f66.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://voter-55a48.firebaseio.com"
});
const codes = require('./codes.json');

let codesObj = codes.reduce((pv,cv,idx) => {
    pv[idx]={'code':cv};
    return pv;
},{});
//console.log(codesObj);
admin.database().ref('apartments').set(codesObj).then(()=>console.log("Imported"),(err) => console.error(err));
