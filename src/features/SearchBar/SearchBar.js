import { setSortCriteria, setLastSearch, selectAfter, selectBefore, selectFirstCall, selectLastSearch, selectSortCriteria } from './SearchBarSlice';
import { useSelector, useDispatch } from 'react-redux';
import { postSelector } from '../Main/MainSlice';
import { Search, scrollDisable } from '../Utilities/Utilities';
import Suggestions from "../Suggestions/suggestions";
import { selectSelected, setSelected } from '../Suggestions/suggestionsSlice';
import { toggleLoading } from '../Loading/loadingScreenSlice';

export default function SearchBar(args) {
    const dispatch = useDispatch();
    const before = useSelector(selectBefore);
    const after = useSelector(selectAfter);
    const posts = useSelector(postSelector);
    const firstCall = useSelector(selectFirstCall);
    let lastSearch = useSelector(selectLastSearch);
    let sortCriteria = useSelector(selectSortCriteria);
    let selectedSubreddit = useSelector(selectSelected);
    const navButtonsView = Object.keys(posts).length === 0 ? {display: 'none'} : {display: 'flex'};
    const sortButtonStyles = {};
    const sortButtons = ['hot', 'comments', 'relevance', 'top', 'new', 'rising' ];
    for (let i=0; i < sortButtons.length; i++) {
        const sortType = sortButtons[i]; 
        const buttonStyle = sortCriteria === sortType ? {'box-shadow': 'black 4px 3px 1.5px 0.2px', position: 'relative', right: '3px', bottom: '3px'} : {};
        sortButtonStyles[sortType] = buttonStyle;
    }



    function SearchWrapper(e) {
        scrollDisable();
        dispatch(toggleLoading(true));
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
        scrollDisable();
        dispatch(toggleLoading(true));
        sortCriteria = e.target.value;
        dispatch(setSortCriteria(sortCriteria));
        Search(e, before, after, lastSearch, firstCall, sortCriteria, dispatch, selectedSubreddit);
    }

    function sortType () {
        if (!selectedSubreddit) {
            return <div name='sort' id='sort'>
                        <button className='button' id='relevance' value='relevance' style={sortButtonStyles.relevance} onClick={sortOut}>Relevance</button>
                        <button className='button' id='hot' value='hot' style={sortButtonStyles.hot} onClick={sortOut}>Hot</button>
                        <button className='button' id='top' value='top' style={sortButtonStyles.top} onClick={sortOut}>Top</button>
                        <button className='button' id='new' value='new' style={sortButtonStyles.new} onClick={sortOut}>New</button>
                        <button className='button' id='comments' value='comments' style={sortButtonStyles.comments} onClick={sortOut}>Comments</button>
                    </div>
        } else {
            return <div name='sort' id='sort'>
                        <button className='button' id='rising' value='rising' onClick={sortOut}>Rising</button>
                        <button className='button' id='hot' value='hot' style={sortButtonStyles.hot} onClick={sortOut}>Hot</button>
                        <button className='button' id='top' value='top' style={sortButtonStyles.top} onClick={sortOut}>Top</button>
                        <button className='button' id='new' value='new' style={sortButtonStyles.new} onClick={sortOut}>New</button>
                    </div>
        }
    }

    

    return (
        <div id='navigation'>
            <div id='suggestions'>
                <Suggestions before={before} after={after} firstCall={firstCall} lastSearch={lastSearch} sortCriteria={sortCriteria}/>
            </div>
            <div id='browse'>
                <form id='searchbar' onSubmit={SearchWrapper}>
                    <input type='text' placeholder='Search'></input>
                    <button><i className="fa-brands fa-searchengin"></i></button>
                    <label>Sort</label>
                </form>
                <div id='navButtons' style={navButtonsView}>
                    {sortType()}
                    <section id='nextOrPrevious'>
                        <button id='previous' className='button' disabled={!before} onClick={SearchWrapper}>Previous</button>
                        <button id='next'className='button' disabled={(!after && before) || Object.keys(posts).length === 0} onClick={SearchWrapper}>Next</button>
                    </section>
                </div>
            </div>
        </div>
    )
}


