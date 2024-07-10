import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles/main.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/http/queryClient.tsx";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import { ThemeProvider } from "./services/context/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="dark" storageKey="ui-theme">
				<ToastContainer
					position="bottom-left"
					theme="dark"
					toastClassName="border"
					draggablePercent={30}
					stacked
					hideProgressBar={false}
				/>
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
