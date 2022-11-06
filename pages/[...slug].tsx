import DetailsCard from "../components/detailsCard";
export default function PageDetails({ data }: any) {
	return (
		<div className="max-w-[1000px] ml-auto mr-auto">
			<DetailsCard data={data.response} />
		</div>
	);
}

export async function getServerSideProps({ query }: any) {
	// Fetch data from external API

	const idArray = query.slug[1].split("-");
	const id = idArray[idArray.length - 1];
	const response = await fetch(
		`https://contenthub-api.eco.astro.com.my/channel/${id}.json`
	);
	const data = await response.json();

	// Pass data to the page via props
	return { props: { data } };
}
