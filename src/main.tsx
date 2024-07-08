import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles/main.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/http/queryClient.tsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ToastContainer
				position="bottom-left"
				theme="dark"
				toastClassName="border"
				draggablePercent={30}
				stacked
				hideProgressBar={false}
			/>
			<App />
		</QueryClientProvider>
	</React.StrictMode>,
);
