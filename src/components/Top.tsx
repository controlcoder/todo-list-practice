import { useState } from "react";

type TopProps = {
  addItem: (input: string) => void;
};

export default function Top({ addItem }: TopProps) {
  const [input, setInput] = useState("");
  return (
    <div className="flex items-center gap-5 border border-white p-6 rounded-lg text-black">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-white outline-none input"
        placeholder="Add an item"
      />
      <div
        onClick={() => {
          const inputVal = input && input.trim();
          if (!inputVal) alert("Item value should not be input");
          else addItem(inputVal);
          setInput("");
        }}
        className="add btn text-4xl rounded bg-white"
      >
        <span>+</span>
      </div>
    </div>
  );
}
