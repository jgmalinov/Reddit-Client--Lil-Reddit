import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMembers, setSelected, setIndex, selectSubreddits, selectMembers, selectSelected, selectAnimationUnits } from "./suggestionsSlice";
import {setLastSearch, setSortCriteria, selectAfter, selectBefore, selectFirstCall, selectLastSearch, selectSortCriteria } from '../SearchBar/SearchBarSlice';
import { postCreator, Search } from "../Utilities/Utilities";


export default function Suggestions(args) {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const members = useSelector(selectMembers);
    const selectedSubreddit = useSelector(selectSelected);
    const animationUnits = useSelector(selectAnimationUnits);
    const data = {
        AskReddit: ["r/Ask Reddit...", 0],
        funny: ["r/funny", 142.8571],
        news: ["r/news", 285.7142],
        gaming: ["r/gaming", 428.5713],
        memes: ["r/memes", 571.4284]
    };


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

        for (let subreddit in data) {
            const domElement = document.getElementById(subreddit);
            const keyframes = new KeyframeEffect(
                domElement,
                [ {}, {transform: "translate(571.4284%)"}, {transform: `translate(571.4284%, ${data[subreddit][1]}%)`} ],
                { duration: 2000, fill: 'forwards'}
            );
        
            const animation = new Animation(keyframes, document.timeline);
            function play(e) {
                animation.play();
            }
            window.addEventListener('scroll', play);
        };
    });

    async function subredditSearchWrapper(e) {
        dispatch(setSelected(e.currentTarget.id));
        dispatch(setLastSearch(''));
        dispatch(setSortCriteria('hot'));
        let sortCriteria = 'hot';
        Search(e, args.before, args.after, '', args.firstCall, sortCriteria, dispatch, e.currentTarget.id);
    };

    function SubredditCreator() {
        const subredditsArray = [];

        for (let subreddit in data) {
            subredditsArray.push(<div className='subreddit' id={subreddit} onClick={subredditSearchWrapper} ><h3>{data[subreddit][0]}</h3><h4 className="memberCount">{`${(Number(members[subreddit]) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>)
        }

        return subredditsArray;
    }

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
            
            

*/
