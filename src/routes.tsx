import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "./pages/RootLayout";
import { CardsList } from "./pages/CardsList/CardsList";
import { CardDetails } from "./pages/CardDetails/CardDetails";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Navigate to="cards" replace />,
			},
			{
				path: "cards",
				element: <CardsList />,
			},
			{
				path: "cards/:cardId",
				element: <CardDetails />,
			},
		],
	},
]);
