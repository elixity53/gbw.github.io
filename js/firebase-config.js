const firebaseConfig = {
  apiKey: "AIzaSyD9L56spQQ0Bn1qmEEB-1cdPD8DOPa_er8",
  authDomain: "gbkw-database.firebaseapp.com",
  projectId: "gbkw-database",
  storageBucket: "gbkw-database.firebasestorage.app",
  messagingSenderId: "1095343886399",
  appId: "1:1095343886399:web:e92efc2e0ce68643dfe88a",
  measurementId: "G-J4HKM4JJ1Z"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const itemsCollection = db.collection("items");
const imagesCollection = db.collection("images");
const statsCollection = db.collection("stats");
async function updateStats(action) {
  const statsDoc = statsCollection.doc('general');
  const statsSnapshot = await statsDoc.get();
  let stats = statsSnapshot.exists ? statsSnapshot.data() : {};
  stats.lastEdit = firebase.firestore.FieldValue.serverTimestamp();
  await statsDoc.set(stats, { merge: true });
}
