import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { typeColorMap } from "@/pages/CardsList/constants";
import { IAttack } from "@/services/http/types";

interface AttackDialogProps {
	attack: IAttack;
}

const AttackDialog = ({ attack }: AttackDialogProps) => {
	return (
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
	);
};

export { AttackDialog };
