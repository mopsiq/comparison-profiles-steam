(this.webpackJsonpsteamprofcomp=this.webpackJsonpsteamprofcomp||[]).push([[0],{39:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),s=r(23),c=r.n(s),u=r(17),i=r(2),o=r(4),l=r.n(o),j=r(8),f=r(13),p=r(26),b=r(12),m=r(15),d=r(16),h=function(){function e(t){Object(m.a)(this,e),this.croppingLinks=function(e){if(""!==e)return e.slice(e.lastIndexOf("/")+1)},this.apiKey=t}return Object(d.a)(e,[{key:"getSteamId",value:function(){var e=Object(j.a)(l.a.mark((function e(t){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._sendRequest({generalInterface:"ISteamUser",method:"ResolveVanityURL",version:"v0001",query:"?key=".concat(this.apiKey,"&vanityurl=").concat(t)});case 2:return r=e.sent,console.log(r),e.abrupt("return",r.resultRequest.response.steamid);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getPlayerInfo",value:function(){var e=Object(j.a)(l.a.mark((function e(t){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._sendRequest({generalInterface:"ISteamUser",method:"GetPlayerSummaries",version:"v0002",query:"?key=3F58E57C4B88ADCBCFCD824EFC80FCFB&steamids=".concat(t)});case 2:return r=e.sent,e.abrupt("return",r.resultRequest.response.players[0]);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getFriendListUser",value:function(){var e=Object(j.a)(l.a.mark((function e(t,r){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._sendRequest({generalInterface:"ISteamUser",method:"GetFriendList",version:"v0001",query:"?key=".concat(this.apiKey,"&steamid=").concat(t,"&relationship=friend")});case 2:return n=e.sent,e.abrupt("return",n.resultRequest.friendslist);case 4:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}()},{key:"getLibraryGames",value:function(){var e=Object(j.a)(l.a.mark((function e(t){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._sendRequest({generalInterface:"IPlayerService",method:"GetOwnedGames",version:"v0001",query:"?key=".concat(this.apiKey,"&steamid=").concat(t,"&include_appinfo=true&format=json")});case 2:return r=e.sent,e.abrupt("return",r.resultRequest.response);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"_sendRequest",value:function(){var e=Object(j.a)(l.a.mark((function e(t){var r,n,a,s,c,u,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.generalInterface,n=t.method,a=t.version,s=t.query,e.prev=1,e.next=4,fetch("http://api.steampowered.com/".concat(r,"/").concat(n,"/").concat(a,"/").concat(s));case 4:if((c=e.sent).ok){e.next=7;break}throw new Error("HTTP error! status: ".concat(c.status));case 7:return e.next=9,c.json();case 9:return u=e.sent,e.next=12,u;case 12:return i=e.sent,e.abrupt("return",{resultRequest:i,code:c.status});case 16:return e.prev=16,e.t0=e.catch(1),e.abrupt("return",e.t0.message);case 19:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),O=r(27),v=r(25),x=r(1),g=(a.a.Component,new h("3F58E57C4B88ADCBCFCD824EFC80FCFB")),y=function(e){var t=e.data,r=e.error;return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("br",{}),Object(x.jsxs)("ul",{children:[!r&&t.map((function(e){return Object(x.jsxs)("li",{children:["Steam url: ",e.url,Object(x.jsx)("br",{}),"Steamid: ",e.steamid,Object(x.jsx)("br",{}),"Username: ",e.info.personaname,Object(x.jsx)("br",{}),"Real name: ",e.info.realname,Object(x.jsx)("br",{}),"Games count: ",e.info.game_count,Object(x.jsx)("br",{}),Object(x.jsx)("img",{width:"115px",height:"115px",src:e.info.avatarfull,alt:"avatar"}),Object(x.jsx)("br",{})]},e.id)})),r&&Object(x.jsx)(k,{})]})]})},k=function(e){var t=e.errorMessage;return console.log(t),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("p",{children:"Ooops... Something went wrong. Please, try again."}),t]})},w=function(e){var t=e.data,r=e.loader,n=e.error;return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("br",{}),r?"Loading...":Object(x.jsx)(y,{data:t,error:n})]})},R=function(e){var t=e.number,r=e.url,n=e.change;return Object(x.jsx)(x.Fragment,{children:Object(x.jsx)("input",{value:r,numb:t,onChange:function(e){return n(t,e.target.value)},placeholder:"Enter your url steam profile"})})};var I=function(){var e=function(e){var t=Object(n.useState)(e),r=Object(b.a)(t,2),a=r[0],s=r[1],c=Object(n.useState)(!1),u=Object(b.a)(c,2),i=u[0],o=u[1],m=Object(n.useState)(),d=Object(b.a)(m,2),h=d[0],O=d[1],v=function(e){s((function(t){return e.map((function(e,r){return Object(f.a)(Object(f.a)({},t[r]),{},{info:Object.assign(t[r].info,e)})}))}))},x=function(e){s((function(t){return e.map((function(e,r){return Object(f.a)(Object(f.a)({},t[r]),{},{steamid:e})}))}))},y=function(){var e=Object(j.a)(l.a.mark((function e(){var t,r,n,s,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o(!0),e.prev=1,t=a.map((function(e){return g.croppingLinks(e.url)})),e.next=5,Promise.all(t.map((function(e){return isNaN(e)?g.getSteamId(e):e})));case 5:return r=e.sent,e.next=8,Promise.all(r.map((function(e){return g.getPlayerInfo(e)})));case 8:return n=e.sent,e.next=11,Promise.all(r.map((function(e){return g.getLibraryGames(e)})));case 11:return s=e.sent,e.next=14,Promise.all(r.map((function(e){return g.getFriendListUser(e)})));case 14:c=e.sent,O(!1),x(r),v(n),v(c),v(s),e.next=26;break;case 22:e.prev=22,e.t0=e.catch(1),console.log("IS ERROR : ".concat(e.t0)),O(!0);case 26:o(!1);case 27:case"end":return e.stop()}}),e,null,[[1,22]])})));return function(){return e.apply(this,arguments)}}();return{state:a,setState:s,setURL:function(e,t){s((function(r){var n=Object(p.a)(r);return n[e].url=t,n}))},getInfo:y,loading:i,setLoading:o,error:h}}([{url:"",steamid:"",id:1,info:{}},{url:"",steamid:"",id:2,info:{}}]),t=e.state.map((function(e){return e})),r=Object(n.useState)(),a=Object(b.a)(r,2);return a[0],a[1],Object(n.useEffect)((function(){}),[t]),Object(x.jsxs)("div",{children:[Object(x.jsx)("h1",{children:"Home page"}),Object(x.jsx)(R,{number:0,url:e.state[0].url,change:e.setURL}),Object(x.jsx)(R,{number:1,url:e.state[1].url,change:e.setURL}),Object(x.jsx)("button",{onClick:function(){return e.getInfo()},children:"Get"}),Object(x.jsx)(w,{data:e.state,loader:e.loading,error:e.error})]})};var F=function(){return Object(x.jsx)("div",{children:Object(x.jsx)("h1",{children:"About page"})})};function S(){return Object(x.jsx)(u.a,{children:Object(x.jsx)("div",{children:Object(x.jsxs)(i.c,{children:[Object(x.jsx)(i.a,{path:"/about",component:F}),Object(x.jsx)(i.a,{path:"/",component:I})]})})})}c.a.render(Object(x.jsx)(u.a,{children:Object(x.jsx)(S,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.49574c5c.chunk.js.map