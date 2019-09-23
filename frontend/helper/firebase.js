import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./firebase.config";

const valid =
  firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId;

let firebaseApp = {};
try {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} catch (e) {}


class FirebaseHelper {

  GOOGLE = 'google';

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.insertAddress = this.insertAddress.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.database = firebase.firestore();
  }

  async login(provider, info) {
    switch (provider) {
      case this.GOOGLE:{
        const provider = new firebase.auth.GoogleAuthProvider();
        return await firebase.auth().signInWithPopup(provider);
      }
      default:
    }
  }

  async insertAddress(email, address, stellar, memo) {
    const domain = "*mystellar.id";
    try {
      let doc = await this.database.collection("federation").doc(address + domain).get();
      if (doc.exists)
        return {errMsg: "Address is already used"};
      await this.database.collection("federation")
            .doc(address + domain)
            .set({"email": email,
                  "stellar_addr": stellar,
                  "memo_type": "text",
                  "memo":memo});
      return {errMsg: ""};
    }
    catch(err){
      return {errMsg: err.message};
    }
  }

  logout() {
    return firebase.auth().signOut();
  }


  isAuthenticated(onCompleted){
    firebase.auth().onAuthStateChanged( user =>{
      onCompleted(user);
    })
  }

}

export default new FirebaseHelper();
