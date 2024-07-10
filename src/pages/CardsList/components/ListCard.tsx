import { cn } from "@/lib/utils";
import { typeColorMap } from "@/pages/CardsList/constants";
import { Card } from "@/services/http/types";
import { Link } from "react-router-dom";

interface ListCardProps {
	card: Card;
}

const ListCard = ({ card }: ListCardProps) => {
	return (
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
	);
};

export { ListCard };
