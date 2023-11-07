import React, { useContext, useState, useEffect } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '../helpers/Firebase'

const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const UserSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const UserSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const UserSignOut = () => {
        return signOut(auth)
    };

    const ResetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const  unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            };
        });

        setLoading(false);
        return () => { unsubscribe(); };
    }, []);

    const value = {
        currentUser,
        UserSignUp,
        UserSignIn,
        UserSignOut,
        ResetPassword
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>        
    )
}

export {
    useAuth,
    AuthProvider
}