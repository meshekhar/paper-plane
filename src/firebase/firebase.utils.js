import firebase from 'firebase/app';

import 'firebase/firestore'
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDDvONZpe8QiuuOGznp6t_hizD6eAA1XLg",
    authDomain: "crwn-db-9b992.firebaseapp.com",
    databaseURL: "https://crwn-db-9b992.firebaseio.com",
    projectId: "crwn-db-9b992",
    storageBucket: "crwn-db-9b992.appspot.com",
    messagingSenderId: "266638673059",
    appId: "1:266638673059:web:43c18d4eedf1c576e1eb16"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user:', error.message);
        }
    }
    //console.log(userRef);
    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {

    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accum, collection) => {
        accum[collection.title.toLowerCase()] = collection;
        return accum
    }, {});

};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;