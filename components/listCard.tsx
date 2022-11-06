import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { addFavourites } from "../globals/favourites";
export default function ListCard({ listData, schedule }: any) {
	const dispatch = useDispatch();
	const { favourites } = useSelector((state: any) => state.favourites);
	const [favourite, setFavourite] = useState<boolean>();

	const [check, setCheck] = useState(false);

	useEffect(() => {
		let checkFavourite = favourites.find((o: any) => {
			return o.id == listData.id;
		});
		setFavourite(checkFavourite);
	}, [favourites, listData]);
	return (
		<a
			href={listData.detailUrl}
			className="h-full">
			<div className="boxShadow cursor-pointer h-full">
				<div className="flex items-center p-5 relative">
					<div
						onClick={(e) => {
							dispatch(addFavourites(listData));
							setCheck(!check);
							e.preventDefault();
						}}
						className="absolute right-[10px] top-[10px]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeWidth={0.5}
							fill={favourite ? "red" : "transparent"}
							stroke="currentColor"
							className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
							/>
						</svg>
					</div>
					<div className="w-[30%]">
						<img
							className="w-full h-full object-cover"
							src={listData.imageUrl}
						/>
					</div>
					<div className="ml-3">
						<div>CH{listData.stbNumber}</div>
						<div className="font-bold">{listData.title}</div>
					</div>
				</div>
				<hr />
				<div className="p-5 text-sm">
					{schedule?.map((o: any) => {
						if (o.id == listData.id) {
							return o.schedule.map((u: any, key: number) => {
								if (key == 0 && u) {
									return (
										<div className="flex my-3">
											<>
												<div className="max-w-[4.5rem] mr-3 basis-[4.5rem]">
													On Now
												</div>
												<div className="title-txt">{u.title}</div>
											</>
										</div>
									);
								} else if (!u) {
									return (
										<div className="flex my-3">
											<>
												<div className="max-w-[4.5rem] mr-3 basis-[4.5rem]">
													On Now
												</div>
												<div className="title-txt">
													No Information Available
												</div>
											</>
										</div>
									);
								} else {
									return (
										<div className="flex my-3">
											<>
												<div
													className="text-gray-400 max-w-[4.5rem] mr-3 basis-[4.5rem]"
													key={key}>
													{moment(u.datetime).format("hh:mma")}
												</div>
												<div className="text-gray-400 title-txt">{u.title}</div>
											</>
										</div>
									);
								}
							});
						}
					})}
				</div>
			</div>
		</a>
	);
}
