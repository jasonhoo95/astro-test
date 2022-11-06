import ListCard from "../components/listCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Favourite() {
	const { favourites } = useSelector((state: any) => state.favourites);
	const { value } = useSelector((state: any) => state.schedule);

	const [state, setState] = useState({
		favourite: favourites,
	});

	useEffect(() => {
		console.log("schedule value", value);
	}, [value]);

	useEffect(() => {
		if (favourites) {
			setState({ favourite: favourites });
		}
		console.log(state.favourite, "favourite");
	}, [favourites]);
	return (
		<div className="max-w-[1200px] ml-auto mr-auto p-5">
			<h1 className="text-center my-5 text-lg font-bold">
				Favourites Channel List
			</h1>
			<div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
				{state.favourite?.map((o: any, key: any) => {
					return (
						<ListCard
							key={key}
							schedule={value}
							listData={o}
						/>
					);
				})}
			</div>
		</div>
	);
}
