import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");

  const payloads = [
    '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    '<svg onload=alert(1)>',
    '<input onfocus=alert(1) autofocus>',
    '<a href="javascript:alert(1)">Click</a>',
    '<div onclick=alert(1)>Click me</div>',
    '<img src=x onerror=alert(document.cookie)>'
  ];

  const handleTest = () => {
    setOutput(input);

    if (
      input.includes("onerror") ||
      input.includes("onload") ||
      input.includes("javascript:")
    ) {
      setStatus("⚠️ Possible XSS Detected");
    } else {
      setStatus("✅ Seems Safe");
    }
  };

  return (
    <div className="container">
      <h1>XSS Tester</h1>

      <p className="status">{status || "Run a payload to test XSS..."}</p>

      <textarea
        placeholder="Enter your payload..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleTest}>Test Payload</button>

      <div className="output-box">
        <h2>Output:</h2>
        <div
          className="output"
          dangerouslySetInnerHTML={{ __html: output }}
        />
      </div>

      {/* Payload Buttons */}
      <div className="payloads">
        <h3>Test Payloads:</h3>
        {payloads.map((p, index) => (
          <button key={index} onClick={() => setInput(p)}>
            {p}
          </button>
        ))}
      </div>

      {/* Notes Section */}
      <div className="notes">
        <h3>Notes:</h3>
        <ul>
          <li>XSS occurs when user input is not sanitized properly.</li>
          <li>Event handlers like <b>onerror</b> and <b>onload</b> execute JavaScript.</li>
          <li>Modern browsers often block script tag execution via innerHTML.</li>
          <li>Attackers use XSS to steal cookies and session data.</li>
        </ul>
      </div>
    </div>
  );
}

export default App;