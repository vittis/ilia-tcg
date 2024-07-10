import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useCardDetails } from "@/services/hooks/useCardDetails";
import { CardDetailsErrorState } from "./components/CardDetailsErrorState";
import { CardDetailsLoadingState } from "./components/CardDetailsLoadingState";
import { CardDetail } from "./components/CardDetail";

const CardDetails = () => {
	const { cardId } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, error } = useCardDetails(cardId!);

	const card = data?.data;

	return (
		<div className="mt-10">
			<div className="mb-6 flex items-center justify-center">
				<Button variant="outline" onClick={() => navigate(-1)}>
					<ChevronLeft className="h-[1.2rem] w-[1.2rem]" /> Browse Cards
					<span className="sr-only">Go back</span>
				</Button>
			</div>

			{isLoading && <CardDetailsLoadingState />}
			{error && <CardDetailsErrorState />}

			{card && <CardDetail card={card} />}
		</div>
	);
};

export { CardDetails };
