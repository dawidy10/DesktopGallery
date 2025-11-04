import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<nav className="border-b-1 h-10 flex justify-between items-center fixed w-[100%] px-4 bg-background">
			<p>Desktop Gallery</p>
			<div className="flex butoaneFereastra">
				<button onClick={() => window.api.minimize()}>_</button>
				<button onClick={() => window.api.maximize()}>^</button>
				<button onClick={() => window.api.close()}>X</button>
			</div>
		</nav>
		<App />

		<SidebarProvider>
			<AppSidebar />
			<SidebarTrigger />
		</SidebarProvider>
	</StrictMode>,
);
