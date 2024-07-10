import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Nav() {
	return (
		<div className={cn("flex flex-col items-center justify-center")}>
			<Link to="/" className="text-glow text-5xl font-bold italic text-yellow-400">
				Pokemon TCG
			</Link>
			<div className="text-glow mt-2 text-sm font-bold text-zinc-100">
				⚡ Search your favorite cards ⚡
			</div>
		</div>
	);
}
