import { Nav } from "@/components/shared/Nav/Nav";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<main className="container mx-auto pt-6">
			{/* Theme toggle: Working but need to adjust light mode CSS. Removed due to time constraints */}
			{/* <div className="absolute right-4 top-4">
				<ModeToggle />
			</div> */}

			<Nav />

			<Outlet />
		</main>
	);
};

export { RootLayout };
