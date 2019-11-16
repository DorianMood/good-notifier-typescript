import Item from "./schemas/Item";

export interface UserData {
  id: number;
  name: string;
  password: string;
  color?: string;
}

export interface ListData {
  id: number;
  name: string;
  items?: Item[];
  user_id: number;
}

export interface ItemData {
  id: number;
  name: string;
  link: string;
  list_id: number;
}

export const users: UserData[] = [
  { id: 1, name: "Nikita", password: "pa$$word" },
  { id: 2, name: "Benjamin", password: "admin", color: "#123123" },
];

export const lists: ListData[] = [
  { id: 1, name: "Weapons", user_id: 1 },
  { id: 2, name: "Clothers", user_id: 1 },
  { id: 3, name: "Games", user_id: 1 },
  { id: 4, name: "Clothers", user_id: 2 },
  { id: 5, name: "Food", user_id: 2 }
];

export const items: ItemData[] = [
  { id: 1, name: "Shootgun", link: "alibaba.com/shootgun?123", list_id: 1 },
  { id: 2, name: "Machette", link: "alibaba.com/machette?123", list_id: 1 },
  { id: 3, name: "Pistol", link: "alibaba.com/pistol?123", list_id: 1 },
  { id: 4, name: "Hat", link: "alibaba.com/hat?123", list_id: 2 },
  { id: 5, name: "Scharf", link: "alibaba.com/scharf?123", list_id: 2 },
  { id: 6, name: "Boots", link: "alibaba.com/boots?123", list_id: 2 },
  { id: 7, name: "Warcraft", link: "alibaba.com/warcraft?123", list_id: 3 },
  { id: 8, name: "LoL", link: "alibaba.com/lol?123", list_id: 3 },
  { id: 9, name: "CS", link: "alibaba.com/counterstrike?123", list_id: 3 },
  { id: 10, name: "cap", link: "alibaba.com/cap?123", list_id: 4 },
  { id: 11, name: "coat", link: "alibaba.com/coat?123", list_id: 4 },
  { id: 12, name: "pants", link: "alibaba.com/pants?123", list_id: 4 },
  { id: 13, name: "cake", link: "alibaba.com/cake?123", list_id: 5 },
  { id: 14, name: "milka", link: "alibaba.com/milka?123", list_id: 5 },
  { id: 15, name: "lays", link: "alibaba.com/lays?123", list_id: 5 }
];
