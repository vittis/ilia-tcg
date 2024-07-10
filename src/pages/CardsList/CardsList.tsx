import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/http/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/services/http/types";
import { cn } from "@/lib/utils";
import { Link, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import debounce from "lodash.debounce";
import { AlertCircle, Frown } from "lucide-react";
import { NavigablePagination } from "@/components/shared/NavigablePagination/NavigablePagination";

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

const CardsList = () => {
	let [searchParams, setSearchParams] = useSearchParams();
	const currentPage = searchParams.get("page") || "1";

	const [searchQuery, setSearchQuery] = useState("");

	const { data, isLoading, error } = useQuery<CardSearchQuery>({
		queryKey: ["cards", "all", searchQuery, currentPage],
		queryFn: () => fetchCards(searchQuery, currentPage),
	});

	const debouncedSetQuery = debounce(e => {
		setSearchQuery(e.target.value);
		setSearchParams({ page: "1" });
	}, 400);

	const isEmptyResult = data?.data?.length === 0;

	return (
		<section className="my-10">
			<Input onChange={debouncedSetQuery} placeholder="Search card by name" />

			<NavigablePagination
				currentPage={Number(currentPage)}
				totalCount={data?.totalCount}
				pageSize={data?.pageSize}
				isLoading={isLoading}
			/>

			{isEmptyResult && (
				<div className="text-glow mt-8 flex gap-2 text-3xl">
					<Frown className="text-red-400" size={40} />
					No results were found...
				</div>
			)}
			{error && (
				<div className="text-glow mt-8 flex gap-2 text-3xl">
					<AlertCircle className="text-red-400" size={40} /> Something went wrong with your
					search...
				</div>
			)}
			<div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-8 py-10">
				{isLoading &&
					Array.from(Array(21)).map((_, index) => (
						<Skeleton key={index} className="h-[150px] w-[290px] lg:h-[200px] lg:w-[410px]" />
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
