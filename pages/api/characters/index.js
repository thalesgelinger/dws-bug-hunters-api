import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";

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

const get = async (_, res) => {
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

    if (!!data.id) {
      delete data.id;
    }

    const charactersEquip = data?.equipment?.map((equip) =>
      equipment.find((x) => x.id === equip._key.path.segments[6])
    );

    const charactersFactions = data?.factions?.map((faction) =>
      factions.find((x) => x.id === faction._key.path.segments[6])
    );

    characters.push({
      id: doc.id,
      ...data,
      equipment: [...charactersEquip],
      factions: [...charactersFactions],
    });
  });

  res.status(200).json(characters);
};

const post = async (req, res) => {
  const factionsRefArr = [];
  const equipmentRefArr = [];

  if (!!req.body?.id) {
    delete req.body.id;
  }

  req.body.factions?.forEach((faction) => {
    const factionDoc = doc(db, "factions", faction.id);
    factionsRefArr.push(factionDoc);
  });

  req.body.equipment?.forEach((equip) => {
    const equipDoc = doc(db, "equipment", equip.id);
    equipmentRefArr.push(equipDoc);
  });

  const newCharacter = {
    ...req.body,
    equipment: [...equipmentRefArr],
    factions: [...factionsRefArr],
  };

  await addDoc(collection(db, "characters"), newCharacter);

  res.status(200).json({
    message: "Character created",
    character: newCharacter,
  });
};

const patch = async (req, res) => {
  const factionsRefArr = [];
  const equipmentRefArr = [];

  req.body.factions?.forEach((faction) => {
    const factionDoc = doc(db, "factions", faction.id);
    factionsRefArr.push(factionDoc);
  });

  req.body.equipment?.forEach((equip) => {
    const equipDoc = doc(db, "equipment", equip.id);
    equipmentRefArr.push(equipDoc);
  });

  const oldCharDoc = doc(db, "characters", req.body.id);
  const oldChar = (await getDoc(oldCharDoc)).data();

  const oldCharEquipment = [];
  const oldCharFactions = [];

  oldChar.equipment?.forEach((equip) => {
    const equipDoc = doc(db, "equipment", equip.id);
    oldCharEquipment.push(equipDoc);
  });

  oldChar.factions?.forEach((faction) => {
    const factionDoc = doc(db, "factions", faction.id);
    oldCharFactions.push(factionDoc);
  });

  const updatedChar = {
    ...oldChar,
    ...req.body,
    equipment:
      req.body.equipment?.length >= 0 ? [...equipmentRefArr] : oldCharEquipment,
    factions:
      req.body.factions?.length >= 0 ? [...factionsRefArr] : oldCharFactions,
  };

  if (!!updatedChar.id) {
    delete updatedChar.id;
  }

  await setDoc(oldCharDoc, updatedChar);

  res
    .status(200)
    .json({ message: "Character updated", character: { ...updatedChar } });
};
