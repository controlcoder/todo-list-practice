import { useState } from "react";

type TopProps = {
  addItem: (input: string) => void;
};

export default function Top({ addItem }: TopProps) {
  const handleSubmitItem = () => {
    const inputVal = input && input.trim();
    if (!inputVal) alert("Item value should not be input");
    else addItem(inputVal);
    setInput("");
  };

  const [input, setInput] = useState("");
  return (
    <div className="flex items-center justify-between gap-5 border max-w-112 w-full border-white p-6 rounded-lg text-black">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmitItem();
          }
        }}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-white outline-none input"
        placeholder="Add an item"
      />
      <div onClick={() => handleSubmitItem()} className="add btn text-4xl rounded bg-white">
        <span>+</span>
      </div>
    </div>
  );
}
