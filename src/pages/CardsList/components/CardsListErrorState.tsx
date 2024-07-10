import { AlertCircle } from "lucide-react";

const CardsListErrorState = () => {
	return (
		<div className="text-glow mt-8 flex gap-2 text-3xl">
			<AlertCircle className="text-red-600" size={38} /> Something went wrong with your search...
		</div>
	);
};

export { CardsListErrorState };
