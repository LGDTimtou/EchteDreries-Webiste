// components/builder/YamlActionButtons.jsx
import React from "react";

const YamlActionButtonsField = ({
  secret,
  onLoadClick,
  onCopyClick,
  onSendClick,
  buttonState,
  onClearClick,
  errors,
}) => {
  return (
    <div className="content-box">
      <h2 className="content-box-title">Output</h2>

      {!secret ? (
        <>
          <button className="add-btn-text" onClick={onLoadClick}>
            Load Enchantment YAML
          </button>
          <button
            className={`add-btn-text ${
              buttonState === "success" ? "copy-success" : ""
            }`}
            onClick={onCopyClick}
            disabled={buttonState === "success"}
          >
            {buttonState === "success"
              ? "Output copied to clipboard!"
              : "Get YAML Output"}
          </button>
        </>
      ) : (
        <button
          className={`add-btn-text ${
            buttonState === "success"
              ? "copy-success"
              : buttonState === "error"
              ? "red"
              : "btn-dis"
          }`}
          onClick={onSendClick}
          disabled={
            buttonState === "success" ||
            buttonState === "loading" ||
            buttonState === "error"
          }
        >
          {buttonState === "loading"
            ? "Sending changes to server..."
            : buttonState === "success"
            ? "Changes successfully sent to server!"
            : buttonState === "error"
            ? "Cannot continue — the WebSocket connection was already closed. The output has been copied to your clipboard"
            : "Send Changes to Server"}
        </button>
      )}

      <button className="add-btn-text red" onClick={onClearClick}>
        Clear All Input
      </button>

      {errors.length > 0 && (
        <div className="error-list">
          <h3 className="error-list-title">Please fix the following errors:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index} className="error-item">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default YamlActionButtonsField;
