import { db } from "../../../firebase";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  try {
    const methods = {
      get,
      post,
      patch,
    };

    return await methods[req.method.toLowerCase()](req, res);
  } catch {
    res.status(218).json({ message: "Feijoada" });
  }
}

const get = async (req, res) => {
  const charactersSnapshot = await getDocs(collection(db, "characters"));
  const equipmentSnapshot = await getDocs(collection(db, "equipment"));
  const factionsSnapshot = await getDocs(collection(db, "factions"));

  const characters = [];
  const equipment = [];
  const factions = [];

  equipmentSnapshot.forEach((doc) => {
    equipment.push({ id: doc.id, ...doc.data() });
  });

  factionsSnapshot.forEach((doc) => {
    factions.push({ id: doc.id, ...doc.data() });
  });

  charactersSnapshot.forEach((doc) => {
    const data = doc.data();

    const charactersEquip = data?.equipment?.map((equip) =>
      equipment.find((x) => x.id === equip._key.path.segments[6])
    );

    const charactersFactions = data?.factions?.map((faction) =>
      factions.find((x) => x.id === faction._key.path.segments[6])
    );

    characters.push({
      id: doc.id,
      ...data,
      equipment: charactersEquip,
      factions: charactersFactions,
    });
  });

  res.status(200).json(characters);
};

const post = async (req, res) => {
  const factionsRefArr = [];
  const equipmentRefArr = [];

  req.body.factions.forEach((faction) => {
    const factionDoc = doc(db, "factions", faction.id);
    factionsRefArr.push(factionDoc);
  });

  req.body.equipment.forEach((equip) => {
    const equipDoc = doc(db, "equipment", equip.id);
    equipmentRefArr.push(equipDoc);
  });

  const newCharacter = {
    ...req.body,
    factions: [...factionsRefArr],
    equipment: [...equipmentRefArr],
  };

  await addDoc(collection(db, "characters"), { ...newCharacter, id: uuidv4() });

  res.status(200).json({
    message: "Character created",
    character: { ...newCharacter },
  });
};

const patch = async (req, res) => {
  const factionsRefArr = [];
  const equipmentRefArr = [];

  req.body.factions.forEach((faction) => {
    const factionDoc = doc(db, "factions", faction.id);
    factionsRefArr.push(factionDoc);
  });

  req.body.equipment.forEach((equip) => {
    const equipDoc = doc(db, "equipment", equip.id);
    equipmentRefArr.push(equipDoc);
  });

  const newCharacter = {
    ...req.body,
    factions: [...factionsRefArr],
    equipment: [...equipmentRefArr],
  };

  // qual a chamada certa pra fazer aqui?
  // await db.collection("characters").doc(req.body.id).update(newCharacter);

  res
    .status(200)
    .json({ message: "Character updated", character: { ...newCharacter } });
};
