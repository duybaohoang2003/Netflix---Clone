// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiEJT88OVQmVnGvF_w96Wo1Fd7Z5Q0sC4",
  authDomain: "netflix---clone-50977.firebaseapp.com",
  projectId: "netflix---clone-50977",
  storageBucket: "netflix---clone-50977.appspot.com",
  messagingSenderId: "676445964622",
  appId: "1:676445964622:web:1c3bf31556a71eb72af61f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Tao Tai Khoan
const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local", 
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

// DANG NHAP
const login = async(email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


// DANG XUAT
const logout = ()=>{
    signOut(auth);
}

export{auth, db, login, signUp, logout};