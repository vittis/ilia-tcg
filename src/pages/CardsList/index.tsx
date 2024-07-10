import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import debounce from "lodash.debounce";
import { NavigablePagination } from "@/components/shared/NavigablePagination/NavigablePagination";
import { CardsListEmptyState } from "./components/CardsListEmptyState";
import { CardsListErrorState } from "./components/CardsListErrorState";
import { CardsListLoadingState } from "./components/CardsListLoadingState";
import { ListCard } from "./components/ListCard";
import { useSearchCards } from "@/services/hooks/useSearchCards";

const CardsList = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = searchParams.get("page") || "1";

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSetQuery = debounce(e => {
		setSearchQuery(e.target.value);
		setSearchParams({ page: "1" });
	}, 400);

	const { data, isLoading, error } = useSearchCards(searchQuery, currentPage);
	const hasResult = data?.data?.length === 0;

	return (
		<section className="my-10">
			<Input onChange={debouncedSetQuery} placeholder="Search card by name" />

			<NavigablePagination
				currentPage={Number(currentPage)}
				totalCount={data?.totalCount}
				pageSize={data?.pageSize}
				isLoading={isLoading}
			/>

			{hasResult && <CardsListEmptyState />}
			{error && <CardsListErrorState />}

			<div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-8 py-10">
				{isLoading && <CardsListLoadingState />}

				{data?.data && data.data.map(card => <ListCard key={card.id} card={card} />)}
			</div>

			<NavigablePagination
				currentPage={Number(currentPage)}
				totalCount={data?.totalCount}
				pageSize={data?.pageSize}
				isLoading={isLoading}
			/>
		</section>
	);
};

export { CardsList };
