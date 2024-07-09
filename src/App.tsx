import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/http/axios";
import { Nav } from "@/components/shared/Nav/Nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Card } from "./services/http/types";
import { cn } from "./lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const typeColorMap = {
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

const fetchCards = async () => {
	const { data } = await api.get("/cards");
	return data;
};

function App() {
	const { data, isLoading } = useQuery({ queryKey: ["cards"], queryFn: fetchCards });

	console.log(data);

	return (
		<main className="container mx-auto pt-6">
			<div className="absolute right-4 top-4">
				<ModeToggle />
			</div>
			<Nav />

			<div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-8 py-10">
				{isLoading &&
					Array.from(Array(21)).map(_ => <Skeleton key={_} className="h-[200px] w-[410px]" />)}

				{data?.data &&
					data.data.map((card: Card) => (
						<div key={card.id} className="bg-pattern relative flex rounded-xl border">
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
						</div>
					))}
			</div>

			{/* <Outlet /> */}
		</main>
	);
}

export default App;
