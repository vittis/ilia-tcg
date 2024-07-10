import { useQuery } from "@tanstack/react-query";
import { Card } from "../http/types";
import { api } from "../http/axios";

interface CardSearchQuery {
	data: Card[];
	page: number;
	pageSize: number;
	totalCount: number;
	count: number;
}

const fetchCards = async (searchQuery: string, page: string) => {
	const nameParams = searchQuery ? { q: `name:${searchQuery}*` } : {};

	const { data } = await api.get("/cards", {
		params: {
			page,
			...nameParams,
		},
	});
	return data;
};

export function useSearchCards(searchQuery: string, currentPage: string) {
	return useQuery<CardSearchQuery>({
		queryKey: ["cards", "all", searchQuery, currentPage],
		queryFn: () => fetchCards(searchQuery, currentPage),
	});
}
