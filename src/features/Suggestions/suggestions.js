import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMembers, setSelected, setIndex, selectSubreddits, selectMembers, selectSelected, selectAnimationUnits } from "./suggestionsSlice";
import {setLastSearch, setSortCriteria, selectAfter, selectBefore, selectFirstCall, selectLastSearch, selectSortCriteria } from '../SearchBar/SearchBarSlice';
import { postCreator, Search, addLoading, scrollDisable, resetUI } from "../Utilities/Utilities";
import { toggleLoading } from "../Loading/loadingScreenSlice";
import { data } from "../../Animations";


export default function Suggestions(args) {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const members = useSelector(selectMembers);
    const selectedSubreddit = useSelector(selectSelected);
    const animationUnits = useSelector(selectAnimationUnits);


    useEffect(() => {
        async function getMembers () {
            for(let subreddit in subreddits) {
                let url = subreddits[subreddit].baseURL;
                url = url + 'about.json';
                const responseJSON = await fetch(url);
                const response = await responseJSON.json();
                const members = response.data.subscribers;
                dispatch(setMembers({subreddit, members}));
            };
        };
        if (!subreddits.AskReddit.members) {
            getMembers();
        };
        const subredditKeys = Object.keys(subreddits);
        for (let i=0; i < subredditKeys.length; i++) {
            const subreddit = document.getElementById(subredditKeys[i]);
            if (selectedSubreddit === subreddit.id) {
                subreddit.style.backgroundColor = '#ff4500';
            } else {
                subreddit.style.backgroundColor = '#5cb8ff'
            }
            
        };

        
        
    });

    async function subredditSearchWrapper(e) {
        scrollDisable();
        dispatch(toggleLoading(true));
        dispatch(setSelected(e.currentTarget.id));
        dispatch(setLastSearch(''));
        dispatch(setSortCriteria('hot'));
        let sortCriteria = 'hot';
        Search(e, args.before, args.after, '', args.firstCall, sortCriteria, dispatch, e.currentTarget.id);
        resetUI();
    };

    function SubredditCreator() {
        const subredditsArray = [];

        for (let subreddit in data) {
            subredditsArray.push(<div className='subreddit' id={subreddit} onClick={subredditSearchWrapper} ><h3>{data[subreddit][0]}</h3><h4 className="memberCount">{`${(Number(members[subreddit]) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>)
        }

        return subredditsArray;
    };

    return (
        <div id="subreddits">
           {SubredditCreator()}
        </div>
    )
};

/* 
 <div className='subreddit' id="AskReddit" onClick={subredditSearchWrapper}><h3>r/Ask Reddit...</h3><h4 className="memberCount">{`${(Number(members.AskReddit) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="funny" ref={ref} onClick={subredditSearchWrapper} onDoubleClick={play}><h3>r/funny</h3><h4 className="memberCount">{`${(Number(members.Funny) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="news" onClick={subredditSearchWrapper}><h3>r/news</h3><h4 className="memberCount">{`${(Number(members.News) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="gaming" onClick={subredditSearchWrapper}><h3>r/gaming</h3><h4 className="memberCount">{`${(Number(members.Gaming) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="memes" ref={ref} onClick={subredditSearchWrapper} onDoubleClick={play}><h3>r/memes</h3><h4 className="memberCount">{`${(Number(members.Memes) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            
            
20 <= window.scrollY && window.scrollY <= 30
Animation version 2
[ { transform: `translate(${data[subreddit[1]]}%)`, 'aspect-ratio': '1 / 1', width: '12vw'}, {transform: `translate(${data[subreddit][2]}%)`, 'aspect-ratio': '1 / 1', width: '12vw'}, {transform: `translate(${data[subreddit][4]}%, ${data[subreddit][3]}%)`, 'aspect-ratio': '1 / 1', width: '10vw'},  {transform: `translate(${data[subreddit][4]}%, ${data[subreddit][5]}%)`, 'aspect-ratio': '1 / 1', width: '10vw'}]
eventListeners[i].animation.removeEventListener('finish', eventListeners[i].reverse);
eventListeners[i].animation.onfinish = eventListeners[i].reverse;
*/
