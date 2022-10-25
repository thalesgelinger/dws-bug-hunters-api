// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  console.log({ req: req.method });

  const methods = {
    get,
    post,
  };

  return await methods[req.method.toLowerCase()](req, res);
}

const get = async (req, res) => {
  const charactersSnapshot = await getDocs(collection(db, "characters"));

  charactersSnapshot.forEach((doc) => {
    console.log(doc.data());
  });

  res.status(200).json({ foi: "eee" });
};

const post = async (req, res) => {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });

  console.log({ docRef });
};
