import { createSignal, type Component } from "solid-js";
import "./DownloadRecipe.css";
import { handleMouseEvent } from "@/utils/handlers";

type State = "online" | "loading" | number;

export const DownloadRecipe = () => {
  const [state, setState] = createSignal<State>("loading");
  const handleClick = handleMouseEvent(() => {
    if (state() === "online") {
      setState(500);
    } else {
      setState("online");
    }
  });

  return (
    <button onClick={handleClick} class="download-recipe">
      {state() === "online"
        ? "Download"
        : state() === "loading"
        ? "Loading..."
        : `${state()}kb [x]`}
    </button>
  );
};
