import { render, screen } from "@testing-library/react";
import { NavigablePagination } from "../NavigablePagination";
import { BrowserRouter } from "react-router-dom";

describe("NavigablePaginationigablePagination", () => {
	it("matches snapshot", () => {
		const { container } = render(
			<BrowserRouter>
				<NavigablePagination currentPage={1} isLoading={false} pageSize={250} totalCount={2500} />,
			</BrowserRouter>,
		);

		expect(container).toMatchSnapshot();
	});

	it("should render correct pages number of when currentPage=1", () => {
		render(
			<BrowserRouter>
				<NavigablePagination currentPage={1} isLoading={false} pageSize={250} totalCount={2500} />
			</BrowserRouter>,
		);

		expect(screen.getAllByRole("button")).toHaveLength(5);
	});

	it("should render correct number of pages when currentPage is in middle", () => {
		render(
			<BrowserRouter>
				<NavigablePagination currentPage={8} isLoading={false} pageSize={250} totalCount={2500} />
			</BrowserRouter>,
		);

		expect(screen.getAllByRole("button")).toHaveLength(7);
	});

	it("should render correct number of pages when currentPage is last", () => {
		render(
			<BrowserRouter>
				<NavigablePagination currentPage={10} isLoading={false} pageSize={250} totalCount={2500} />
			</BrowserRouter>,
		);

		expect(screen.getAllByRole("button")).toHaveLength(5);
	});
});
