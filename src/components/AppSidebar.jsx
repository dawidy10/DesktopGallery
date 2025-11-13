import { Folder } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
// const items = [
// 	{
// 		title: "Home",
// 		url: "#",
// 		icon: Home,
// 	},
// 	{
// 		title: "Inbox",
// 		url: "#",
// 		icon: Inbox,
// 	},
// 	{
// 		title: "Calendar",
// 		url: "#",
// 		icon: Calendar,
// 	},
// 	{
// 		title: "Search",
// 		url: "#",
// 		icon: Search,
// 	},
// 	{
// 		title: "Settings",
// 		url: "#",
// 		icon: Settings,
// 	},
// ];

export function AppSidebar() {
	return (
		<Sidebar className="mt-10">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Spaces</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/">
										<Folder />
										<span>Folder 1</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/">
										<Folder />
										<span>Folder 2</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/">
										<Folder />
										<span>Folder 3</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							{/* {items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))} */}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
