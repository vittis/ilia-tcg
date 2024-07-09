import { ModeToggle } from "@/components/mode-toggle";
import { Nav } from "@/components/shared/Nav/Nav";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<main className="container mx-auto pt-6">
			<div className="absolute right-4 top-4">
				<ModeToggle />
			</div>
			<Nav />

			<Outlet />
		</main>
	);
};

export { RootLayout };
