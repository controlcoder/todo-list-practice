import { useEffect, useState } from "react";
import "./App.css";
import Bottom from "./components/Bottom";
import Top from "./components/Top";

import ListItem from "./model/ListItem";
import FullList from "./model/FullList";

function App() {
  const [items, setItems] = useState<ListItem[]>([]);

  const list = FullList.instance;

  useEffect(() => {
    list.load();

    setItems([...list.list]);

    return () => {
      setItems([]);
    };
  }, []);

  const addItem = (input: string) => {
    const newItem = new ListItem(crypto.randomUUID(), input, false);
    list.addItem(newItem);
    setItems([...list.list]);
  };

  const removeItem = (id: string) => {
    list.removeItem(id);
    setItems([...list.list]);
  };

  const clearAll = () => {
    list.clearList();
    setItems([]);
  };

  const completeTask = (id: string) => {
    list.completeTask(id);
    setItems([...list.list]);
  };

  return (
    <div className="pt-10 h-screen px-6 bg-[#323232] text-white flex flex-col items-center gap-15">
      <Top addItem={addItem} />
      <Bottom
        items={items}
        clearAll={clearAll}
        completeTask={completeTask}
        removeItem={removeItem}
      />
    </div>
  );
}

export default App;
