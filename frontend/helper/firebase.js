import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './firebase.config';
import isValidDomain from 'is-valid-domain';
import { func } from 'prop-types';

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
    this.logout = this.logout.bind(this);
    this.deleteFed = this.deleteFed.bind(this);
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

  async sendPasswordResetEmail(email) {
    return await this.auth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  }

  async confirmPasswordReset(code, password) {
    return await this.auth.confirmPasswordReset(code, password).then(() => {
      return true;
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

    const query = await this.database
      .collection('user')
      .doc(user.uid)
      .collection('domains')
      .where('domain', '==', domain)
      .get();

    let res = { errMsg: '' };
    query.forEach(doc => {
      if (!!doc.data()) {
        res = { errMsg: 'Domain is already exists' };
      }
    });

    return res;
  }

  async insertDomain(user, domain) {
    try {
      const res = this.isValidDomain(user, domain);

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

  onSnapshotFed(user, callMe) {
    return this.database
      .collection('federation')
      .where('email', '==', user.email)
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
