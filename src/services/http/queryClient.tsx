import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AlertCircleIcon, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		// @ts-expect-error cant get exact error type
		onError: (error: AxiosError<any>) => {
			const errorReason =
				error?.response?.data?.message ||
				error?.response?.data?.error?.message ||
				error?.message ||
				"Internal server error";

			toast.error(`Error at ${error?.config?.url}: ${errorReason}`, {
				icon: AlertTriangle,
			});
		},
	}),
	mutationCache: new MutationCache({
		/* onSuccess: () => {
      toast.success("Operation successful");
    }, */
		onError: (error: any) => {
			const errorReason =
				error?.response?.data?.message ||
				error?.response?.data?.error?.message ||
				error?.message ||
				"Internal server error";

			toast.error(`Error at ${error?.config?.url}: ${errorReason}`, {
				icon: () => <AlertCircleIcon className="w-6 text-red-500" />,
			});
		},
	}),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			/* refetchOnMount: false, */
			staleTime: 10000,
			retry: false,
		},
	},
});

export { queryClient };
