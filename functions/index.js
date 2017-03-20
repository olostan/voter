const functions = require('firebase-functions');

const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase);

exports.register = functions.https.onRequest((request, response) => {

  cors( request, response,() => {
    if (request.method !== 'POST') {
        request.status(403).send('Forbidden!');
        return;
    }

    if (!request.body.apartment || !request.body.email || !request.body.code || !request.body.password) {
        response.status(400).send("Not complete request");
        return;
    }
    if (request.body.password.length<6) {
        response.status(402).send("Password too short");        
    }
    if (! /(.+)@(.+){2,}\.(.+){2,}/.test(request.body.email)) {
        response.status(403).send("Email has invalid format");        
    }

    // check is apartment is already occupied
    let apartments = admin.database().ref('apartments');
    let apartment = apartments.child(request.body.apartment);
    apartment.once('value', (snapshot) => {
        if (!snapshot.exists()) {
            response.status(404).send("Non existent apartment");            
        } else {
            let current = snapshot.val();
            if (current.email) {
                response.status(409).send("Apartment already registred");               
                return;
            }

            if (current.code != request.body.code) {
                response.status(401).send("Incorrect code");                            
                return;
            }
            admin.auth().createUser({
                    email: request.body.email,
                    password: request.body.password,
                    displayName: ''+request.body.apartment
                }).then((userRecord) => 
                    apartment.set({email: request.body.email, uid: userRecord.uid})
                ).then( () => response.send("Registered"));
        }
    });
  });
});

function updateVote(voteId, voteRef, val) {
        let vote = voteRef.val();
        let resultRef = admin.database().ref('/votings/'+voteId+'/results/'+vote);
        /*resultRef.once('value', (snap) => {
            let value = snap.val()|0;
            value += val;
            resultRef.set(value);
        });*/
        resultRef.transaction((result) => (result|0)+val);
}

exports.vote = functions.database.ref('/votes/{voteId}/{apt}')
    .onWrite( event => {
        updateVote(event.params.voteId, event.data,1);
        if (event.data.previous.exists()) {
            updateVote(event.params.voteId, event.data.previous,-1);            
        }
    });