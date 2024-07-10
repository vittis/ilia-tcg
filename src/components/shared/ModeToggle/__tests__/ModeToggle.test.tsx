import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ModeToggle } from "../ModeToggle";

describe("ModeToggle", () => {
	it("matches snapshot", () => {
		const { container } = render(<ModeToggle />);

		expect(container).toMatchSnapshot();
	});

	it("should click and open dropdown", () => {
		render(<ModeToggle />);

		fireEvent.click(screen.getByRole("button"));

		waitFor(() => {
			expect(screen.getByRole("menu")).toBeDefined();
		});
	});
});
