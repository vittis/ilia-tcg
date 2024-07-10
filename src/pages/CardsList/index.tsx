import { useSearchParams } from "react-router-dom";
import { NavigablePagination } from "@/components/shared/NavigablePagination/NavigablePagination";
import { CardsListEmptyState } from "./components/CardsListEmptyState";
import { CardsListErrorState } from "./components/CardsListErrorState";
import { CardsListLoadingState } from "./components/CardsListLoadingState";
import { ListCard } from "./components/ListCard";
import { useSearchCards } from "@/services/hooks/useSearchCards";
import { SearchInput } from "./components/SearchInput";

const CardsList = () => {
	const [searchParams] = useSearchParams();
	const currentPage = searchParams.get("page") || "1";
	const searchQuery = searchParams.get("q") || "";

	const { data, isLoading, error } = useSearchCards(searchQuery, currentPage);
	const hasResult = data?.data?.length === 0;

	return (
		<section className="my-10">
			<SearchInput />

			{!error && !hasResult && (
				<NavigablePagination
					currentPage={Number(currentPage)}
					totalCount={data?.totalCount}
					pageSize={data?.pageSize}
					isLoading={isLoading}
				/>
			)}

			{hasResult && <CardsListEmptyState />}
			{error && <CardsListErrorState />}

			<div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-8 py-10">
				{isLoading && <CardsListLoadingState />}

				{data?.data && data.data.map(card => <ListCard key={card.id} card={card} />)}
			</div>

			{!error && !hasResult && (
				<NavigablePagination
					currentPage={Number(currentPage)}
					totalCount={data?.totalCount}
					pageSize={data?.pageSize}
					isLoading={isLoading}
				/>
			)}
		</section>
	);
};

export { CardsList };
