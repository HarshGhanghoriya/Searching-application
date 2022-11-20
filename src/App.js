import "./App.css";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "./index.css";

function App() {
  const [movie, setMovie] = useState();
  const [error, setError] = useState();
  const option = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9054a624d1msh17b5c437cd34f70p1a6bdbjsnb1dcc6c4eed5",
      "X-RapidAPI-Host": "bloomberg-market-and-financial-news.p.rapidapi.com",
    },
  };
  const handleCall = async (search) => {
    if (search !== "") {
      let Top250Movies = await fetch(
        `https://bloomberg-market-and-financial-news.p.rapidapi.com/market/auto-complete?query=${search}`,
        option
      )
        .then((response) => response?.json())

        .catch((err) => console.log("Error:", err))
        .then((response) => {
          console.log("Success:", response);
          setMovie(response?.news);
        });
    }
  };
  const debounce = (handleCall, wait) => {
    let timeout;

    return function searchFunctin(...args) {
      const speedSearch = () => {
        timeout = null;
        handleCall(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(speedSearch, wait);
    };
  };
  useEffect(() => debounce((india) => handleCall(india), 1000), []);
  const handleReset = () => {
    setMovie("");
    setError();
  };

  return (
    <div>
      <header >
      <div className="Text">Search your favourite financial news</div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "10px",
            background:"#f4f5f7",
            marginTop:"5px"
          }}
        >
          
          <input
            type="text"
            className="width"
            onChange={debounce((e) => handleCall(e.target.value), 1000)}
          ></input>

          <button onClick={() => handleReset()}> Reset</button>
        </div>
        <Grid container>
          {Array.isArray(movie) &&
            movie.map((item) => (
              <Grid item xs={12} md={6} lg={4}>
                <div style={{ marginBottom: "3px" }}>{item?.title}</div>
                <div style={{ marginBottom: "5px" }}>
                  <a href={item?.longURL} target="_blank">
                    {" "}
                    click me to show details
                  </a>
                </div>
              </Grid>
            ))}
          {error?.length === "0" ? "" : <div>{error}</div>}
        </Grid>
      </header>
    </div>
  );
}

export default App;
