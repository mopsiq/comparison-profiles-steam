import React, { useState, useEffect } from 'react';
import SteamApi from '../../components/steamApi';

const steamApiWrapper = new SteamApi('3F58E57C4B88ADCBCFCD824EFC80FCFB');

const useDataApi = (initialState) => {
	const [state, setState] = useState(initialState);

	const setURL = (number, value) => {
		setState((prevState) => {
			const newState = [...prevState];
			newState[number].url = value;
			return newState;
		});
	};

	const setInfo = (array) => {
		setState((s) =>
			array.map((res, index) => ({
				...s[index],
				info: Object.assign(s[index].info, res),
			}))
		);
	};

	const setID = (array) => {
		setState((s) =>
			array.map((res, index) => ({ ...s[index], steamid: res }))
		);
	};

	const getInfo = async () => {
		const clippingsUrls = state.map((item) =>
			steamApiWrapper.croppingLinks(item.url)
		);
		const profilesIDs = await Promise.all(
			clippingsUrls.map((item) =>
				isNaN(item) ? steamApiWrapper.getSteamId(item) : item
			)
		);
		const infoPlayers = await Promise.all(
			profilesIDs.map((item) => steamApiWrapper.getPlayerInfo(item))
		);
		const libraryGames = await Promise.all(
			profilesIDs.map((item) => steamApiWrapper.getLibraryGames(item))
		);
		const friends = await Promise.all(
			profilesIDs.map((item) => steamApiWrapper.getFriendListUser(item))
		);

		setID(profilesIDs);
		setInfo(infoPlayers);
		setInfo(friends);
		setInfo(libraryGames);
	};

	return { state, setState, setURL, getInfo };
};

const ResultsList = ({ data }) => {
	return (
		<>
			<br></br>
			<ul>
				{data.map((item) => (
					<li key={item.id}>
						Steam url: {item.url}
						<br></br>
						Steamid: {item.steamid}
						<br></br>
						Username: {item.info.personaname}
						<br></br>
						Real name: {item.info.realname}
						<br></br>
						Games count: {item.info['game_count']}
						<br></br>
						<img
							width='115px'
							height='115px'
							src={item.info.avatarfull}
							alt='avatar'
						></img>
						<br></br>
					</li>
				))}
			</ul>
		</>
	);
};

const CompareBlock = ({ data, loader }) => {
	return (
		<>
			<br></br>
			{loader ? <ResultsList data={data} /> : 'Not found'}
		</>
	);
};

const LinksProfiles = ({ number, url, change }) => {
	return (
		<>
			<input
				value={url}
				numb={number}
				onChange={(e) => change(number, e.target.value)}
				placeholder='Enter your url steam profile'
			/>
		</>
	);
};

function Home() {
	const usersProfiles = [
		{ url: '', steamid: '', id: 1, info: {} },
		{ url: '', steamid: '', id: 2, info: {} },
	];
	const [isLoaded, setIsLoaded] = useState(false);
	const profiles = useDataApi(usersProfiles);
	const watchState = profiles.state.map((item) => item.steamid);

	useEffect(() => {
		watchState.map((item) =>
			item ? setIsLoaded(true) : setIsLoaded(false)
		);
	}, [watchState]);

	return (
		<div>
			<h1>Home page</h1>
			<LinksProfiles
				number={0}
				url={profiles.state[0].url}
				change={profiles.setURL}
			/>
			<LinksProfiles
				number={1}
				url={profiles.state[1].url}
				change={profiles.setURL}
			/>
			<button onClick={() => profiles.getInfo()}>Get</button>
			<CompareBlock data={profiles.state} loader={isLoaded} />
		</div>
	);
}

export default Home;
