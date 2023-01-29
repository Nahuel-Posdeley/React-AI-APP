import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function App() {
  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [loading,setLoading] = useState(false)


  const seacher = async () => {
    setLoading(true)
    let object = { 
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        prompt: input
    };

    try {
      const response = await openai.createCompletion(object);
      setResult(response.data.choices[0].text);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
        <h1 className="heading">React AI APP</h1>
        <h3>Preguntas y respuestas</h3>
        <p>Responder preguntas basadas en el conocimiento existente</p>
      <textarea
        placeholder="escribe algo..."
        className="text-area"
        cols={55}
        rows={10}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="button" className="action-btn" onClick={seacher}>
        Submit
      </button>
      {loading ? (
        <p className="result-text">Cargando...</p>
      ) : (
        <h3 className="result-text">{result.length > 0 ? result : ""}</h3>
      )}
    </div>
  );
}

export default App;
