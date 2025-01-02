import { db, storage } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function addHazard(hazardData, photoFile) {
  try {
    let photoURL = null;
    if (photoFile) {
      const storageRef = ref(storage, `hazards/${photoFile.name}`);
      await uploadBytes(storageRef, photoFile);
      photoURL = await getDownloadURL(storageRef);
    }

    const docRef = await addDoc(collection(db, 'hazards'), {
      ...hazardData,
      photoURL,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding hazard:', error);
    throw error;
  }
}

export async function fetchHazards() {
  try {
    const querySnapshot = await getDocs(collection(db, 'hazards'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching hazards:', error);
    throw error;
  }
}