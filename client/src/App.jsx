import { useState } from "react";
import axios from "axios";

function App() {
  const [jd, setJd] = useState("");
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jd || files.length === 0) return alert("Please provide JD and resumes");

    const formData = new FormData();
    formData.append("jd", jd);
    for (let file of files) formData.append("resumes", file);

    try {
      const res = await axios.post("http://localhost:5000/api/match", formData);
      setResults(res.data.matches);
    } catch (err) {
      alert("Error matching resumes");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-center">AI Resume Screener</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Paste Job Description..."
            className="w-full border p-3 rounded h-32"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={(e) => setFiles([...e.target.files])}
            className="block w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Match Resumes
          </button>
        </form>

        {results.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Top Matches:</h2>
            <ul className="list-disc pl-6 space-y-2">
              {results.map((r, idx) => (
                <li key={idx}>
                  <strong>{r.name}</strong> — Score: {r.score}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
