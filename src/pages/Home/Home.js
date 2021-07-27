import React, { useState, useEffect } from 'react';
import SteamApi from '../../components/steamApi';
import { ErrorBoundary } from '../../components/ErrorBoundary';

const steamApiWrapper = new SteamApi('3F58E57C4B88ADCBCFCD824EFC80FCFB');

const useDataApi = (initialState) => {
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

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
		setLoading(true);
		try {
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
				profilesIDs.map((item) =>
					steamApiWrapper.getFriendListUser(item)
				)
			);
			setError(false);
			setID(profilesIDs);
			setInfo(infoPlayers);
			setInfo(friends);
			setInfo(libraryGames);
		} catch (error) {
			console.log(`IS ERROR : ${error}`);
			setError(true);
		}

		setLoading(false);
	};

	return {
		state,
		setState,
		setURL,
		getInfo,
		loading,
		setLoading,
		error,
	};
};

const ResultsList = ({ data, error }) => {
	return (
		<>
			<br></br>
			<ul>
				{!error &&
					data.map((item) => (
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
				{error && <ErrorBlock />}
			</ul>
		</>
	);
};

const ErrorBlock = ({ errorMessage }) => {
	console.log(errorMessage);
	return (
		<>
			<p>Ooops... Something went wrong. Please, try again.</p>
			{errorMessage}
		</>
	);
};

const CompareBlock = ({ data, loader, error }) => {
	return (
		<>
			<br></br>
			{loader ? 'Loading...' : <ResultsList data={data} error={error} />}
			{/* {error && <ErrorBlock />} */}
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
	const profiles = useDataApi(usersProfiles);
	const watchState = profiles.state.map((item) => item);
	const [httpStatusCode, sethttpStatusCode] = useState();

	useEffect(() => {
		// watchState.map((item) =>
		// 	item ? setIsLoaded(true) : setIsLoaded(false)
		// );
		// watchState.forEach(function callback(item, code) {
		// 	sethttpStatusCode(code);
		// });
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
			<CompareBlock
				data={profiles.state}
				loader={profiles.loading}
				error={profiles.error}
			/>
		</div>
	);
}

export default Home;
