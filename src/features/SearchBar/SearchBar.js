import { updateBeforeAndAfter, toggleFirstCall, selectAfter, selectBefore, selectFirstCall } from './SearchBarSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, addComments, clearPosts, postSelector } from '../Main/MainSlice';
import { commentsExtractor } from '../Utilities/Utilities';


export default function SearchBar(args) {
    const dispatch = useDispatch();
    const before = useSelector(selectBefore);
    const after = useSelector(selectAfter);
    const posts = useSelector(postSelector);
    const firstCall = useSelector(selectFirstCall);


    async function Search(e) {
        e.preventDefault();
        const userInput = e.target.querySelector('input[type="text"]').value
        const response = await fetch(`https://www.reddit.com/search.json?q=${userInput}`, {headers: {'Cookie': 'SameSite=None; Secure' }});
        const resultsJson = await response.json();
        
        dispatch(updateBeforeAndAfter({before: resultsJson.data.before, after: resultsJson.data.after}));
        if (firstCall) {
            dispatch(toggleFirstCall());
        }
        const resultsArray = resultsJson.data.children;

        dispatch(clearPosts());
        resultsArray.forEach(result => {
            console.log(result);
            const neededData = {
                id: result.data.id,
                ups: result.data.ups,
                downs: result.data.downs,
                title: result.data.title,
                url: result.data.url,
                author: result.data.author,
                thumbnail: result.data.thumbnail,
                subreddit: result.data.subreddit,
                preview: result.data.preview ? (result.data.preview.images ? result.data.preview.images[0].source.url : undefined) : undefined,
                numComments: result.data.num_comments
            };
            dispatch(addPost(neededData));
            commentsExtractor(neededData)
            .then((response) => {
                const commentsRAW = response[1].data.children;
                let commentsFiltered = [];
                let index = 0;
                commentsRAW.forEach(comment => {
                    commentsFiltered[index] = {
                        body: comment.data.body,
                        author: comment.data.author,
                        replies: comment.data.replies,
                        ups: comment.data.ups,
                        downs: comment.data.downs
                    }
                    index += 1;
                })
                dispatch(addComments({id: result.data.id, comments: commentsFiltered}));
            }); 
        });

    } 

    return (
        <form id='searchbar' onSubmit={Search}>
            <input type='text' placeholder='Search'></input>
            <button><i className="fa-brands fa-searchengin"></i></button>
        </form>
    )
}

//  : await fetch(`https://www.reddit.com/search.json?q=${userInput}&after=${after}&count=20`);