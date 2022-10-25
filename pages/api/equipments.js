export default function handleFactions(req, res, next) {
  try {
    res.status(200).json([
      {
        id: 4,
        name: "Excalibug",
        affected_attribute: "atk",
        affected_amount: 50,
        value: 5000,
      },
      {
        id: 5,
        name: "Staff of Javascript",
        affected_attribute: "atk",
        affected_amount: 25,
        value: 666,
      },
      {
        id: 6,
        name: "Boots of 'Runs in My Local'",
        affected_attribute: "def",
        affected_amount: 1,
        value: 10,
      },
      {
        id: 7,
        name: "Extreme Go-Horse Ring",
        affected_attribute: "agi",
        affected_amount: 10,
        value: 2000,
      },
      {
        id: 8,
        name: "Clean Code Amulet",
        affected_attribute: "hp",
        affected_amount: 20,
        value: 210,
      },
      {
        id: 9,
        name: "Mechanical Keyboard Shield",
        affected_attribute: "def",
        affected_amount: 5,
        value: 720,
      },
      {
        id: 10,
        name: "Bug Armor",
        affected_attribute: "def",
        affected_amount: 2,
        value: 0,
      },
      {
        id: 11,
        name: "IDE Goggles",
        affected_attribute: "agi",
        affected_amount: 5,
        value: 120,
      },
      {
        id: 12,
        name: "Book of Googling Stuff",
        affected_attribute: "agi",
        affected_amount: 42,
        value: 4200,
      },
      {
        id: 13,
        name: "Dirty Keyboard",
        affected_attribute: "def",
        affected_amount: 5,
        value: 2,
      },
    ]);
  } catch {
    res.status(218).json({ message: "Feijoada" });
  }
}
