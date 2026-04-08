import { useState } from "react";
import ListItem from "../model/ListItem";

type BottomProps = {
  items: ListItem[];
  clearAll: () => void;
  removeItem: (id: string) => void;
  updateTask: (id: string, updateTask?: string) => void;
};

export default function Bottom({
  items,
  clearAll,
  removeItem,
  updateTask,
}: BottomProps) {
  const [editId, setEditId] = useState<string | null>(null);

  const [updatedInput, setUpdatedInput] = useState("");

  return (
    <div className="border rounded-md border-white max-w-150 w-full overflow-y-scroll">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl">List</h1>
        <button
          onClick={clearAll}
          className="text-black bg-white px-3 py-1 rounded-lg cursor-pointer"
        >
          Clear
        </button>
      </div>
      <hr />
      <div className="py-6 flex flex-col gap-8">
        {items.map(({ id, item, checked }) => {
          return (
            <div key={id} className="flex items-center justify-between px-6">
              <div className="flex gap-8">
                <input
                  type="checkbox"
                  className="w-5"
                  checked={checked}
                  disabled={checked || editId === id}
                  onChange={() => {
                    updateTask(id);
                  }}
                />
                {editId !== id ? (
                  <p className="text-xl">{item}</p>
                ) : (
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setEditId(null);
                        setUpdatedInput("");
                        updateTask(id, updatedInput);
                      }
                    }}
                    className="bg-white outline-none text-[20px] text-black"
                    type="text"
                    value={updatedInput}
                    onChange={(e) => setUpdatedInput(e.target.value)}
                  />
                )}
              </div>
              <div className="flex gap-2">
                {!checked && (
                  <div className="update btn text-xl rounded bg-white text-black">
                    {editId === id ? (
                      <p
                        onClick={() => {
                          setEditId(null);
                          setUpdatedInput("");
                          updateTask(id, updatedInput);
                        }}
                      >
                        ✓
                      </p>
                    ) : (
                      <i
                        onClick={() => {
                          setEditId(id);
                          setUpdatedInput(item);
                        }}
                        className="fa fa-edit"
                      ></i>
                    )}
                  </div>
                )}
                <div
                  onClick={() => removeItem(id)}
                  className="remove btn text-xl rounded bg-white text-black"
                >
                  <span>X</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// replace item with task & other changes where necessary
// add logic to support filter options

// make this project again with different pattern

// explore other available patterns
