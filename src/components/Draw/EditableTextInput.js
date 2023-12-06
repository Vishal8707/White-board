import React, { useState, useRef, useEffect } from "react";
import { Html } from "react-konva-utils";

function getStyle(
  width,
  height,
  fontSize,
  italic,
  textAlign,
  fontWeight,
  fontFamily,
  textDecoration
) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height - 50}px`,
    border: "none",
    padding: "10px 20px",
    margin: "5px",
    background: "none",
    outline: "none",
    textDecoration: textDecoration ? "underline" : "none",
    color: "black",
    fontSize: `${fontSize}px`,
    fontFamily: fontFamily,
    textAlign: textAlign,
    fontStyle: italic ? "italic" : "normal",
    fontWeight: fontWeight ? "bold" : "normal",
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    marginTop: "-4px",
  };
}

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export function EditableTextInput({
  x,
  y,
  width,
  height,
  value,
  onChange,
  onKeyDown,
  isEditing,
  fontSize,
  italic,
  textAlign,
  fontWeight,
  fontFamily,
  textDecoration,
}) {
  const textareaRef = useRef(null);
  const invisibleDivRef = useRef(null);
  const [inputValue, setInputValue] = useState(value);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const textarea = textareaRef.current;
      const invisibleDiv = invisibleDivRef.current;

      invisibleDiv.style.width = "auto";
      invisibleDiv.style.height = "auto";
      invisibleDiv.style.width = `${textarea.clientWidth}px`;
      invisibleDiv.style.height = `${textarea.clientHeight}px`;

      textarea.style.width = `${invisibleDiv.clientWidth}px`;
      textarea.style.height = `${invisibleDiv.clientHeight}px`;
    }
  }, [isEditing, inputValue]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const handleEscapeKeys = (e) => {
    if (e.keyCode === ESCAPE_KEY) {
      e.preventDefault();
      setDisable(true);
    }
  };

  const style = getStyle(
    width,
    height,
    fontSize,
    italic,
    textAlign,
    fontWeight,
    fontFamily,
    textDecoration
  );

  return (
    <Html groupProps={{ x, y }} divProps={{ backgroundColor: "red" }}>
      <div
        ref={invisibleDivRef}
        style={{
          ...style,
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre-wrap",
        }}
      >
        {inputValue}
      </div>
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleEscapeKeys}
        style={style}
        disabled={disable}
      />
    </Html>
  );
}
