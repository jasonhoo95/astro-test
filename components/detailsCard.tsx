import moment from "moment";
import { useEffect, useState } from "react";
export default function DetailsCard({ data }: any) {
	const [schedule, setSchedule] = useState<any>([]);

	useEffect(() => {
		if (data) {
			let dataList: any = [];

			Object.keys(data.schedule).map((v) => {
				let itemsList: any = [];
				let betweenKey: number;
				data.schedule[v].map((o: any, key: number) => {
					if (
						key < data.schedule[v].length - 1 &&
						moment(v).format("ddd") == moment().format("ddd") &&
						moment().isBetween(
							data.schedule[v][key].datetime,
							data.schedule[v][key + 1].datetime
						)
					) {
						betweenKey = key;
					} else if (data.schedule[v].length == 1) {
						itemsList.push(o);
					}

					if (
						betweenKey != null &&
						betweenKey <= key &&
						data.schedule[v].length - 1 >= key
					) {
						itemsList.push({
							...o,
							datetime: moment(o.datetime).format("hh:mma"),
						});
					}

					if (moment(v).isAfter(moment())) {
						itemsList.push({
							...o,
							datetime: moment(o.datetime).format("hh:mma"),
						});
					}
				});

				if (
					moment(v).isAfter(moment()) ||
					moment(v).format("ddd") == moment().format("ddd")
				) {
					dataList.push({
						date:
							moment(v).format("ddd") == moment().format("ddd")
								? "Today"
								: moment(v).format("ddd"),
						item: itemsList,
					});
				}
			});

			setSchedule(dataList);
		}
	}, [data]);
	return (
		<div>
			<div className="flex items-center p-5">
				<div className="w-[10%]">
					<img
						className="w-full h-full object-cover"
						src={data.imageUrl}
					/>
				</div>
				<div className="ml-3">
					<div>CH{data.stbNumber}</div>
					<div className="font-bold">{data.title}</div>
				</div>
			</div>
			<div className="boxShadow p-[20px]">
				<div className="font-bold text-lg">Description:</div>
				<div>{data.description}</div>
			</div>
			<ul
				className="nav nav-tabs flex  md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
				id="tabs-tab"
				role="tablist">
				{schedule?.map((o: any, key: number) => {
					return (
						<li
							className="nav-item"
							role="presentation">
							<a
								href="#tabs-home"
								className={`nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent ${
									key == 0 ? "active" : null
								}`}
								id={`${o.date}-tab`}
								data-bs-toggle="pill"
								data-bs-target={`#${o.date}`}
								role="tab"
								aria-controls={o.date}
								aria-selected="true">
								{o.date}
							</a>
						</li>
					);
				})}
			</ul>
			<div
				className="tab-content"
				id="tabs-tabContent">
				{schedule?.map((o: any, mainKey: number) => {
					return (
						<div
							className={`tab-pane fade ${mainKey == 0 ? "active show" : null}`}
							id={o.date}
							role="tabpanel"
							aria-labelledby={`${o.date}-tab`}>
							<div>
								{o.item.map((u: any, key: number) => {
									if (key == 0 && mainKey == 0) {
										return (
											<div className="flex my-3">
												<>
													<div className="max-w-[4.5rem] mr-3 basis-[4.5rem]">
														On Now
													</div>
													<div className="ml-3 title-txt">{u.title}</div>
												</>
											</div>
										);
									} else {
										return (
											<div className="flex my-3">
												<>
													<div
														className="text-gray-400 max-w-[4.5rem] basis-[4.5rem] mr-3"
														key={key}>
														{u.datetime}
													</div>
													<div className="ml-3 text-gray-400 title-txt">
														{u.title}
													</div>
												</>
											</div>
										);
									}
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
