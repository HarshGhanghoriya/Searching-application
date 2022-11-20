import "./App.css";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

function App() {
  const [movie, setMovie] = useState();
  const [error, setError] = useState();
  const handleCall = async (search) => {
    let Top250Movies = await fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${search}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "9054a624d1msh17b5c437cd34f70p1a6bdbjsnb1dcc6c4eed5",
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())

      .catch((error) => {
        console.error("Error:", error);
      })
      .then((data) => {
        console.log("Success:", data);
        setMovie(data);
        setError(data.errorMessage);
      });
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

  const handleReset = () => {
    setMovie("");
    setError();
  };

  return (
    <div>
      <header>
        <p>Click Button to get image</p>
        <input
          type="text"
          onChange={debounce((e) => handleCall(e.target.value), 1000)}
        ></input>
        {/* <button
          style={{ marginRight: "10px", marginBottom: "15px" }}
          onClick={() => handleCall(search)}
        >
          Learn React
        </button> */}
        <button onClick={() => handleReset()}> Reset</button>

        <Grid container>
          {Array.isArray(movie) &&
            movie.map((item) => (
              <Grid item xs={12} md={4} lg={3}>
                <img
                  style={{ width: "300px", height: "300px" }}
                  src={item.image}
                />

                <input type="text" value={item.title}></input>
              </Grid>
            ))}
          {error?.length === "0" ? "" : <div>{error}</div>}
        </Grid>
      </header>
    </div>
  );
}

export default App;
