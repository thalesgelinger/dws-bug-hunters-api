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
  const equipmentSnapshot = await getDocs(collection(db, "equipment"));

  const characters = [];
  const equipment = [];

  equipmentSnapshot.forEach((doc) => {
    equipment.push({ id: doc.id, ...doc.data() });
  });

  charactersSnapshot.forEach((doc) => {
    const data = doc.data();

    const charactersEquip = data?.equipment?.map((equip) =>
      equipment.find((x) => x.id === equip._key.path.segments[6])
    );

    characters.push({ id: doc.id, ...data, equipment: charactersEquip });
  });

  // this is a lot cleaner imo but the maps dont work and i cant figure out why:
  // const charactersSnapshot = await getDocs(collection(db, "characters"));
  // const equipmentSnapshot = await getDocs(collection(db, "equipment"));

  // const equipment = equipmentSnapshot.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }));

  // const characters = charactersSnapshot.map((doc) => {
  //   const data = doc.data();

  //   const charactersEquip = data?.equipment?.map((equip) =>
  //     equipment.find((x) => x.id === equip._key.path.segments[6])
  //   );

  //   return { id: doc.id, ...data, equipment: charactersEquip };
  // });

  res.status(200).json(characters);
};

const post = async (req, res) => {
  await addDoc(collection(db, "characters"), req.body);
  res.status(200).json({ message: "Character created" });
};;;
