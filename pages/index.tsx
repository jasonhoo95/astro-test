import { useCallback, useEffect, useState } from "react";
import ListCard from "../components/listCard";
import ModalComponent from "../components/modalComponent";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { schedulelist } from "../globals/schedule";

export default function Home({ data }: any) {
	const [state, setState] = useState<any>({
		data: data?.response,
	});
	const { favourites } = useSelector((state: any) => state.favourites);

	const { value } = useSelector((state: any) => state.filter);
	const dispatch = useDispatch();
	const [search, setSearch] = useState<string>();
	const [open, setOpen] = useState(false);
	const [schedule, setSchedule] = useState<any>();
	useEffect(() => {
		filterList();
	}, [value]);

	useEffect(() => {
		if (data) {
			let mainSchedule: any = [];
			data.response.map((dataItem: any) => {
				let u: any;
				let scheduleList: any = [];
				if (dataItem.currentSchedule.length) {
					dataItem.currentSchedule.map((o: any, key: number) => {
						if (
							key < dataItem.currentSchedule.length - 1 &&
							moment().isBetween(
								dataItem.currentSchedule[key].datetime,
								dataItem.currentSchedule[key + 1].datetime,
								null,
								"[]"
							)
						) {
							u = key;
						} else if (dataItem.currentSchedule.length == 1) {
							scheduleList.push(o);
						} else if (
							key < dataItem.currentSchedule.length - 1 &&
							moment(dataItem.currentSchedule[key].datetime).isSame(
								dataItem.currentSchedule[key + 1].datetime
							)
						) {
							u = key;
						}

						if (
							u != null &&
							u <= key &&
							dataItem.currentSchedule.length - 1 >= key
						) {
							scheduleList.push(o);
						}
					});
				} else {
					scheduleList.push(null);
				}

				mainSchedule.push({ id: dataItem.id, schedule: scheduleList });
			});

			setSchedule(mainSchedule);
			dispatch(schedulelist(mainSchedule));
		}
	}, [data]);

	const filterList = () => {
		let arrayList = [...data.response];
		if (value?.sortName && value.sortName == "asc") {
			arrayList = arrayList.sort((a, b) => a.title.localeCompare(b.title));
		} else if (value?.sortName && value.sortName == "desc") {
			arrayList = arrayList.sort((a, b) => b.title.localeCompare(a.title));
		}

		if (value?.number && value.number == "100-500") {
			arrayList = arrayList.filter((o) => {
				return o.stbNumber >= 100 && o.stbNumber <= 500;
			});
		} else if (value?.number && value.number == "501-999") {
			arrayList = arrayList.filter((o) => {
				return o.stbNumber >= 501 && o.stbNumber <= 999;
			});
		}

		const searchName = search?.toLowerCase();
		if (searchName) {
			arrayList = arrayList.filter((o) => {
				return (
					o.title.toLowerCase().includes(searchName) ||
					o.stbNumber.toLowerCase().includes(searchName)
				);
			});
		}

		if (value) {
			arrayList = arrayList.filter((o) => {
				return (
					(value && value.language ? value.language == o.language : true) &&
					(value && value.category ? value.category == o.category : true) &&
					(value && value.isHD != null ? o.isHd == value.isHD : true)
				);
			});
		}
		setState({ data: arrayList });
	};

	return (
		<div className="max-w-[1200px] ml-auto mr-auto">
			<ModalComponent
				data={data}
				open={open}
				setOpen={setOpen}
			/>
			<div className="flex p-3 justify-center">
				<div className="md:w-[40%] w-full relative">
					<input
						className="inputTxt w-full"
						placeholder="search channel name and number"
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						type="text"></input>
					<div
						onClick={(e) => filterList()}
						className="search-btn flex items-center justify-center cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="white"
							className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</div>
				</div>

				{/* <button onClick={(e) => searchList()}>Search</button> */}
			</div>

			<div className="p-5">
				<div className="flex mb-3">
					<div
						className="cursor-pointer button-32 flex items-center"
						onClick={(e) => {
							setOpen(true);
						}}>
						Filter
					</div>
					<a href="/favourites">
						<div className="mx-3 button-32 flex items-center">
							Favourites
							<div className="circle-text bg-[#f8f8f8]">
								{favourites.length}
							</div>
						</div>
					</a>
				</div>
				<div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">
					{state.data?.map((o: any, key: any) => {
						return (
							<ListCard
								key={key}
								schedule={schedule}
								listData={o}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(
		`https://contenthub-api.eco.astro.com.my/channel/all.json`
	);
	const data = await res.json();

	// Pass data to the page via props
	return { props: { data } };
}
