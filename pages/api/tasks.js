import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const methods = {
      get,
    };

    return await methods[req.method.toLowerCase()](req, res);
  } catch {
    res.status(218).json({ message: "An unexpected error ocurred." });
  }
}

const get = async (req, res) => {
  const charactersSnapshot = await getDocs(collection(db, "characters"));
  const equipmentSnapshot = await getDocs(collection(db, "equipment"));
  const tasksSnapshot = await getDocs(collection(db, "tasks"));
  const factionsSnapshot = await getDocs(collection(db, "factions"));

  const characters = [];
  const equipment = [];
  const tasks = [];
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

    characters.push({ id: doc.id, ...data, equipment: charactersEquip });
  });

  tasksSnapshot.forEach((doc) => {
    const data = doc.data();

    const bugs = data?.bugs?.map((bugColection) => {
      const bug = characters.find(
        (x) => x.id === bugColection._key.path.segments[6]
      );

      const bugFactions = [];
      bug?.factions?.forEach((f) => {
        const faction = factions.find((x) => x.id === f._key.path.segments[6]);
        bugFactions.push(faction);
      });
      return { ...bug, factions: bugFactions };
    });

    const taskFactions = data?.factions?.map((faction) =>
      factions.find((x) => x.id === faction._key.path.segments[6])
    );

    tasks.push({ id: doc.id, ...data, bugs, factions: taskFactions });
  });

  res.status(200).json(tasks);
};
