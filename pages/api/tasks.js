export default function handleTasks(req, res, next) {
  try {
    res.status(200).json([
      {
        id: 2,
        name: "Why Doesn't My Code Run?",
        description:
          "I'm getting this weird error in my console, can you help me?",
        complexity_level: 1,
        reward: 100,
        bugs: [2],
        factions: [],
      },
      {
        id: 3,
        name: "This shouldn't have margin...",
        description:
          "For some reason, even though I didn't add any margin, our buttons on this page all have margin-bottom: 1rem; and I can't figure out why!",
        complexity_level: 1,
        reward: 100,
        bugs: [3],
        factions: [],
      },
      {
        id: 4,
        name: "What is this? ...Why is Javascript so weird?!",
        description:
          "How can something be NaN and false at the same time? Is there somethig wrong with my request?",
        complexity_level: 3,
        reward: 100,
        bugs: [4, 5],
        factions: [],
      },
      {
        id: 5,
        name: "Missing Data From Response",
        description:
          "When I try accessing the data from this request it's not there! Help me!",
        complexity_level: 3,
        reward: 100,
        bugs: [6, 7],
        factions: [],
      },
      {
        id: 6,
        name: "Why is This Number a String? Omg... Is This in Prod?!",
        description:
          "Apparently a bug went right through our qa process, we need to stop it fast!",
        complexity_level: 5,
        reward: 100,
        bugs: [8],
        factions: [],
      },
      {
        id: 7,
        name: "This Is Certainly Our Last Mission",
        description:
          "Either we do the impossible here or we're all done for...",
        complexity_level: 8,
        reward: 100,
        bugs: [9],
        factions: [],
      },
    ]);
  } catch {
    res.status(218).json({ message: "Feijoada" });
  }
}
