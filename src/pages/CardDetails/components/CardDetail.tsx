import { cn } from "@/lib/utils";
import { Card } from "@/services/http/types";
import { typeColorMap } from "@/pages/CardsList/constants";
import { AttackDialog } from "./AttackDialog";

interface CardDetailProps {
	card: Card;
}

const CardDetail = ({ card }: CardDetailProps) => {
	return (
		<div className="flex flex-col items-center">
			<div className="text-glow text-zinc-200x' mb-6 text-6xl">{card.name}</div>

			<img className="mb-2 h-[400px]" src={card.images.large} alt={card.name} />
			<div className="mb-2 flex flex-wrap items-baseline gap-2">
				<span className="text-xl">Type: </span>

				{card.types &&
					card.types.map(type => (
						<div key={type} className={cn("font-mono text-lg text-lime-400", typeColorMap?.[type])}>
							{type}
						</div>
					))}
			</div>

			{/* todo: could componentize some of these sections */}
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
						<span key={weakness.type} className={cn("font-mono", typeColorMap?.[weakness.type])}>
							{weakness.type} ({weakness.value})
						</span>
					))}
			</div>

			{card.attacks && card.attacks.length > 0 && (
				<div className="mt-3 flex items-center gap-2">
					<div className="text-xl">Attacks:</div>
					{card.attacks.map(attack => (
						<AttackDialog attack={attack} />
					))}
				</div>
			)}

			<div className="font-xs mb-10 mt-10 font-mono text-zinc-300">Card ID: {card.id}</div>
		</div>
	);
};

export { CardDetail };
