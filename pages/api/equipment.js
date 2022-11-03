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
  const equipmentSnapshot = await getDocs(collection(db, "equipment"));

  const equipment = [];

  equipmentSnapshot.forEach((doc) => {
    equipment.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json(equipment);
};
