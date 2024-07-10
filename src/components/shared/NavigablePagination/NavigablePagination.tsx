import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationButton,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";

interface NavigablePaginationProps {
	currentPage: number;
	isLoading: boolean;
	totalCount?: number;
	pageSize?: number;
}

const NavigablePagination = ({
	currentPage,
	totalCount = 0,
	pageSize = 0,
	isLoading,
}: NavigablePaginationProps) => {
	let [_, setSearchParams] = useSearchParams();

	/* Needed to maintain last total pages when search query changes */
	const lastTotalPagesRef = useRef(0);

	const totalPages = totalCount ? Math.ceil(totalCount / pageSize) : lastTotalPagesRef.current;

	useEffect(() => {
		lastTotalPagesRef.current = totalPages;
	}, [totalPages]);

	const paginationItems = useMemo(() => {
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => (
				<PaginationItem key={i + 1}>
					<PaginationButton
						disabled={isLoading}
						isActive={currentPage === i + 1}
						onClick={() => setSearchParams({ page: (i + 1).toString() })}
					>
						{i + 1}
					</PaginationButton>
				</PaginationItem>
			));
		} else {
			const middlePages = Array.from(
				{ length: Math.min(totalPages - 2, 3) },
				(_, i) => currentPage - 1 + i,
			).filter(page => page > 1 && page < totalPages);

			return [
				<PaginationItem key={1}>
					<PaginationButton
						disabled={isLoading}
						isActive={currentPage === 1}
						onClick={() => setSearchParams({ page: "1" })}
					>
						1
					</PaginationButton>
				</PaginationItem>,
				currentPage > 3 && (
					<PaginationItem key="ellipsis1">
						<PaginationEllipsis />
					</PaginationItem>
				),
				...middlePages.map(page => (
					<PaginationItem key={page}>
						<PaginationButton
							disabled={isLoading}
							isActive={currentPage === page}
							onClick={() => setSearchParams({ page: page.toString() })}
						>
							{page}
						</PaginationButton>
					</PaginationItem>
				)),
				currentPage < totalPages - 2 && (
					<PaginationItem key="ellipsis2">
						<PaginationEllipsis />
					</PaginationItem>
				),
				<PaginationItem key={totalPages}>
					<PaginationButton
						disabled={isLoading}
						isActive={currentPage === totalPages}
						onClick={() => setSearchParams({ page: totalPages.toString() })}
					>
						{totalPages}
					</PaginationButton>
				</PaginationItem>,
			].filter(Boolean);
		}
	}, [currentPage, isLoading, totalPages, setSearchParams]);

	return (
		<Pagination className="mt-10">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						disabled={currentPage === 1 || isLoading}
						onClick={() => setSearchParams({ page: `${currentPage - 1}` })}
					/>
				</PaginationItem>

				{paginationItems}

				<PaginationItem>
					<PaginationNext
						disabled={currentPage === totalPages || isLoading}
						onClick={() => setSearchParams({ page: `${currentPage + 1}` })}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export { NavigablePagination };
