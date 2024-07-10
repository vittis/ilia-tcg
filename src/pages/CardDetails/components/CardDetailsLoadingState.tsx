import { Skeleton } from "@/components/ui/skeleton";

const CardDetailsLoadingState = () => {
	return (
		<div className="flex flex-col items-center gap-4">
			<Skeleton className="h-[400px] w-[300px]" />
		</div>
	);
};

export { CardDetailsLoadingState };
