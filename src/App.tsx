import { useQuery } from "@tanstack/react-query";
import { api } from "./services/http/axios";

const fetchCards = async () => {
	return await api.get("/cards");
};

function App() {
	const { data } = useQuery({ queryKey: ["cards"], queryFn: fetchCards });

	console.log(data);

	return (
		<>
			<div className="text-3xl text-blue-500">Tailwind test</div>
		</>
	);
}

export default App;
