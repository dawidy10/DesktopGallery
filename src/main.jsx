import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<nav className="border-b-1 p-2 flex justify-between items-center">
			<p>Desktop Gallery</p>
			<div className="flex butoaneFereastra">
				<button onClick={() => window.api.minimize()}>_</button>
				<button onClick={() => window.api.maximize()}>^</button>
				<button onClick={() => window.api.close()}>X</button>
			</div>
		</nav>
		<App />
	</StrictMode>,
);
