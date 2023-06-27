import { useEffect, useRef, useState } from "react";
import * as Switch from "@radix-ui/react-switch";

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "Backspace"],
  ["z", "x", "c", "v", "b", "n", "m"],
  ["Space"],
];

export function App() {
  const [sigilsContent, setSigilsContent] = useState("");
  const [normalContent, setNormalContent] = useState("");
  const [sinais, setSinais] = useState(false);
  const [cursor, setCursor] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function isKeyValid(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const acceptedBaseKeys = [
      "Backspace",
      " ",
      "ArrowRight",
      "ArrowLeft",
      "End",
      "Home",
      "Delete",
    ];
    const acceptedCtrlKeys = ["x", "c", "v", "a"];

    if (acceptedBaseKeys.includes(e.key)) return true;

    if (acceptedCtrlKeys.includes(e.key) && e.ctrlKey) return true;

    return false;
  }

  useEffect(() => {
    if (cursor) {
      inputRef.current?.setSelectionRange(cursor + 1, cursor + 1);
      setCursor(null);
    }
  }, [sigilsContent]);

  return (
    <div className="w-full min-h-screen h-full bg-stone-950 flex flex-col items-center py-12 relative">
      <label className="space-x-2 absolute top-6 right-8">
        <span className={`text-amber-400${sinais ? " font-sigilos" : ""}`}>
          Sigilos
        </span>
        <Switch.Root
          id="type"
          className="h-4 w-8 bg-stone-700 rounded-full relative"
          onCheckedChange={(checked) => setSinais(checked)}
        >
          <Switch.Thumb
            className={`h-3 w-3 rounded-full ${
              sinais ? "bg-lime-400" : "bg-amber-400"
            } block transition-transform translate-x-[2px] data-[state=checked]:translate-x-[18px]`}
          />
        </Switch.Root>
        <span className={`text-lime-400${sinais ? "" : " font-sinais"}`}>
          Sinais
        </span>
      </label>
      <div className="flex flex-col items-center mb-6">
        <h1
          className={`text-4xl ${
            sinais ? "text-lime-400" : "text-amber-400"
          } font-westsac`}
        >
          Conversor Paranormal
        </h1>
        <h2
          className={`text-2xl ${
            sinais ? "text-lime-400 font-sinais" : "text-amber-400 font-sigilos"
          }`}
        >
          Conversor Paranormal
        </h2>
      </div>
      <div className="flex w-3/5 gap-8">
        <div className="flex-1 space-y-3">
          <h3
            className={`text-center font-blur text-lg ${
              sinais ? "text-lime-400" : "text-amber-400"
            }`}
          >
            Alfabeto ➔ {sinais ? "Sinais" : "Sigilos"}
          </h3>
          <textarea
            className={`
              text-lg
              border-2
              border-stone-600
              bg-transparent
              rounded-md
              outline-none
              ring-offset-stone-950
              ring-offset-2
              focus:ring-1
              ${sinais ? "focus:ring-lime-400" : "focus:ring-amber-400"}
              text-stone-200
              p-2
              w-full
              h-48
              resize-none`}
            value={normalContent}
            onChange={(e) => setNormalContent(e.currentTarget.value)}
          />
          <div
            className={`
              text-2xl
              border-2
              ${sinais ? "border-lime-500" : "border-amber-500"}
              bg-transparent
              rounded-md
              outline-none
              text-white
              p-2
              w-full
              h-48
              ${
                sinais
                  ? "text-lime-400 font-sinais"
                  : "text-amber-400 font-sigilos"
              }
              break-all
              overflow-y-auto`}
          >
            {normalContent}
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <h3
            className={`text-center font-blur text-lg ${
              sinais ? "text-lime-400" : "text-amber-400"
            }`}
          >
            {sinais ? "Sinais" : "Sigilos"} ➔ Alfabeto
          </h3>
          <textarea
            className={`
              text-2xl
              border-2
              border-stone-600
              bg-transparent
              rounded-md
              outline-none
              ring-offset-stone-950
              ring-offset-2
              focus:ring-1
              ${sinais ? "focus:ring-lime-400" : "focus:ring-amber-400"}
              text-stone-200
              p-2
              w-full
              h-48
              resize-none
              ${
                sinais
                  ? "text-lime-400 font-sinais"
                  : "text-amber-400 font-sigilos"
              }`}
            onKeyDown={(e) => {
              if (!isKeyValid(e)) {
                e.preventDefault();
              }
            }}
            value={sigilsContent}
            onChange={(e) => setSigilsContent(e.currentTarget.value)}
            ref={inputRef}
          />
          <div
            className={`
              text-lg
              border-2
              ${sinais ? "border-lime-500" : "border-amber-500"}
              bg-transparent
              rounded-md
              outline-none
              text-white
              p-2
              w-full
              h-48
              overflow-y-auto`}
          >
            {sigilsContent}
          </div>
        </div>
      </div>
      <div
        className={`mt-8 flex flex-col gap-2 ${
          sinais ? "text-lime-400 font-sinais" : "text-amber-400 font-sigilos"
        }`}
      >
        {keyboard.map((line, index) => (
          <div className="flex gap-2 w-full justify-center" key={index}>
            {line.map((key: string) => {
              function getSymbol() {
                if (key === "Backspace") return "⌫";
                if (key === "Space") return "⌴";
              }

              const symbol = getSymbol();

              return (
                <button
                  className={`
                  bg-stone-800
                    text-white
                    
                    h-14
                    text-3xl
                    ${key === "Backspace" ? "ml-2 text-base" : ""}
                    ${key === "Space" ? "w-[368px] text-lg" : "w-12"}
                    select-none
                  `}
                  key={key}
                  onClick={(e) => {
                    e.preventDefault();

                    const cursorPos =
                      inputRef.current?.selectionStart || sigilsContent.length;

                    setSigilsContent((old) => {
                      if (key === "Backspace") {
                        setCursor(old.length);

                        return old.substring(0, old.length - 1);
                      }

                      setCursor(cursorPos);

                      const charToAdd = key === "Space" ? " " : key;

                      return (
                        old.substring(0, cursorPos) +
                        charToAdd +
                        old.substring(cursorPos)
                      );
                    });
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {symbol ? symbol : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
