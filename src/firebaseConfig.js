import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBgeZHDxXKxPqHiXzXdXK-jVXrz51iS4RU",
    authDomain: "palavra-viva-unifil.firebaseapp.com",
    projectId: "palavra-viva-unifil",
    storageBucket: "palavra-viva-unifil.firebasestorage.app",
    messagingSenderId: "192707249308",
    appId: "1:192707249308:web:24ab5006d65e0a28215959",
    measurementId: "G-N9SRRBM4EN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export async function incrementPageView() {
  const docRef = doc(db, "pageViews", "contador");
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, { count: 1 });
    return 1;
  } else {
    await updateDoc(docRef, { count: increment(1) });
    const updatedDoc = await getDoc(docRef);
    return updatedDoc.data().count;
  }
}
