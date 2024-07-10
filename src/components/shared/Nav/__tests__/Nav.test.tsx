import { render, screen } from "@testing-library/react";
import { Nav } from "../Nav";
import { BrowserRouter } from "react-router-dom";

describe("Nav", () => {
	it("matches snapshot", () => {
		const { container } = render(
			<BrowserRouter>
				<Nav />
			</BrowserRouter>,
		);

		expect(container).toMatchSnapshot();
	});

	it("should render nav header title", () => {
		render(
			<BrowserRouter>
				<Nav />
			</BrowserRouter>,
		);

		expect(screen.getByText("Pokemon TCG")).toBeDefined();
	});
});
