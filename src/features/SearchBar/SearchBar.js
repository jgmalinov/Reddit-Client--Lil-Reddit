import { updateBeforeAndAfter, toggleFirstCall, setLastSearch, setSortCriteria, selectAfter, selectBefore, selectFirstCall, selectLastSearch, selectSortCriteria } from './SearchBarSlice';
import { useSelector, useDispatch } from 'react-redux';
import { postSelector } from '../Main/MainSlice';
import { postCreator } from '../Utilities/Utilities';


export default function SearchBar(args) {
    const dispatch = useDispatch();
    const before = useSelector(selectBefore);
    const after = useSelector(selectAfter);
    const posts = useSelector(postSelector);
    const firstCall = useSelector(selectFirstCall);
    const lastSearch = useSelector(selectLastSearch);
    const sortCriteria = useSelector(selectSortCriteria);

    async function Search(e) {
        e.preventDefault();
        let response;
        let scenario;
        switch (e.target) {
            case document.getElementById('searchbar'):
                scenario = 'newSearch';
                const userInput = e.target.querySelector('input[type="text"]').value;
                dispatch(setLastSearch(userInput));
                response = await fetch(`https://www.reddit.com/search.json?q=${userInput}&sort=${sortCriteria}`, {headers: {'Cookie': 'SameSite=None; Secure' }});
                break;
            case document.getElementById('next'):
                scenario = 'next';
                response = await fetch(`https://www.reddit.com/search.json?q=${lastSearch}&sort=${sortCriteria}&after=${after}&limit=20`, {headers: {'Cookie': 'SameSite=None; Secure' }});
                break;
            case document.getElementById('previous'):
                scenario = 'previous';
                response = await fetch(`https://www.reddit.com/search.json?q=${lastSearch}&sort=${sortCriteria}&before=${before}&limit=20`, {headers: {'Cookie': 'SameSite=None; Secure' }});
                break;
            default:
                scenario = 'newSearch';
                console.log(e.target.value);
                response = await fetch(`https://www.reddit.com/search.json?q=${lastSearch}&sort=${e.target.value}&limit=20`, {headers: {'Cookie': 'SameSite=None; Secure' }});
        };
        
        const resultsJson = await response.json();
        const resultsArray = resultsJson.data.children;

        dispatch(updateBeforeAndAfter({scenario, after: resultsJson.data.after}));
        if (firstCall) {
            dispatch(toggleFirstCall());
        };

        postCreator(dispatch, resultsArray);
    };

    function sortOut(e) {
        dispatch(setSortCriteria(e.target.value));
        Search(e);
    }

    return (
        <div>
            <form id='searchbar' onSubmit={Search}>
                <input type='text' placeholder='Search'></input>
                <button><i className="fa-brands fa-searchengin"></i></button>
                <label>Sort</label>
                <select name='sort' id='sort' onChange={sortOut}>
                    <option value='relevance'>Relevance</option>
                    <option value='hot'>Hot</option>
                    <option value='top'>Top</option>
                    <option value='new'>New</option>
                    <option value='comments'>Comments</option>
                </select>
            </form>
            <button id='previous' disabled={!before} onClick={Search}>Previous</button>
            <button id='next'disabled={(!after && before) || Object.keys(posts).length === 0} onClick={Search}>Next</button>
        </div>
    )
}

//  : await fetch(`https://www.reddit.com/search.json?q=${userInput}&after=${after}&count=20`);