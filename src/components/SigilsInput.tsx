import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface Props {
  setContent: Dispatch<SetStateAction<string>>;
  content: string;
}

export const SigilsInput = ({ setContent, content }: Props) => {
  const [cursor, setCursor] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  function isKeyValid(e: React.KeyboardEvent<HTMLInputElement>) {
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
  }, [content]);

  return (
    <input
      className="bg-zinc-50 m-2 resize"
      onKeyDown={(e) => {
        setCursor(null);

        if (!isKeyValid(e)) {
          e.preventDefault();
        }
      }}
      value={content}
      onChange={(e) => setContent(e.currentTarget.value)}
      ref={inputRef}
    />
  );
};
