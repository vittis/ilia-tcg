import { useQuery } from "@tanstack/react-query";
import { Card } from "../http/types";
import { api } from "../http/axios";

const fetchCard = async (id: string) => {
	const { data } = await api.get(`/cards/${id}`);
	return data;
};

export function useCardDetails(cardId: string) {
	return useQuery<{ data: Card }>({
		queryKey: ["cards", "details", cardId],
		queryFn: () => fetchCard(cardId),
	});
}
