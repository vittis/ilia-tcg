import { cn } from "@/lib/utils";

export function Nav() {
	return (
		<div className={cn("flex flex-col items-center justify-center")}>
			<div className="text-glow text-5xl font-bold italic text-yellow-400">Pokemon TCG</div>
			<div className="text-glow mt-2 text-sm font-bold text-zinc-100">
				⚡ Search your favorite cards ⚡
			</div>
		</div>
	);
}
