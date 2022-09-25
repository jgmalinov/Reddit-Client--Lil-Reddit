import { setSortCriteria, setLastSearch, selectAfter, selectBefore, selectFirstCall, selectLastSearch, selectSortCriteria } from './SearchBarSlice';
import { useSelector, useDispatch } from 'react-redux';
import { postSelector } from '../Main/MainSlice';
import { Search } from '../Utilities/Utilities';
import Suggestions from "../Suggestions/suggestions";
import { selectSelected, setSelected } from '../Suggestions/suggestionsSlice';


export default function SearchBar(args) {
    const dispatch = useDispatch();
    const before = useSelector(selectBefore);
    const after = useSelector(selectAfter);
    const posts = useSelector(postSelector);
    const firstCall = useSelector(selectFirstCall);
    let lastSearch = useSelector(selectLastSearch);
    let sortCriteria = useSelector(selectSortCriteria);
    let selectedSubreddit = useSelector(selectSelected);


    function SearchWrapper(e) {
        if (e.target === document.getElementById('searchbar')) {
            lastSearch = e.target.querySelector('input[type="text"]').value;
            dispatch(setLastSearch(lastSearch));
            selectedSubreddit = '';
            dispatch(setSelected(''));
            sortCriteria = 'hot';
            dispatch(setSortCriteria('hot'));
        }
        Search(e, before, after, lastSearch, firstCall, sortCriteria, dispatch, selectedSubreddit);
    }

    function sortOut(e) {
        sortCriteria = e.target.value;
        dispatch(setSortCriteria(sortCriteria));
        Search(e, before, after, lastSearch, firstCall, sortCriteria, dispatch, selectedSubreddit);
    }

    function sortType () {
        if (!selectedSubreddit) {
            return <select name='sort' id='sort' value={sortCriteria} onChange={sortOut}>
                        <option value='relevance'>Relevance</option>
                        <option value='hot'>Hot</option>
                        <option value='top'>Top</option>
                        <option value='new'>New</option>
                        <option value='comments'>Comments</option>
                    </select>
        } else {
            return <select name='sort' id='sort' value={sortCriteria} onChange={sortOut}>
                        <option value='hot'>Hot</option>
                        <option value='rising'>Rising</option>
                        <option value='top'>Top</option>
                        <option value='new'>New</option>
                    </select>
        }
    }

    return (
        <div id='navigation'>
            <form id='searchbar' onSubmit={SearchWrapper}>
                <input type='text' placeholder='Search'></input>
                <button><i className="fa-brands fa-searchengin"></i></button>
                <label>Sort</label>
                {sortType()}
            </form>
            <button id='previous' disabled={!before} onClick={SearchWrapper}>Previous</button>
            <button id='next'disabled={(!after && before) || Object.keys(posts).length === 0} onClick={SearchWrapper}>Next</button>
            <div id='suggestions'>
                <Suggestions before={before} after={after} firstCall={firstCall} lastSearch={lastSearch} sortCriteria={sortCriteria}/>
            </div>
        </div>
    )
}


