import { useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import initilizeAuthentication from "../firebase/firebase.init";
import { useHistory } from "react-router";

initilizeAuthentication();

const useFirebase = () => {
    const auth = getAuth();
    const history = useHistory();

    // local state
    const [user, setUser] = useState({});
    const [isLoading, setIsloading] = useState(true);

    // login using google
    const signInWithGoogle = () => {
        console.log("Clicked...")
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider)
    };

    // update user profile
    const updateUserProfile = (name) => {
        updateProfile(auth.currentUser, { displayName: name })
            .then(() => {

            })
            .catch(err => console.log(err));
    }

    // register with email and password
    const registerWithEmail = (name, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateUserProfile(name)
            })
            .catch(err => { return err.message })
    };

    // login with email and password
    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };

    // logout
    const logOut = () => {
        setIsloading(true);
        signOut(auth)
            .then(() => { })
    };

    // observe users change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setIsloading(false)
        });
        return () => unsubscribe
    }, []);

    return {
        user,
        isLoading,
        registerWithEmail,
        loginWithEmail,
        signInWithGoogle,
        logOut
    }
}
export default useFirebase;