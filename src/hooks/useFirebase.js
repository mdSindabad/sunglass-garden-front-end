import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import initilizeAuthentication from "../firebase/firebase.init";

initilizeAuthentication();

const useFirebase = () => {
    const auth = getAuth();
    const history = useHistory();

    // local state
    const [user, setUser] = useState({});
    const [isLoading, setIsloading] = useState(true);

    // login using google
    const signInWithGoogle = () => {
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
                const data = {
                    name: user.displayName || "",
                    email: user.email,
                    image: user.photoURL
                }
                axios.post("https://whispering-gorge-61124.herokuapp.com/user", data)
                    .then(res => {
                        setUser(res.data)
                    })
                    .catch(err => console.log(err))
                    .finally(() => {
                        setIsloading(false)
                    })
            } else {
                setUser({})
            }
            setTimeout(() => {
                setIsloading(false)
            }, 3000)
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