import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './firebase.config';

const valid =
  firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId;

let firebaseApp = {};
try {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} catch (e) {}

class FirebaseHelper {
  GOOGLE = 'google';
  EMAIL = 'email';

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.insertAddress = this.insertAddress.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.useGetUser = this.useGetUser.bind(this);
    this.database = firebase.firestore();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  async login(provider, email, password) {
    switch (provider) {
      case this.GOOGLE: {
        const provider = new firebase.auth.GoogleAuthProvider();
        return await firebase.auth().signInWithPopup(provider);
      }
      case this.EMAIL: {
      }
      default:
    }
  }

  async register(email, password) {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(`${error.code} ${error.message}`);
        return { errCode: error.code, message: error.message };
      });
    return res;
  }

  async insertAddress(email, address, stellar, memo) {
    const domain = '*mystellar.id';
    try {
      let doc = await this.database
        .collection('federation')
        .doc(address + domain)
        .get();
      if (doc.exists) return { errMsg: 'Address is already used' };
      await this.database
        .collection('federation')
        .doc(address + domain)
        .set({
          email: email,
          stellar_addr: stellar,
          memo_type: 'text',
          memo: memo,
        });
      return { errMsg: '' };
    } catch (err) {
      return { errMsg: err.message };
    }
  }

  logout() {
    return firebase.auth().signOut();
  }

  async useGetUser() {
    const user = await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Success1');
        return user;
      } else {
        console.log('Error');
        return null;
      }
    });
    console.log('sini');
    return user;
  }

  isAuthenticated(onCompleted) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        onCompleted(user);
        console.log('Success');
      } else {
        onCompleted(null);
        console.log('Error');
      }
    });
  }
}

export default new FirebaseHelper();
