import { useState } from "react";
import InputForm from "./components/InputForm/InputForm.jsx";
import Poster from "./components/Poster/Poster.jsx";
import PageBackdrop from "./components/PageBackdrop.jsx";
import { generatePoster } from "./utils/api.js";
import { WATERMARK } from "./utils/config.js";

export default function App() {
  const [posterData, setPosterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (task) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generatePoster(task);
      setPosterData(data);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageBackdrop />
      <div className="app">
        {/* left-col holds the title/form — stays put on desktop, and on
            mobile just behaves like a normal full-width block (no visual
            change from before, since .app was already a centered column). */}
        <div className="left-col">
          <h1>Mundane to Cinema 🎬</h1>
          <p className="subtitle">
            Turn your boring day into a prestige TV drama.
          </p>
          <InputForm onGenerate={handleGenerate} loading={loading} />
          {error && <p className="error">{error}</p>}
        </div>
        {/* right-col only ever holds the poster. Empty until generated —
            on desktop this reserves the right side of the screen for it;
            on mobile it just sits below the form like before. */}
        <div className="right-col">
          {posterData && <Poster data={posterData} watermark={WATERMARK} />}
        </div>
      </div>
    </>
  );
}
