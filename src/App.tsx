import { useState } from "react";
import { request } from "./request";

function App() {
  const [data, setData] = useState(null);

  async function handleClick() {
    const data = await request(async (axios) => {
      const response = await axios.get("/people/1/");
      return response.data;
    });
    setData(data);
  }

  return (
    <>
      <button onClick={handleClick}>
        Request `https://swapi.dev/api/people/1/`
      </button>
      <div>data: {data ? <pre>{JSON.stringify(data)}</pre> : "null"}</div>
    </>
  );
}

export default App;
