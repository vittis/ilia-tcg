import { cn } from "@/lib/utils";
import { api } from "@/services/http/axios";
import { Card } from "@/services/http/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { typeColorMap } from "../CardsList/CardsList";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

const fetchCard = async (id: string) => {
	const { data } = await api.get(`/cards/${id}`);
	return data;
};

const CardDetails = () => {
	const { cardId } = useParams();
	const navigate = useNavigate();
	const { data, isLoading } = useQuery<{ data: Card }>({
		queryKey: ["cards", "details", cardId],
		queryFn: () => fetchCard(cardId!),
	});

	const card = data?.data;

	console.log(card);

	return (
		<div className="mt-10">
			<div className="mb-6 flex items-center justify-center">
				<Button variant="outline" onClick={() => navigate(-1)}>
					<ChevronLeft className="h-[1.2rem] w-[1.2rem]" /> Go back to cards
					<span className="sr-only">Go back</span>
				</Button>
			</div>
			{isLoading && (
				<div className="flex flex-col items-center gap-4">
					<Skeleton className="h-[400px] w-[300px]" />
				</div>
			)}
			{card && (
				<div className="flex flex-col items-center">
					<div className="text-glow text-zinc-200x' mb-6 text-6xl">{card.name}</div>

					<img className="mb-2 h-[400px]" src={card.images.large} alt={card.name} />
					<div className="mb-2 flex flex-wrap items-baseline gap-2">
						<span className="text-xl">Type: </span>

						{card.types &&
							card.types.map(type => (
								<div
									key={type}
									className={cn("font-mono text-lg text-lime-400", typeColorMap?.[type])}
								>
									{type}
								</div>
							))}
					</div>
					<div className="flex items-baseline gap-2">
						<span className="text-xl">Resistances: </span>
						{(!card.resistances || card.resistances?.length === 0) && (
							<span className="font-sm font-mono text-gray-300">No resistances</span>
						)}
						{card.resistances &&
							card.resistances.map(resistance => (
								<span
									key={resistance.type}
									className={cn("font-mono", typeColorMap?.[resistance.type])}
								>
									{resistance.type} ({resistance.value})
								</span>
							))}
					</div>

					<div className="mt-2 flex items-baseline gap-2">
						<span className="text-xl">Weakness: </span>
						{(!card.weaknesses || card.weaknesses?.length === 0) && (
							<span className="font-sm font-mono text-gray-300">No resistances</span>
						)}
						{card.weaknesses &&
							card.weaknesses.map(weakness => (
								<span
									key={weakness.type}
									className={cn("font-mono", typeColorMap?.[weakness.type])}
								>
									{weakness.type} ({weakness.value})
								</span>
							))}
					</div>

					{card.attacks && card.attacks.length > 0 && (
						<div className="mt-3 flex items-center gap-2">
							<div className="text-xl">Attacks:</div>
							{card.attacks.map(attack => (
								<Dialog key={attack.name}>
									<DialogTrigger asChild>
										<Button key={attack.name} size="sm" variant="outline">
											{attack.name}
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px]">
										<DialogHeader>
											<DialogTitle>{attack.name}</DialogTitle>
											<DialogDescription>{attack.text}</DialogDescription>
										</DialogHeader>

										<div className="flex items-baseline gap-2">
											Cost:{" "}
											{attack.cost.map(cost => (
												<span key={cost} className={cn("font-mono text-sm", typeColorMap?.[cost])}>
													{cost}
												</span>
											))}
										</div>

										{attack.damage && (
											<div className="flex items-baseline gap-2">
												Damage: <span className="text-2xl text-red-500">{attack.damage}</span>
											</div>
										)}
									</DialogContent>
								</Dialog>
							))}
						</div>
					)}

					<div className="font-xs mb-10 mt-10 font-mono text-zinc-300">Card ID: {card.id}</div>
				</div>
			)}
		</div>
	);
};

export { CardDetails };
