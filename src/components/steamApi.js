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
		return result.response.steamid;
	}

	async getPlayerInfo(steamID) {
		const result = await this._sendRequest({
			generalInterface: 'ISteamUser',
			method: 'GetPlayerSummaries',
			version: 'v0002',
			query: `?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&steamids=${steamID}`,
		});
		return result.response.players[0];
	}

	async getFriendListUser(steamid, appID) {
		const result = await this._sendRequest({
			generalInterface: 'ISteamUser',
			method: 'GetFriendList',
			version: 'v0001',
			query: `?key=${this.apiKey}&steamid=${steamid}&relationship=friend`,
		});
		return result.friendslist;
	}

	async getLibraryGames(steamid) {
		const result = await this._sendRequest({
			generalInterface: 'IPlayerService',
			method: 'GetOwnedGames',
			version: 'v0001',
			query: `?key=${this.apiKey}&steamid=${steamid}&include_appinfo=true&format=json`,
		});
		return result.response;
	}

	async _sendRequest({ generalInterface, method, version, query }) {
		const request = await fetch(
			`http://api.steampowered.com/${generalInterface}/${method}/${version}/${query}`
		);
		if (!request.ok) {
			console.error(request);
			console.log(request.statusText);
			console.log(request.status);
			// throw new Error('Bad request');
		}
		const responseInJSON = await request.json();
		const result = await responseInJSON;
		return result;
	}
}

export default SteamApi;
