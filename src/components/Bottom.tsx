import ListItem from "../model/ListItem";

type BottomProps = {
  items: ListItem[];
  clearAll: () => void;
  removeItem: (id: string) => void;
  completeTask: (id: string) => void;
};

export default function Bottom({
  items,
  clearAll,
  removeItem,
  completeTask,
}: BottomProps) {
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
                  disabled={checked}
                  onChange={() => {
                    completeTask(id);
                  }}
                />
                <p className="text-xl">{item}</p>
              </div>
              <div
                onClick={() => removeItem(id)}
                className="remove btn text-xl rounded bg-white text-black"
              >
                <span>X</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

{
  /* <div className="flex items-center justify-between px-6">
  <div className="flex gap-8">
    <input type="checkbox" className="w-5" />
    <p className="text-xl">Make a video</p>
  </div>
  <div className="remove btn text-xl rounded bg-white text-black">
    <span>X</span>
  </div>
</div> */
}
