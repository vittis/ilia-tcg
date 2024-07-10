import { Frown } from "lucide-react";

const CardsListEmptyState = () => {
	return (
		<div className="text-glow mt-8 flex gap-2 text-3xl">
			<Frown className="text-red-400" size={40} />
			No results were found...
		</div>
	);
};

export { CardsListEmptyState };
