import { db } from "../../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const methods = {
      get,
      post,
    };

    return await methods[req.method.toLowerCase()](req, res);
  } catch {
    res.status(218).json({ message: "Feijoada" });
  }
}

const get = async (req, res) => {
  const charactersSnapshot = await getDocs(collection(db, "characters"));

  const characters = [];

  charactersSnapshot.forEach((doc) => {
    characters.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json(characters);
};

const post = async (req, res) => {
  await addDoc(collection(db, "characters"), req.body);
  res.status(200).json({ message: "Character created" });
};
