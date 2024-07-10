import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import { Card } from "@/services/http/types";
import { ListCard } from "./ListCard";

interface CardsCarouselProps {
	cards: Card[];
}

const CardsCarousel = ({ cards }: CardsCarouselProps) => {
	return (
		<Carousel className="mx-auto w-full max-w-xs">
			<CarouselContent>
				{cards.map(card => (
					<CarouselItem key={card.id}>
						<ListCard card={card} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};

export { CardsCarousel };
