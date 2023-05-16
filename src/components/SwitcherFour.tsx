import { useState } from "react";

const SwitcherFour = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <label
        htmlFor="toggle4"
        className="flex items-center cursor-pointer select-none"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle4"
            className="sr-only"
            onChange={() => {
              setEnabled(!enabled);
            }}
          />
          <div className="block h-8 bg-black rounded-full w-14"></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              enabled && "!right-1 !translate-x-full"
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherFour;
