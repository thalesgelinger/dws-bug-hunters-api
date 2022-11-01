import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const methods = {
      get,
    };

    return await methods[req.method.toLowerCase()](req, res);
  } catch {
    res.status(218).json({ message: "Feijoada" });
  }
}

const get = async (req, res) => {
  const factionsSnapshot = await getDocs(collection(db, "factions"));

  const factions = [];

  factionsSnapshot.forEach((doc) => {
    factions.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json(factions);
};
