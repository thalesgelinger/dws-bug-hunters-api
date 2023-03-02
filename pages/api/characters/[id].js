import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function updateCharacter(req, res) {
  try {
    const methods = {
      patch,
    };

    return await methods[req.method.toLowerCase()](req, res);
  } catch {
    res.status(218).json({ message: "An unexpected error ocurred." });
  }
}

const patch = async (req, res) => {
  await updateDoc(doc(db, "characters", req.query.id), req.body);
  res.status(200).json({ message: "Character updated" });
};
