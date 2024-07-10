import { Skeleton } from "@/components/ui/skeleton";

const CardsListLoadingState = () => {
	return Array.from(Array(21)).map((_, index) => (
		<Skeleton key={index} className="h-[150px] w-[290px] lg:h-[200px] lg:w-[410px]" />
	));
};

export { CardsListLoadingState };
