import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { firebaseConfig } from './firebase.config';
import isValidDomain from 'is-valid-domain';
import { func } from 'prop-types';
import StellarBase from 'stellar-sdk';
import { getURL } from 'next/dist/next-server/lib/utils';

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
    this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.insertAddress = this.insertAddress.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.insertDomain = this.insertDomain.bind(this);
    this.insertUser = this.insertUser.bind(this);
    this.onSnapshotDomain = this.onSnapshotDomain.bind(this);
    this.onSnapshotFed = this.onSnapshotFed.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.isValidDomain = this.isValidDomain.bind(this);
    this.getStorageUrl = this.getStorageUrl.bind(this);
    this.logout = this.logout.bind(this);
    this.onSearchAddressDomain = this.onSearchAddressDomain.bind(this);
    this.deleteFed = this.deleteFed.bind(this);
    this.database = firebase.firestore();
    this.auth = firebase.auth();
    this.storage = firebase.storage();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  async getStorageUrl(path) {
    return await this.storage.ref(path).getDownloadURL();
  }

  async sendPasswordResetEmail(email) {
    return await this.auth.sendPasswordResetEmail(email);
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

  async insertUser(uid, email, name, photoUrl) {
    return await this.database
      .collection('user')
      .doc(uid)
      .set({
        email: email,
        name: name,
        photoUrl: photoUrl,
      });
  }

  async register(email, password) {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  async updateAddress(address, stellar_addr, memo) {
    if (!StellarBase.StrKey.isValidEd25519PublicKey(stellar_addr)) {
      return { errMsg: 'Not Valid stellar address' };
    }

    try {
      await this.database
        .collection('federation')
        .doc(address)
        .update({ stellar_addr: stellar_addr, memo: memo });
      return { errMsg: '' };
    } catch (err) {
      return { errMsg: err.message };
    }
  }

  deleteFed = async record => {
    try {
      const result = await this.database
        .collection('federation')
        .doc(record)
        .delete();
      return { errMsg: '' };
    } catch (err) {
      return { errMsg: err.message };
    }
  };

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

  async isValidDomain(user, url) {
    const domain = url.replace('https://', '').replace('http://', '');
    if (!isValidDomain(domain, { subdomain: false, wildcard: false })) {
      return { errMsg: 'Domain name is not valid domain' };
    }

    let res = { errMsg: '' };
    try {
      const query = await this.database
        .collectionGroup('domains')
        .where('domain', '==', domain)
        .get();

      query.forEach(doc => {
        if (!!doc.data()) {
          res = { errMsg: 'Domain is already exists' };
        }
      });
    } catch (error) {
      res = { errMsg: `Error : ${error}` };
    }

    return res;
  }

  async onSearchAddressDomain(user, domain, value) {
    const data = await this.database
      .collection('federation')
      .where('email', '==', user.email)
      .where('domain', '==', domain)
      .get();

    let dt = [];

    data.forEach(doc => {
      dt.push({
        address: doc.id,
        email: doc.data().email,
        memo: doc.data().memo,
        stellar_addr: doc.data().stellar_addr,
        memo_type: doc.data().memo_type,
      });
    });
    return dt;
  }

  async insertDomain(user, domain) {
    try {
      const res = await this.isValidDomain(user, domain);

      if (res.errMsg !== '') {
        return res;
      }

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

  onSnapshotFed(user, domain, callMe) {
    return this.database
      .collection('federation')
      .where('email', '==', user.email)
      .where('domain', '==', domain)
      .onSnapshot(snapshot => {
        callMe(snapshot);
      });
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

  async insertAddress(email, domain, address, stellar, memo) {
    if (!/^[a-zA-Z0-9\s]{5,}$/.test(address)) {
      return { errMsg: 'Address must be alphanumeric and minimum length 5' };
    }
    if (!StellarBase.StrKey.isValidEd25519PublicKey(stellar)) {
      return { errMsg: 'Not Valid stellar address' };
    }

    try {
      let doc = await this.database
        .collection('federation')
        .doc(address + domain)
        .get();
      if (doc.exists) return { errMsg: 'Address is already used' };
      await this.database
        .collection('federation')
        .doc(address + '*' + domain)
        .set({
          email: email,
          stellar_addr: stellar,
          domain: domain,
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
