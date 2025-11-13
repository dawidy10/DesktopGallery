import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";
import { X } from "lucide-react";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<nav className="border-b-1 h-10 flex justify-between items-center fixed w-[100vw] px-4 bg-background">
			<p>Desktop Gallery</p>
			<div className="flex butoaneFereastra">
				<Button variant="ghost" size="icon" onClick={() => window.api.minimize()}>
					_
				</Button>
				<Button variant="ghost" size="icon" onClick={() => window.api.maximize()}>
					<Maximize />
				</Button>
				<Button variant="ghost" size="icon" onClick={() => window.api.close()}>
					<X />
				</Button>
			</div>
		</nav>
		<App />

		<SidebarProvider>
			<AppSidebar />
			<SidebarTrigger />
		</SidebarProvider>
	</StrictMode>,
);
