(this.webpackJsonpjam_list=this.webpackJsonpjam_list||[]).push([[0],{17:function(t,e,n){},20:function(t,e,n){"use strict";n.r(e);var a=n(2),r=n.n(a),s=n(12),i=n.n(s),o=(n(17),n(10)),c=n(3),l=n.n(c),d=n(8),u=n(4),p=n(5),h=n(7),g=n(6),j=n(1),f=n(9),v=n.n(f),m=n(0),b=function(t){Object(h.a)(n,t);var e=Object(g.a)(n);function n(t){var a;return Object(u.a)(this,n),(a=e.call(this,t)).state={markedVersions:null},a.onDragHandler=a.onDragHandler.bind(Object(j.a)(a)),a.onClickHandler=a.onClickHandler.bind(Object(j.a)(a)),a}return Object(p.a)(n,[{key:"componentDidUpdate",value:function(){var t=Object(d.a)(l.a.mark((function t(e,n,a){var r,s;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v()("https://api.phish.net/v3/jamcharts/get?apikey=".concat("6742B266F9B290276990","&songid=").concat(this.props.markedSongId));case 2:return r=t.sent,t.next=5,r.json();case 5:s=t.sent,this.props.markedSongId!==e.markedSongId&&0===s.error_code&&this.filterMarkedSongs(s.response.data.entries,this.props.markedSongId);case 7:case"end":return t.stop()}}),t,this)})));return function(e,n,a){return t.apply(this,arguments)}}()},{key:"filterMarkedSongs",value:function(){var t=Object(d.a)(l.a.mark((function t(e,n){var a,r,s=this;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.filter((function(t){return t.marked_recommended>0})),t.next=3,Promise.all(a.map(function(){var t=Object(d.a)(l.a.mark((function t(e){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v()("https://api.phish.net/v3/shows/query?apikey=".concat("6742B266F9B290276990","&showids=").concat(e.showid,"&order=ASC"));case 2:return n=t.sent,t.next=5,n.json();case 5:return a=t.sent,t.abrupt("return",{song:s.props.markedSongTitle,showdate:e.showdate,location:a.response.data[0].location,venue:a.response.data[0].venue});case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 3:r=t.sent,this.setState({markedVersions:r.length>0&&r,markedId:n});case 5:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"onClickHandler",value:function(t){var e=[{date:t.target.parentNode.dataset.date,title:t.target.parentNode.dataset.title,text:t.target.parentNode.textContent}];this.props.addedFromClick(e)}},{key:"onDragHandler",value:function(t){t.dataTransfer.setData("text/plain",t.target.textContent),t.dataTransfer.setData("application/title",t.target.dataset.title),t.dataTransfer.setData("application/date",t.target.dataset.date)}},{key:"render",value:function(){var t=this;return Object(m.jsxs)("div",{className:"song__marked",children:[Object(m.jsx)("h2",{children:"Select a Version"}),Object(m.jsx)("p",{children:this.props.markedSongTitle}),this.state.markedVersions?this.state.markedVersions.map((function(e,n){return Object(m.jsx)("div",{onDragStart:t.onDragHandler,draggable:"true","data-title":t.props.markedSongTitle,"data-date":e.showdate,children:Object(m.jsxs)("p",{onClick:t.onClickHandler,children:[e.showdate,Object(m.jsx)("br",{}),"\xa0",e.venue,Object(m.jsx)("br",{}),"\xa0 ",e.location]})},n)})):Object(m.jsx)("p",{children:"\ud83e\udd37\u200d\u2642\ufe0f \xa0 sorry, no marked versions"})]})}}]),n}(r.a.Component),y=function(t){Object(h.a)(n,t);var e=Object(g.a)(n);function n(t){var a;return Object(u.a)(this,n),(a=e.call(this,t)).state={currentTime:0},a.audioRef=r.a.createRef(),a.togglePlay=a.togglePlay.bind(Object(j.a)(a)),a.manuallyUpdateTime=a.manuallyUpdateTime.bind(Object(j.a)(a)),a.playNextSong=a.playNextSong.bind(Object(j.a)(a)),a.passUpSongInfo=a.passUpSongInfo.bind(Object(j.a)(a)),a}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.audioRef.current.addEventListener("timeupdate",(function(e){t.setState({currentTime:Math.round(e.target.currentTime),duration:Math.round(e.target.duration)})}))}},{key:"componentWillUnmount",value:function(){this.audioRef.current.removeEventListener("timeupdate",(function(){}))}},{key:"componentDidUpdate",value:function(t,e){var n=this;if(this.props.songToPlay!==t.songToPlay){var a=this.props.songToPlay[0],r=null!==this.props.songToPlay?a.mp3:null;this.audioRef.current&&(this.audioRef.current.pause(),this.audioRef.current.src=r,this.audioRef.current.load(),this.audioRef.current.play(),this.props.currentSongInfo({title:this.props.songToPlay[0].title,date:this.props.songToPlay[0].show_date,venueName:this.props.songToPlay[0].venue_name,venueLocation:this.props.songToPlay[0].venue_location})),this.props.playList.findIndex((function(t,e){a.title===t.title&&a.show_date===t.date&&n.setState({currentSongPlayListIndex:e})}))}this.state&&void 0!==this.state.currentTime&&this.state.currentTime===this.state.duration&&(this.audioRef.current.pause(),this.props.playList.length>0&&this.playNextSong()),this.state.currentTime!==e.currentTime&&this.setState({currentTime:this.state.currentTime})}},{key:"playNextSong",value:function(t){var e;void 0!==(e=t&&"prev"===t.target.id?this.props.playList[this.state.currentSongPlayListIndex-1]:this.props.playList[this.state.currentSongPlayListIndex+1])&&(this.setState({currentTime:0,duration:1}),this.props.nextSong(e))}},{key:"updateTime",value:function(){this.setState({currentTime:this.state.currentTime})}},{key:"togglePlay",value:function(){this.audioRef.current&&(this.audioRef.current.paused?this.audioRef.current.play():this.audioRef.current.pause())}},{key:"manuallyUpdateTime",value:function(t){""!==this.audioRef.current.src&&(this.audioRef.current.currentTime=t.target.value)}},{key:"passUpSongInfo",value:function(t){}},{key:"render",value:function(){var t=null!==this.state.duration?this.state.duration:0;return Object(m.jsxs)("header",{children:[Object(m.jsx)("div",{className:"logo",children:"Jamdora"}),Object(m.jsxs)("div",{className:"controls",children:[Object(m.jsx)("audio",{ref:this.audioRef,className:"controls__play"}),Object(m.jsx)("div",{className:"controls__previous",onClick:this.playNextSong,id:"prev",children:" < "}),Object(m.jsx)("div",{className:"controls__play",onClick:this.togglePlay,children:" |> "}),Object(m.jsx)("div",{className:"controls__next",onClick:this.playNextSong,id:"next",children:" > "})]}),Object(m.jsxs)("div",{className:"time",children:[Object(m.jsxs)("div",{className:"time__start",children:[" ","".concat(O(this.state.currentTime))," "]}),Object(m.jsx)("div",{className:"time__duration duration",tabIndex:-1,children:Object(m.jsx)("input",{type:"range",min:0,value:this.state.currentTime,max:t,className:"duration__elapsed",onChange:this.manuallyUpdateTime})}),Object(m.jsxs)("div",{className:"time__end",children:[" ",O(t)," "]})]}),Object(m.jsx)("div",{className:"song__info"})]})}}]),n}(r.a.Component);function O(t){return isNaN(t)?"0:00":Math.floor(t/60)+":"+("0"+Math.floor(t%60)).slice(-2)}var x=function(t){Object(h.a)(n,t);var e=Object(g.a)(n);function n(t){var a;return Object(u.a)(this,n),(a=e.call(this,t)).state={value:"",list:a.props.songList},a.onKeyUpHandler=a.onKeyUpHandler.bind(Object(j.a)(a)),a.onFocusHandler=a.onFocusHandler.bind(Object(j.a)(a)),a.onBlurHandler=a.onBlurHandler.bind(Object(j.a)(a)),a.onClickHandler=a.onClickHandler.bind(Object(j.a)(a)),a.onChange=a.onChange.bind(Object(j.a)(a)),a}return Object(p.a)(n,[{key:"onKeyUpHandler",value:function(t){if(13===t.keyCode){var e=this.props.songList.filter((function(e){return e.song.toLowerCase().includes(t.target.value)?(document.querySelector(".dropdown").classList.remove("active"),e):null}));e.length&&e.length<2&&this.props.chosenSong(e[0].songid,e[0].song)}}},{key:"onChange",value:function(t){var e=this.props.songList.filter((function(e,n){var a=e.song.toLowerCase(),r=t.target.value.toLowerCase();if(""!==r&&a.includes(r))return e}));this.setState({list:e})}},{key:"onFocusHandler",value:function(t){t.currentTarget===t.target&&document.querySelector(".dropdown").classList.add("active")}},{key:"onBlurHandler",value:function(t){null==t.relatedTarget&&(this.setState({list:this.props.songList}),document.querySelector(".dropdown").classList.remove("active"))}},{key:"onClickHandler",value:function(t){document.querySelector(".dropdown").classList.remove("active"),this.props.chosenSong(t.target.id,t.target.textContent)}},{key:"render",value:function(){var t=this;return Object(m.jsxs)("div",{className:"songs__all",children:[Object(m.jsx)("input",{type:"text",onKeyUp:this.onKeyUpHandler,onFocus:this.onFocusHandler,onBlur:this.onBlurHandler,onChange:this.onChange}),Object(m.jsx)("ul",{className:"dropdown",tabIndex:"-1",children:this.state.list&&this.state.list.map((function(e,n){return Object(m.jsx)("li",{onClick:t.onClickHandler,onBlur:t.onBlurHandler,id:e.songid,className:"dropdown__item",tabIndex:n,children:e.song},e.songid)}))})]})}}]),n}(r.a.Component),k=function(t){Object(h.a)(n,t);var e=Object(g.a)(n);function n(t){var a;return Object(u.a)(this,n),(a=e.call(this,t)).state={playList:[]},a.onDropHandler=a.onDropHandler.bind(Object(j.a)(a)),a.onDragOverHandler=a.onDragOverHandler.bind(Object(j.a)(a)),a.playSong=a.playSong.bind(Object(j.a)(a)),a.removeFromPlayList=a.removeFromPlayList.bind(Object(j.a)(a)),a}return Object(p.a)(n,[{key:"componentDidUpdate",value:function(t,e){var n=this;t.addedFromClick!==this.props.addedFromClick&&this.setState({playList:this.state.playList.concat(this.props.addedFromClick)},(function(t){n.props.addToPlayList(n.state.playList)}))}},{key:"playSong",value:function(t){var e={date:t.target.dataset.date,title:t.target.dataset.title,text:t.target.dataset.text};this.props.chosenVersion(e)}},{key:"removeFromPlayList",value:function(t){var e=Object(o.a)(this.state.playList);e.splice(parseInt(t.target.id),1),this.setState({playList:e})}},{key:"onDropHandler",value:function(t){var e=this;t.preventDefault();var n=t.dataTransfer.getData("text/plain"),a=t.dataTransfer.getData("application/title"),r=t.dataTransfer.getData("application/date");this.setState({playList:this.state.playList.concat({title:a,text:n,date:r})},(function(t){e.props.addToPlayList(e.state.playList)}))}},{key:"onDragOverHandler",value:function(t){t.preventDefault(),t.dataTransfer.dropEffect="copy"}},{key:"render",value:function(){var t=this;return Object(m.jsxs)("div",{className:"playlist",children:[Object(m.jsx)("h2",{children:"Play List"}),Object(m.jsx)("div",{onDrop:this.onDropHandler,onDragOver:this.onDragOverHandler,id:"target",className:"playlist__zone",children:this.state.playList.map((function(e,n){return Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{onClick:t.removeFromPlayList,id:n,children:"X Remove\xa0 "}),Object(m.jsx)("span",{children:e.title}),e.text,Object(m.jsx)("span",{className:"btn btn-play","data-title":e.title,"data-date":e.date,"data-text":e.text,onClick:t.playSong,children:"\xa0 Play >"})]},n)}))})]})}}]),n}(r.a.Component);function S(t){return Object(m.jsxs)("div",{children:["Song Info",Object(m.jsx)("div",{children:t.currentSong.title}),Object(m.jsx)("div",{children:t.currentSong.date}),Object(m.jsx)("div",{children:t.currentSong.venueName}),Object(m.jsx)("div",{children:t.currentSong.venueLocation})]})}var T=function(t){Object(h.a)(n,t);var e=Object(g.a)(n);function n(t){var a;return Object(u.a)(this,n),(a=e.call(this,t)).selectedSongVersion=function(){var t=Object(d.a)(l.a.mark((function t(e){var n,r,s;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://phish.in/api/v1/shows/".concat(e.date),{method:"GET",headers:{Authorization:"Bearer ".concat("c76fcae808eb8c75b9be1d7f3606dabb54d5a9ed5f0a14376f074c6fec8326a26d474587fea741e763999e0f8d48057c"),Accept:"application/json"}}).catch((function(t){return console.error(t)}));case 2:return n=t.sent,t.next=5,n.json();case 5:(r=t.sent).success&&(s=r.data.tracks.filter((function(t){return t.title===e.title})),a.setState({songVersion:s}));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),a.state={loading:!0,selectSongId:null,selectSongTitle:null,songVersion:null,playList:[],addedFromClick:[]},a}return Object(p.a)(n,[{key:"componentDidMount",value:function(){var t=Object(d.a)(l.a.mark((function t(){var e,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v()("https://api.phish.net/v3/jamcharts/all?apikey=".concat("6742B266F9B290276990"),{method:"POST",timeout:3e3,headers:{Accept:"application/json","Content-Type":"application/json"}}).catch((function(t){return console.error(t)}));case 2:return e=t.sent,t.next=5,e.json();case 5:n=t.sent,this.setState({songs:n.response.data,loading:!1});case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"updatePlayList",value:function(t){this.setState({playList:Object(o.a)(t)})}},{key:"addedFromClick",value:function(t){this.setState({addedFromClick:Object(o.a)(t)})}},{key:"selectSongIdHandler",value:function(t,e){this.setState({selectSongId:t,selectSongTitle:e})}},{key:"passCurrentSong",value:function(t){this.setState({playingSongInfo:t})}},{key:"render",value:function(){var t=this;return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(y,{songToPlay:this.state.songVersion,playList:this.state.playList,nextSong:this.selectedSongVersion,currentSongInfo:function(e){return t.passCurrentSong(e)}}),Object(m.jsx)(S,{currentSong:this.state.playingSongInfo}),Object(m.jsxs)("div",{className:"search-song__container container",children:[Object(m.jsx)("h2",{children:"Search for Song"}),this.state.loading||!this.state.songs?Object(m.jsx)("p",{children:"Loading..."}):Object(m.jsx)(x,{songList:this.state.songs,chosenSong:function(e,n){return t.selectSongIdHandler(e,n)}})]}),Object(m.jsx)("div",{className:"marked-song__container container",children:Object(m.jsx)(b,{markedSongId:this.state.selectSongId,markedSongTitle:this.state.selectSongTitle,addedFromClick:function(e){return t.addedFromClick(e)}})}),Object(m.jsx)("div",{className:"playlist__container container",children:Object(m.jsx)(k,{chosenVersion:function(e){return t.selectedSongVersion(e)},addedFromClick:this.state.addedFromClick,addToPlayList:function(e){return t.updatePlayList(e)}})})]})}}]),n}(r.a.Component);var C=function(){return Object(m.jsx)("div",{className:"App",children:Object(m.jsx)(T,{})})},L=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,21)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,s=e.getLCP,i=e.getTTFB;n(t),a(t),r(t),s(t),i(t)}))};i.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(C,{})}),document.getElementById("root")),L()}},[[20,1,2]]]);
//# sourceMappingURL=main.fb2a92d8.chunk.js.map