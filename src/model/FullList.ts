import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
  updateItem(id: string, value: string): void;
  completeTask(id: string): void;
}

export default class FullList implements List {
  private _list: ListItem[];

  static instance: FullList = new FullList();

  private constructor(list = []) {
    this._list = list;
  }

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList");
    if (typeof storedList !== "string") return;

    const parsedList: ListItem[] = JSON.parse(storedList);

    this._list = [];

    parsedList.forEach(({ id, item, checked }) => {
      const newListItem = new ListItem(id, item, checked);
      FullList.instance.addItem(newListItem);
    });
  }

  save(): void {
    localStorage.setItem(
      "myList",
      JSON.stringify(
        this._list.map((i) => ({
          id: i.id,
          item: i.item,
          checked: i.checked,
        })),
      ),
    );
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }

  updateItem(id: string, value: string): void {
    const item = this.list.find((item) => item.id === id);
    if (!item) return;
    item.item = value;
    this.save();
  }

  completeTask(id: string) {
    const item = this.list.find((item) => item.id === id);
    if (!item) return;
    item.checked = true;
    this.save();
  }
}
