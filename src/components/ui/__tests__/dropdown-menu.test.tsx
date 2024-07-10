import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup,
} from "../dropdown-menu";

describe("DropdownMenu", () => {
	it("renders the dropdown menu trigger", () => {
		render(
			<DropdownMenu>
				<DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Item 1</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>,
		);

		expect(screen.getByText("Open Menu")).toBeInTheDocument();
	});

	it("opens the dropdown menu when trigger is clicked", () => {
		render(
			<DropdownMenu>
				<DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Item 1</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>,
		);

		const trigger = screen.getByText("Open Menu");
		fireEvent.click(trigger);

		waitFor(() => {
			expect(screen.getByText("Item 1")).toBeInTheDocument();
		});
	});

	it("renders checkbox item correctly", () => {
		render(
			<DropdownMenu>
				<DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuCheckboxItem checked>Item 1</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>,
		);

		const trigger = screen.getByText("Open Menu");
		fireEvent.click(trigger);

		waitFor(() => {
			const item = screen.getByText("Item 1");
			expect(item).toBeInTheDocument();
			expect(item).toHaveClass("focus:bg-accent focus:text-accent-foreground");
		});
	});

	it("renders radio item correctly", () => {
		render(
			<DropdownMenu>
				<DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuRadioGroup value="item1">
						<DropdownMenuRadioItem value="item1">Item 1</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="item2">Item 2</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>,
		);

		const trigger = screen.getByText("Open Menu");
		fireEvent.click(trigger);

		waitFor(() => {
			const item = screen.getByText("Item 1");
			expect(item).toBeInTheDocument();
			expect(item).toHaveClass("focus:bg-accent focus:text-accent-foreground");
		});
	});

	it("renders sub menu correctly", () => {
		render(
			<DropdownMenu>
				<DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem>Sub Item 1</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				</DropdownMenuContent>
			</DropdownMenu>,
		);

		const trigger = screen.getByText("Open Menu");
		fireEvent.click(trigger);

		waitFor(() => {
			const subTrigger = screen.getByText("Sub Menu");
			expect(subTrigger).toBeInTheDocument();

			fireEvent.mouseOver(subTrigger);

			const subItem = screen.getByText("Sub Item 1");
			expect(subItem).toBeInTheDocument();
		});
	});
});
