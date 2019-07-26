import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnm74cdqmhHnslgm-VHiSq_AakUCOzbSg",
  authDomain: "mbti-localee.firebaseapp.com",
  databaseURL: "https://mbti-localee.firebaseio.com",
  projectId: "mbti-localee",
  storageBucket: "",
  messagingSenderId: "183233227917",
  appId: "1:183233227917:web:6e695886d224aad2"
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const storage = firebase.storage();
