import React, { useState, useRef } from "react";

import "./style.css";

type TypingAppProps = {
  text: String
}

export default function TypingApp(props: TypingAppProps): JSX.Element {
  let [typed, setTyped]: [String, Function] = useState("");
  let [hasFocus, setFocus]: [Boolean, Function] = useState(false);
  let inputEl = useRef(null);

  const handleTextChange = (event) => {
    if (event.target.value.length <= props.text.length) {
      setTyped(event.target.value);
    }
  }

  const grabFocus = (event) => {
    inputEl.current.focus();
    setFocus(true);
  }

  const lostFocus = (event) => {
    console.log("Lost focus!");
    setFocus(false);
  }

  const renderText = () => {
    return [...props.text].map((char, index) => {
      if (index < typed.length) {
        let typedC = typed[index];
        return (
          <span
            className={typedC == char ? "right-char" : "wrong-char"}>
            {typedC}
          </span>
        );
      } else if (index == typed.length){
        return (
          <>
            <span className="cursor"></span>
            <span className={"background-char"}>{char}</span>
          </>
        )
      }
      return <span className={"background-char"}>{char}</span>
    });
  }

  return (
    <div
        className={"typing-app " + (hasFocus ? "has-focus" : "not-focused")}
        onClick={grabFocus}
    >
      <textarea
          className="hidden-input-text"
          ref={inputEl}
          value={typed}
          onChange={handleTextChange}
          onBlur={lostFocus}
      />
      {renderText()}
    </div>
  );
}
