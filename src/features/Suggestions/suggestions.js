import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMembers, setSelected, selectSubreddits, selectMembers, selectSelected } from "./suggestionsSlice";
import { setSortCriteria, selectAfter, selectBefore, selectFirstCall, selectLastSearch, selectSortCriteria } from '../SearchBar/SearchBarSlice';
import { postCreator, Search } from "../Utilities/Utilities";

export default function Suggestions(args) {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const members = useSelector(selectMembers);
    const selectedSubreddit = useSelector(selectSelected);
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

    async function subredditSearchWrapper(e) {
        dispatch(setSelected(e.currentTarget.id));
        Search(e, args.before, args.after, args.lastSearch, args.firstCall, args.sortCriteria, dispatch, e.currentTarget.id);
    }

    return (
        <div id="subreddits">
            <div className='subreddit' id="AskReddit" onClick={subredditSearchWrapper}><h3>r/Ask Reddit...</h3><h4 className="memberCount">{`${(Number(members.AskReddit) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="funny" onClick={subredditSearchWrapper}><h3>r/funny</h3><h4 className="memberCount">{`${(Number(members.Funny) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="news" onClick={subredditSearchWrapper}><h3>r/news</h3><h4 className="memberCount">{`${(Number(members.News) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="gaming" onClick={subredditSearchWrapper}><h3>r/gaming</h3><h4 className="memberCount">{`${(Number(members.Gaming) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
            <div className='subreddit' id="memes" onClick={subredditSearchWrapper}><h3>r/memes</h3><h4 className="memberCount">{`${(Number(members.Memes) / 1000000).toFixed(1)}`}m</h4><h5>members</h5></div>
        </div>
    )
};