import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";

import { object, string, number, array } from "yup";

const equipmentSchema = object({
  id: string().required(),
  name: string().required(),
  affected_attribute: string().required(),
  affected_amount: number().required(),
  value: number().required(),
});

const factionSchema = object({
  id: string().required(),
  name: string().required(),
});

const postCharacterSchema = object({
  name: string().required(),
  def: number().required(),
  agi: number().required(),
  atk: number().required(),
  hp: number().required(),
  gold: number().required(),
  factions: array(factionSchema).min(0).required(),
  equipment: array(equipmentSchema).min(0).required(),
});

const patchCharacterSchema = object({
  id: string().required(),
  name: string(),
  def: number(),
  agi: number(),
  atk: number(),
  hp: number(),
  gold: number(),
  factions: array(factionSchema).min(0),
  equipment: array(equipmentSchema).min(0),
});

export default async function handler(req, res) {
  try {
    const methods = {
      get,
      post,
      patch,
    };

    return await methods[req.method.toLowerCase()](req, res);
  } catch {
    res.status(218).json({ message: "An unexpected error ocurred." });
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

    const charactersEquip =
      data?.equipment?.map((equip) =>
        equipment.find((x) => x.id === equip._key.path.segments[6])
      ) || [];

    const charactersFactions =
      data?.factions?.map((faction) =>
        factions.find((x) => x.id === faction._key.path.segments[6])
      ) || [];

    characters.push({
      id: doc.id,
      ...data,
      equipment: [...charactersEquip],
      factions: [...charactersFactions],
    });
  });

  console.log(characters);

  res.status(200).json(characters);
};

const post = async (req, res) => {
  const factionsRefArr = [];
  const equipmentRefArr = [];

  if (!!req.body?.id) {
    delete req.body.id;
  }

  if (!!req.body.factions && req.body.factions.length > 0) {
    // we'd have to check here if any of the sent equipment are mishapen
    req.body.factions?.forEach((faction) => {
      const factionDoc = doc(db, "factions", faction.id);
      factionsRefArr.push(factionDoc);
    });
  }

  if (!!req.body.equipment && req.body.equipment.length > 0) {
    // same here for factions
    req.body.equipment?.forEach((equip) => {
      const equipDoc = doc(db, "equipment", equip.id);
      equipmentRefArr.push(equipDoc);
    });
  }

  const newCharacter = {
    ...req.body,
    equipment: [...equipmentRefArr],
    factions: [...factionsRefArr],
  };

  const isValid = await postCharacterSchema.isValid(newCharacter);

  if (isValid) {
    await addDoc(collection(db, "characters"), newCharacter);
    res
      .status(200)
      .json({ message: "Character created", character: { ...newCharacter } });
  } else {
    res.status(400).json({
      message: "Something went wrong when trying to save your character.",
      character: { ...newCharacter },
    });
  }
};

const patch = async (req, res) => {
  if (!req.body.id) {
    res.status(400).json({
      message: "Your request body is missing id.",
      request_body: { ...req.body },
    });
  }

  const factionsRefArr = [];
  const equipmentRefArr = [];

  if (!!req.body.factions && req.body.factions.length > 0) {
    // we'd have to check here if any of the sent equipment are mishapen
    req.body.factions?.forEach((faction) => {
      const factionDoc = doc(db, "factions", faction.id);
      factionsRefArr.push(factionDoc);
    });
  }

  if (!!req.body.equipment && req.body.equipment.length > 0) {
    // same here for factions
    req.body.equipment?.forEach((equip) => {
      const equipDoc = doc(db, "equipment", equip.id);
      equipmentRefArr.push(equipDoc);
    });
  }

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
      !!req.body.equipment?.length && req.body.equipment?.length >= 0
        ? [...equipmentRefArr]
        : oldCharEquipment,
    factions:
      !!req.body.factions?.length && req.body.factions?.length >= 0
        ? [...factionsRefArr]
        : oldCharFactions,
  };

  const isValid = await patchCharacterSchema.isValid(updatedChar);

  if (isValid) {
    await setDoc(oldCharDoc, updatedChar);
    res
      .status(200)
      .json({ message: "Character updated", character: { ...updatedChar } });
  } else {
    res.status(400).json({
      message: "Something went wrong when trying to save your character.",
      character: { ...updatedChar },
    });
  }
};
