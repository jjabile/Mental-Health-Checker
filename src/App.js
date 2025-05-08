import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);

  const analyzeMood = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/analyze", { text });
      setResponse(res.data);
    } catch (error) {
      console.error("Error analyzing text:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>AI Mental Health Checker</h1>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="How are you feeling today?"
      />
      <br />
      <button onClick={analyzeMood}>Analyze</button>

      {response && (
        <div>
          <h3>Sentiment Analysis Result:</h3>
          <p>Sentiment Score: {JSON.stringify(response.sentiment)}</p>
          <h3>Advice:</h3>
          <p>{response.advice}</p>
        </div>
      )}
    </div>
  );
}

export default App;
