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
    this.updateAddress = this.updateAddress.bind(this);
    this.insertDomain = this.insertDomain.bind(this);
    this.onSnapshotDomain = this.onSnapshotDomain.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getListDomain = this.getListDomain.bind(this);
    this.logout = this.logout.bind(this);
    this.dbfed = this.dbfed.bind(this);
    this.database = firebase.firestore();
    this.auth = firebase.auth();

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
        return await this.auth.signInWithPopup(provider);
      }
      case this.EMAIL:
        return await this.auth.signInWithEmailAndPassword(email, password);
    }
  }

  async register(email, password) {
    const res = await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log(`${error.code} ${error.message}`);
        return { errCode: error.code, message: error.message };
      });
    return res;
  }

  async getListDomain(user) {
    try {
      const result = await this.database
        .collection('user')
        .doc(user)
        .collection('domains')
        .get();
      return { errMsg: '', data: result };
    } catch (err) {
      return { errMsg: err.message };
    }
  }

  // getListDomain(user) {
  //   try {
  //     dbUser()
  //       .doc(user)
  //       .collection('domains')
  //       .get()
  //         .then();
  //     return {errMsg:"", data:result}
  //   } catch (err) {
  //     return { errMsg: err.message };
  //   }
  // }

  async updateAddress(input) {
    const domain = '*mystellar.id';
    try {
      let docs = await this.database
        .collection('federation')
        .doc(input.address + domain)
        .set({ ...input, stellar_addr: input.stellar_addr, memo: input.memo });
      return { errMsg: '' };
    } catch (err) {
      return { errMsg: err.message };
    }
  }

  deleteDomain = async (user, record) => {
    try {
      const result = await this.database
        .collection('user')
        .doc(user.uid)
        .collection('domains')
        .doc(record.id)
        .delete();
      return { errMsg: '' };
    } catch (err) {
      return { errMsg: err.message };
    }
  };

  async insertDomain(user, domain) {
    try {
      await this.database
        .collection('user')
        .doc(user.uid)
        .collection('domains')
        .add({
          domain: domain,
        });
      return { errMsg: '' };
    } catch (err) {
      return { errMsg: err.message };
    }
  }

  onSnapshotDomain(user, callMe) {
    return this.database
      .collection('user')
      .doc(user.uid)
      .collection('domains')
      .onSnapshot(snapshot => {
        callMe(snapshot);
      });
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
    return this.auth.signOut();
  }

  dbfed() {
    return this.database.collection('federation');
  }

  dbUser() {
    return this.database.collection('user');
  }

  isAuthenticated(onCompleted) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        onCompleted(user);
      } else {
        onCompleted(null);
      }
    });
  }
}

export default new FirebaseHelper();
