import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const SearchInput = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get("q") || "";

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current?.focus();
			inputRef.current.value = searchQuery;
		}
	}, []);

	const debouncedSetQuery = debounce(e => {
		setSearchParams({ page: "1", q: e.target.value });
	}, 400);

	return <Input ref={inputRef} onChange={debouncedSetQuery} placeholder="Search card by name" />;
};

export { SearchInput };
