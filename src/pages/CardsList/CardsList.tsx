import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/http/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/services/http/types";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import debounce from "lodash.debounce";
import { AlertCircle } from "lucide-react";

export const typeColorMap = {
	Colorless: "text-zinc-300",
	Darkness: "text-zinc-400",
	Dragon: "text-teal-400",
	Fairy: "text-pink-400",
	Fighting: "text-amber-600",
	Fire: "text-red-400",
	Grass: "text-green-400",
	Lightning: "text-yellow-400",
	Metal: "text-gray-400",
	Psychic: "text-pink-400",
	Water: "text-blue-400",
} as { [key: string]: string };

const fetchCards = async (searchQuery: string) => {
	const opts = searchQuery ? { params: { q: `name:${searchQuery}*` } } : undefined;

	const { data } = await api.get("/cards", opts);
	return data;
};

const CardsList = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const { data, isLoading, error } = useQuery<{ data: Card[] }>({
		queryKey: ["cards", "all", searchQuery],
		queryFn: () => fetchCards(searchQuery),
	});

	const debouncedSetQuery = debounce(setSearchQuery, 300);

	const isEmptyResult = data?.data?.length === 0;

	return (
		<>
			<Input
				onChange={e => debouncedSetQuery(e.target.value)}
				className="mt-10"
				placeholder="Search card by name"
			/>

			{isEmptyResult && <div className="text-glow mt-8 text-3xl">No results were found...</div>}

			{error && (
				<div className="text-glow mt-8 flex gap-2 text-3xl">
					<AlertCircle className="text-red-500" size={40} /> Something went wrong with your
					search...
				</div>
			)}

			<div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-8 py-10">
				{isLoading &&
					Array.from(Array(21)).map((_, index) => (
						<Skeleton key={index} className="h-[200px] w-[410px]" />
					))}

				{data?.data &&
					data.data.map(card => (
						<Link
							key={card.id}
							to={`/cards/${card.id}`}
							className="bg-pattern relative flex rounded-xl border transition-all hover:scale-105 hover:border-yellow-400"
						>
							<img className="h-[200px]" src={card.images.small} alt={card.name} />

							<div className="py-2 pl-2 pr-6">
								<div className="text-glow text-3xl text-zinc-200">{card.name}</div>

								<div className="flex flex-wrap gap-2 pt-2">
									{card.types &&
										card.types.map(type => (
											<div
												key={type}
												className={cn("font-mono text-sm text-lime-400", typeColorMap?.[type])}
											>
												{type}
											</div>
										))}
								</div>

								<div className="absolute bottom-2 right-2">
									<div className="mt-1 font-mono text-xs text-zinc-500">{card.id}</div>
								</div>
							</div>
						</Link>
					))}
			</div>
		</>
	);
};

export { CardsList };
