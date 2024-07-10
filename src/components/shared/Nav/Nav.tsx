import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Nav() {
	const { t } = useTranslation();

	return (
		<div className={cn("flex flex-col items-center justify-center")}>
			<Link to="/" className="text-glow text-3xl font-bold italic text-yellow-400 md:text-5xl">
				Pokemon TCG
			</Link>
			<div className="text-glow mt-2 text-sm font-bold text-zinc-100">{t("nav.subtitle")}</div>
		</div>
	);
}
