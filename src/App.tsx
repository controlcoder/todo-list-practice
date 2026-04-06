import { useState } from "react";
import "./App.css";
import Bottom from "./components/Bottom";
import Top from "./components/Top";

export interface Item {
  id: string;
  data: string;
  checked: boolean;
}

function App() {
  const getStorageItem = () => {
    const data = localStorage.getItem("myList");
    if (!data) return "null";
    return data;
  };

  const setStorageItem = (data: Item[]) => {
    localStorage.setItem("myList", JSON.stringify(data));
  };

  const myList = JSON.parse(getStorageItem());

  let [items, setItems] = useState<Item[]>(myList ? myList : []);

  const addItem = (input: string) => {
    const item: Item = { id: crypto.randomUUID(), data: input, checked: false };

    setItems((prev) => {
      setStorageItem([...prev, item]);
      return [...prev, item];
    });
  };

  const clearAll = () => {
    setItems([]);
    setStorageItem([]);
  };

  const clearItem = (id: string) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
    setStorageItem(filteredItems);
  };

  const completeTask = (id: string) => {
    const filteredItems = items.map((item) => {
      if (item.id === id) item.checked = true;
      return item;
    });
    setItems(filteredItems);
    setStorageItem(filteredItems);
  };

  return (
    <div className="pt-10 h-screen bg-[#323232] text-white flex flex-col items-center gap-15">
      <Top addItem={addItem} />
      <Bottom
        items={items}
        clearAll={clearAll}
        clearItem={clearItem}
        completeTask={completeTask}
      />
    </div>
  );
}

export default App;
