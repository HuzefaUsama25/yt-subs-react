import Subscribe from './Subscribe';
import { useState, useEffect } from 'react';

const SubscribeList = () => {
	const [channelIds, setchannelIds] = useState([
		'UCX6OQ3DkcsbYNE6H8uQQuVA',
		'UCAiLfjNXkNv24uhpzUgPa6A',
		'UCIPPMRA040LQr5QPyJEbmXA',
		'UCUaT_39o1x6qWjz7K2pWcgw',
		'UC4-79UOlP48-QNGgCko5p2g',
		'UCZzvDDvaYti8Dd8bLEiSoyQ',
		'UCW5YeuERMmlnqo4oq8vwUpg',
	]);

	const [apiKey, setapiKey] = useState('AIzaSyCGnHPKqunoQFw3pwCp19gYTBkBoGnXNsE');
	const [channelData, setchannelData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			for (let i = 0; i < channelIds.length; i++) {
				let data = await fetch(
					`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelIds[i]}&key=${apiKey}`
				);
				let json_data = await data.json();
				setchannelData((prevArray) => [...prevArray, json_data]);
			}
		};
		fetchData();

		return () => {
			console.log('useEffect cleanup');
		};
	}, []);

	return (
		<>
			{channelData.map((data) => (
				<Subscribe
					key={data.items[0].id}
					channelName={data.items[0].snippet.title}
					channelId={data.items[0].id}
					description={data.items[0].snippet.description}
					imgUrl={data.items[0].snippet.thumbnails.default.url}
					subCount={data.items[0].statistics.subscriberCount}
				/>
			))}
		</>
	);
};

export default SubscribeList;
