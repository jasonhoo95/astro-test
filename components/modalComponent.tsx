import React, { useEffect, useState } from "react";
import { Fragment } from "react";

import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { addFilter, clearFilter } from "../globals/filter";
export default function ModalComponent({ open, setOpen, data }: any) {
	const [language, setLanguage] = useState<any>();
	const [category, setCategory] = useState<any>();
	const dispatch = useDispatch();
	const { value } = useSelector((state: any) => state.filter);

	useEffect(() => {
		let language: any = [];
		let category: any = [];
		data?.response?.map((o: any) => {
			const indexCheck = language.findIndex((x: any) => x == o.language);
			const categoryCheck = category.findIndex((x: any) => x == o.category);
			if (indexCheck <= -1) {
				language.push(o.language);
			} else if (categoryCheck <= -1) {
				category.push(o.category);
			}
		});
		setLanguage(language);
		setCategory(category);
	}, [data]);

	return (
		<Transition.Root
			show={open}
			as={Fragment}>
			<Dialog onClose={setOpen}>
				<Transition.Child
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block xs:hidden" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0  right-0 flex max-w-full sm:pl-16 md:pl-10">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full">
							<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
								<div className="relative  w-full h-full bg-white  pb-8 shadow-2xl overflow-x-scroll">
									<div className="flex justify-end">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											onClick={() => setOpen(false)}
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 mr-5 mt-5 cursor-pointer">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</div>

									<div className="p-5">
										<h2 className="text-lg font-bold">Sort Channel Name</h2>
										<RadioGroup
											value={value?.sortName ? value.sortName : null}
											onChange={(value) => {
												dispatch(addFilter({ sortName: value }));
											}}>
											<div className="grid md:grid-cols-3 grid-cols-1 gap-3">
												<div className="flex items-center space-x-2 text-m">
													<RadioGroup.Option
														value={"asc"}
														className={({ active, checked }) =>
															`cursor-pointer focus:outline-none
											${active ? "ring-2 ring-loop-yellow-500 ring-offset-2" : ""}
											${
												checked
													? "border-transparent bg-yellow-400 text-white hover:bg-yellow-700"
													: "border-gray-200 bg-white hover:bg-gray-50"
											}
											"justify-center rounded-sm border p-2`
														}
													/>
													<RadioGroup.Description>
														<span>Name Ascending</span>
													</RadioGroup.Description>
												</div>
												<div className="flex items-center space-x-2 text-m">
													<RadioGroup.Option
														value={"desc"}
														className={({ active, checked }) =>
															`cursor-pointer focus:outline-none
											${active ? "ring-2 ring-loop-yellow-500 ring-offset-2" : ""}
											${
												checked
													? "border-transparent bg-yellow-400 text-white hover:bg-yellow-700"
													: "border-gray-200 bg-white hover:bg-gray-50"
											}
											"justify-center rounded-sm border p-2`
														}
													/>
													<RadioGroup.Description>
														<span>Name Descending</span>
													</RadioGroup.Description>
												</div>
											</div>
										</RadioGroup>
									</div>
									<div className="p-5">
										<h2 className="text-lg font-bold">Sort Channel Number</h2>
										<RadioGroup
											value={value?.number ? value.number : null}
											onChange={(value) => {
												dispatch(addFilter({ number: value }));
											}}>
											<div className="grid md:grid-cols-3 grid-cols-1 gap-3">
												<div className="flex items-center space-x-2 text-m">
													<RadioGroup.Option
														value={"100-500"}
														className={({ active, checked }) =>
															`cursor-pointer focus:outline-none
											${active ? "ring-2 ring-loop-yellow-500 ring-offset-2" : ""}
											${
												checked
													? "border-transparent bg-yellow-400 text-white hover:bg-yellow-700"
													: "border-gray-200 bg-white hover:bg-gray-50"
											}
											"justify-center rounded-sm border p-2`
														}
													/>
													<RadioGroup.Description>
														<span>100-500</span>
													</RadioGroup.Description>
												</div>
												<div className="flex items-center space-x-2 text-m">
													<RadioGroup.Option
														value={"501-999"}
														className={({ active, checked }) =>
															`cursor-pointer focus:outline-none
											${active ? "ring-2 ring-loop-yellow-500 ring-offset-2" : ""}
											${
												checked
													? "border-transparent bg-yellow-400 text-white hover:bg-yellow-700"
													: "border-gray-200 bg-white hover:bg-gray-50"
											}
											"justify-center rounded-sm border p-2`
														}
													/>
													<RadioGroup.Description>
														<span>501-999</span>
													</RadioGroup.Description>
												</div>
											</div>
										</RadioGroup>
									</div>
									<div className="p-5">
										<h2 className="text-lg font-bold">Language</h2>
										<RadioGroup
											value={value?.language ? value.language : null}
											onChange={(value) => {
												dispatch(addFilter({ language: value }));
											}}>
											<RadioGroup.Label className="sr-only">
												Choose a size
											</RadioGroup.Label>
											<div className="grid md:grid-cols-3 grid-cols-1 gap-3">
												{language?.map((option: any) => (
													<div className="flex items-center space-x-2 text-m">
														<RadioGroup.Option
															value={option}
															className={({ active, checked }) =>
																`cursor-pointer focus:outline-none
											${active ? "ring-2 ring-loop-yellow-500 ring-offset-2" : ""}
											${
												checked
													? "border-transparent bg-yellow-400 text-white hover:bg-yellow-700"
													: "border-gray-200 bg-white hover:bg-gray-50"
											}
											"justify-center rounded-sm border p-2`
															}
														/>
														<RadioGroup.Description>
															<span>{option}</span>
														</RadioGroup.Description>
													</div>
												))}
											</div>
										</RadioGroup>
									</div>
									<div className="p-5">
										<h2 className="text-lg font-bold">Category</h2>
										<RadioGroup
											value={value?.category ? value.category : null}
											onChange={(value) => {
												dispatch(addFilter({ category: value }));
											}}>
											<RadioGroup.Label className="sr-only">
												Choose a size
											</RadioGroup.Label>
											<div className="grid md:grid-cols-3 grid-cols-1 gap-3">
												{category?.map((option: any) => (
													<div className="flex items-center space-x-2 text-m">
														<RadioGroup.Option
															value={option}
															className={({ active, checked }) =>
																`cursor-pointer focus:outline-none
											${active ? "ring-2 ring-loop-yellow-500 ring-offset-2" : ""}
											${
												checked
													? "border-transparent bg-yellow-400 text-white hover:bg-yellow-700"
													: "border-gray-200 bg-white hover:bg-gray-50"
											}
											"justify-center rounded-sm border p-2`
															}
														/>
														<RadioGroup.Description>
															<span>{option}</span>
														</RadioGroup.Description>
													</div>
												))}
											</div>
										</RadioGroup>
									</div>
									<div className="p-5">
										<h2 className="text-lg font-bold">Resolution</h2>

										<RadioGroup
											value={
												value?.isHD != null ? (value.isHD ? true : false) : null
											}
											onChange={(value: any) => {
												dispatch(addFilter({ isHD: value }));
											}}>
											<div className="grid md:grid-cols-3 grid-cols-1 gap-3">
												<div className="flex items-center space-x-2 text-m">
													<RadioGroup.Option
														value={true}
														className={({ active, checked }) =>
															`cursor-pointer focus:outline-none
											${active ? "ring-2 ring-loop-yellow-500 ring-offset-2" : ""}
											${
												checked
													? "border-transparent bg-yellow-400 text-white hover:bg-yellow-700"
													: "border-gray-200 bg-white hover:bg-gray-50"
											}
											"justify-center rounded-sm border p-2`
														}
													/>
													<RadioGroup.Description>
														<span>Is HD</span>
													</RadioGroup.Description>
												</div>
												<div className="flex items-center space-x-2 text-m">
													<RadioGroup.Option
														value={false}
														className={({ active, checked }) =>
															`cursor-pointer focus:outline-none
											${active ? "ring-2 ring-loop-yellow-500 ring-offset-2" : ""}
											${
												checked
													? "border-transparent bg-yellow-400 text-white hover:bg-yellow-700"
													: "border-gray-200 bg-white hover:bg-gray-50"
											}
											"justify-center rounded-sm border p-2`
														}
													/>
													<RadioGroup.Description>
														<span>Not HD</span>
													</RadioGroup.Description>
												</div>
											</div>
										</RadioGroup>
									</div>

									<div
										onClick={(e) => {
											dispatch(clearFilter());
										}}
										className="flex justify-end mr-3">
										<div className="cursor-pointer button-32 flex items-center">
											Clear Filter
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
