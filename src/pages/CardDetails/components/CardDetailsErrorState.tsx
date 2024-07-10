import { AlertCircle } from "lucide-react";

const CardDetailsErrorState = () => {
	return (
		<div className="text-glow mt-8 flex gap-2 text-3xl">
			<AlertCircle className="text-red-600" size={38} /> Could not load card...
		</div>
	);
};

export { CardDetailsErrorState };
