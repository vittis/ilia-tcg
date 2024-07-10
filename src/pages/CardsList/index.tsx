import { useSearchParams } from "react-router-dom";
import { NavigablePagination } from "@/components/shared/NavigablePagination/NavigablePagination";
import { CardsListEmptyState } from "./components/CardsListEmptyState";
import { CardsListErrorState } from "./components/CardsListErrorState";
import { CardsListLoadingState } from "./components/CardsListLoadingState";
import { ListCard } from "./components/ListCard";
import { useSearchCards } from "@/services/hooks/useSearchCards";
import { SearchInput } from "./components/SearchInput";
import { CardsCarousel } from "./components/CardsCarousel";
import { Skeleton } from "@/components/ui/skeleton";

const CardsList = () => {
	const [searchParams] = useSearchParams();
	const currentPage = searchParams.get("page") || "1";
	const searchQuery = searchParams.get("q") || "";

	const { data, isLoading, error } = useSearchCards(searchQuery, currentPage);
	const hasResult = data?.data?.length === 0;

	return (
		<section className="my-10">
			<SearchInput />

			{!error && (
				<div className="ml-1 mt-4 text-zinc-200">
					Found <span className="font-mono text-yellow-400">{data?.totalCount || 0}</span> cards.
					Showing <span className="font-mono text-yellow-400">{data?.count || 0}</span>.
				</div>
			)}

			{!error && !hasResult && (
				<div className="hidden md:block">
					<NavigablePagination
						currentPage={Number(currentPage)}
						totalCount={data?.totalCount}
						pageSize={data?.pageSize}
						isLoading={isLoading}
					/>
				</div>
			)}

			{hasResult && <CardsListEmptyState />}
			{error && <CardsListErrorState />}

			<div className="hidden grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-8 py-10 md:grid">
				{isLoading && <CardsListLoadingState />}

				{data?.data && data.data.map(card => <ListCard key={card.id} card={card} />)}
			</div>

			<div className="mt-10 block md:hidden">
				{isLoading && <Skeleton className="h-[200px] w-full" />}
				{data?.data && <CardsCarousel cards={data?.data} />}
			</div>

			{!error && !hasResult && (
				<div className="hidden md:block">
					<NavigablePagination
						currentPage={Number(currentPage)}
						totalCount={data?.totalCount}
						pageSize={data?.pageSize}
						isLoading={isLoading}
					/>
				</div>
			)}
		</section>
	);
};

export { CardsList };
