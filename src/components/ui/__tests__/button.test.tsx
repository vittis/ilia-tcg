import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "../button";

describe("Button", () => {
	it("matches snapshot", () => {
		const { container } = render(<Button>Click me</Button>);
		expect(container).toMatchSnapshot();
	});

	it("applies correct default styles", () => {
		render(<Button>Click me</Button>);
		const button = screen.getByRole("button", { name: /click me/i });
		expect(button).toHaveClass("bg-primary text-primary-foreground");
	});

	it("applies correct variant styles", () => {
		render(<Button variant="destructive">Delete</Button>);
		const button = screen.getByRole("button", { name: /delete/i });
		expect(button).toHaveClass("bg-destructive text-destructive-foreground");
	});

	it("applies correct size styles", () => {
		render(<Button size="lg">Large Button</Button>);
		const button = screen.getByRole("button", { name: /large button/i });
		expect(button).toHaveClass("h-11 rounded-md px-8");
	});

	it("handles click events", () => {
		const handleClick = vitest.fn();
		render(<Button onClick={handleClick}>Click me</Button>);
		fireEvent.click(screen.getByRole("button", { name: /click me/i }));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("is disabled when the disabled prop is set", () => {
		render(<Button disabled>Can't click me</Button>);
		const button = screen.getByRole("button", { name: /can't click me/i });
		expect(button).toBeDisabled();
		fireEvent.click(button);
		expect(button).toHaveClass("disabled:pointer-events-none disabled:opacity-50");
	});
});
