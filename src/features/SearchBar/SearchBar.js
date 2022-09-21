import { updateBeforeAndAfter, toggleFirstCall, setLastSearch, setSortCriteria, selectAfter, selectBefore, selectFirstCall, selectLastSearch, selectSortCriteria } from './SearchBarSlice';
import { useSelector, useDispatch } from 'react-redux';
import { postSelector } from '../Main/MainSlice';
import { postCreator, Search } from '../Utilities/Utilities';


export default function SearchBar(args) {
    const dispatch = useDispatch();
    const before = useSelector(selectBefore);
    const after = useSelector(selectAfter);
    const posts = useSelector(postSelector);
    const firstCall = useSelector(selectFirstCall);
    const lastSearch = useSelector(selectLastSearch);
    const sortCriteria = useSelector(selectSortCriteria);

    function SearchWrapper(e) {
        Search(e, before, after, lastSearch, firstCall, sortCriteria, dispatch);
    }

    function sortOut(e) {
        dispatch(setSortCriteria(e.target.value));
        Search(e, before, after, lastSearch, firstCall, sortCriteria, dispatch);
    }

    return (
        <div>
            <form id='searchbar' onSubmit={SearchWrapper}>
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
            <button id='previous' disabled={!before} onClick={SearchWrapper}>Previous</button>
            <button id='next'disabled={(!after && before) || Object.keys(posts).length === 0} onClick={SearchWrapper}>Next</button>
        </div>
    )
}

//  : await fetch(`https://www.reddit.com/search.json?q=${userInput}&after=${after}&count=20`);