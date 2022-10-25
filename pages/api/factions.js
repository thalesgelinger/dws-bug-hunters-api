export default function handleFactions(req, res, next) {
  try {
    res.status(200).json([
      {
        id: "afganfgjkln",
        name: "Frontend",
      },
      {
        id: "bmnsagkuil",
        name: "Backend",
      },
      {
        id: "iagsfhsdoih",
        name: "Mobile",
      },
    ]);
  } catch {
    res.status(218).json({ message: "Feijoada" });
  }
}
