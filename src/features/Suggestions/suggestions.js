import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMembers, setSelected, selectSubreddits, selectMembers, selectSelected } from "./suggestionsSlice";
import {setLastSearch, setSortCriteria } from '../SearchBar/SearchBarSlice';
import { Search, scrollDisable, resetUI } from "../Utilities/Utilities";
import { toggleLoading } from "../Loading/loadingScreenSlice";
import { data } from "../../Animations";


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
