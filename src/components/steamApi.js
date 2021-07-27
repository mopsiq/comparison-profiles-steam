class SteamApi {
	constructor(apiKey) {
		this.apiKey = apiKey;
	}

	croppingLinks = (link) => {
		if (link === '') return;
		return link.slice(link.lastIndexOf('/') + 1);
	};

	async getSteamId(url) {
		const result = await this._sendRequest({
			generalInterface: 'ISteamUser',
			method: 'ResolveVanityURL',
			version: 'v0001',
			query: `?key=${this.apiKey}&vanityurl=${url}`,
		});
		console.log(result);
		return result.resultRequest.response.steamid;
	}

	async getPlayerInfo(steamID) {
		const result = await this._sendRequest({
			generalInterface: 'ISteamUser',
			method: 'GetPlayerSummaries',
			version: 'v0002',
			query: `?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&steamids=${steamID}`,
		});
		return result.resultRequest.response.players[0];
	}

	async getFriendListUser(steamid, appID) {
		const result = await this._sendRequest({
			generalInterface: 'ISteamUser',
			method: 'GetFriendList',
			version: 'v0001',
			query: `?key=${this.apiKey}&steamid=${steamid}&relationship=friend`,
		});
		// console.log(result);
		return result.resultRequest.friendslist;
	}

	async getLibraryGames(steamid) {
		const result = await this._sendRequest({
			generalInterface: 'IPlayerService',
			method: 'GetOwnedGames',
			version: 'v0001',
			query: `?key=${this.apiKey}&steamid=${steamid}&include_appinfo=true&format=json`,
		});

		return result.resultRequest.response;
	}

	async _sendRequest({ generalInterface, method, version, query }) {
		try {
			const request = await fetch(
				`https://api.steampowered.com/${generalInterface}/${method}/${version}/${query}`
			);
			if (!request.ok) {
				throw new Error(`HTTP error! status: ${request.status}`);
			}
			const responseInJSON = await request.json();
			const result = await responseInJSON;
			return { resultRequest: result, code: request.status };
		} catch (error) {
			// console.log(`STATUS: ${error.status}`);
			return error.message;
		}
		// const responseInJSON = await request.json();
		// const result = await responseInJSON;
		// console.log(result);
		// return result;
	}
}

export default SteamApi;
