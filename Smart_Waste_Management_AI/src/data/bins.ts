export type Bin = {
  id: number;
  type: "Plastic" | "Organic" | "Metal" | "Paper" | "Glass";
  location: string;
  fillLevel: number;
  lastEmptied: string;
};

export const bins: Bin[] = [
  { id: 1, type: "Plastic", location: "Campus Gate", fillLevel: 45, lastEmptied: "2h ago" },
  { id: 2, type: "Organic", location: "Cafeteria", fillLevel: 87, lastEmptied: "9h ago" },
  { id: 3, type: "Metal", location: "Library", fillLevel: 62, lastEmptied: "1h ago" },
  { id: 4, type: "Paper", location: "Admin Block", fillLevel: 34, lastEmptied: "30m ago" },
  { id: 5, type: "Plastic", location: "Hostel A", fillLevel: 91, lastEmptied: "12h ago" },
  { id: 6, type: "Organic", location: "Sports Complex", fillLevel: 58, lastEmptied: "3h ago" },
  { id: 7, type: "Glass", location: "Auditorium", fillLevel: 22, lastEmptied: "45m ago" },
  { id: 8, type: "Metal", location: "Workshop", fillLevel: 76, lastEmptied: "5h ago" },
];
