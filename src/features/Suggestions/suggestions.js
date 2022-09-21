import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMembers, selectSubreddits, selectMembers } from "./suggestionsSlice";
import { postCreator } from "../Utilities/Utilities";

export default function Suggestions(args) {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const members = useSelector(selectMembers);
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
    });

    async function renderSubredditResults(e) {
        const subreddit = e.currentTarget.id;
        const response = await fetch()
        
    }

    return (
        <div id="subreddits">
            <div className='subreddit' id="AskReddit" onClick={renderSubredditResults}><h3>r/Ask Reddit...</h3><h4 className="memberCount">{`${(Number(members.AskReddit) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="funny"><h3>r/funny</h3><h4 className="memberCount">{`${(Number(members.Funny) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="news"><h3>r/news</h3><h4 className="memberCount">{`${(Number(members.News) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="gaming"><h3>r/gaming</h3><h4 className="memberCount">{`${(Number(members.Gaming) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="memes"><h3>r/memes</h3><h4 className="memberCount">{`${(Number(members.Memes) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
        </div>
    )
};