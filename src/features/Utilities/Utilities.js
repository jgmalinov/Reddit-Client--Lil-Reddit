import { useDispatch } from "react-redux";
import { expandComments } from "../Main/MainSlice";
import { addPost, addComments, clearPosts} from '../Main/MainSlice';
import { toggleFirstCall, updateBeforeAndAfter, setLastSearch } from "../SearchBar/SearchBarSlice";
import { selectSelected } from "../Suggestions/suggestionsSlice";


export async function Search(e, before, after, lastSearch, firstCall, sortCriteria, dispatch, selectedSubreddit='') {
    e.preventDefault();
    let response;
    let scenario;
    const baseURL = `https://www.reddit.com/`;
    const subredditQuery = `r/${selectedSubreddit}/${sortCriteria}/.json`;
    const searchQuery = `search.json?q=${lastSearch}&sort=${sortCriteria}`;
    const config = {headers: {'Cookie': 'SameSite=None; Secure' }}
    

    switch (e.currentTarget) {
        case document.getElementById('searchbar'):
            scenario = 'newSearch';
            response = await fetch(baseURL + searchQuery + `&limit=20`, config);
            break;
        case document.getElementById('next'):
            scenario = 'next';
            response = await fetch(baseURL + (selectedSubreddit ? (subredditQuery + `?after=${after}&limit=20`): (searchQuery + `&after=${after}&limit=20`)), config);
            break;
        case document.getElementById('previous'):
            scenario = 'previous';
            response = await fetch(baseURL + (selectedSubreddit ? (subredditQuery + `?before=${before}&limit=20`): (searchQuery + `&before=${before}&limit=20`)), config);
            break;
        case document.getElementById('sort'):
            scenario = 'newSearch';
            response = await fetch(baseURL + (selectedSubreddit ? (subredditQuery + `?limit=20`) : (searchQuery + `&limit=20`)), config);
            break;
        default:
            scenario = 'newSearch';
            response = await fetch(baseURL + subredditQuery, config);
            break;
    };
    
    const resultsJson = await response.json();
    console.log(resultsJson);
    const resultsArray = resultsJson.data.children;

    dispatch(updateBeforeAndAfter({scenario, after: resultsJson.data.after}));
    if (firstCall) {
        dispatch(toggleFirstCall());
    };

    postCreator(dispatch, resultsArray);
};

export  function PostsConverter(args) {
    const posts = args.posts;
    const dispatch = useDispatch();

    function switchCommentsExpanded(event) {
        const id = event.target.id;
        dispatch(expandComments({id: id}));
    }
    const iframePosts = [];
    const nonIframePosts = []; 
    for(let post in posts) {
        const currentPost = posts[post];
        const currentPostTime = currentPost.created;
        let jsxPost;
            if (isImage(currentPost.url)) {
                jsxPost = (
                    <div className='post' id={post}>
                        <section className="info">
                            <span><a href={`https://www.reddit.com/r/${currentPost.subreddit}`} target='_blank' rel="noreferrer">/{currentPost.subreddit}</a>, Posted by: {currentPost.author} {dateConverter(Number(currentPostTime))}</span>
                            <h3>{currentPost.title}</h3>
                        </section>
                        <section className="visual-content">
                            {<img src={currentPost.url} alt='content visualization'></img>}
                        </section>
                        <section className="statistics">
                            <div id="centerstats">
                                <a id={currentPost.id} onClick={switchCommentsExpanded}>{posts[post].numComments} comments</a>
                                <div className="thumbs">
                                <a>{posts[post].ups}<i className="fa-regular fa-thumbs-up"></i></a>
                                <a>{posts[post].downs}<i className="fa-regular fa-thumbs-down"></i></a>
                                </div>
                            </div>
                        </section>
                        <section className="comments">
                            {currentPost.commentsExpanded ? commentsExpander(currentPost) : <h3></h3>}
                        </section>
                        
                    </div>
                );
                nonIframePosts.push([jsxPost, currentPostTime]);
            } else {
                jsxPost = iFrameEmbedder(currentPost);
                iframePosts.push([jsxPost, currentPostTime]);
            }
        }
    const iframePostsOrdered = (iframePosts.sort((a, b) => a[1] > b[1] ? -1 : 1)).map(a => a[0]);
    const nonIframePostsOrdered = (nonIframePosts.sort((a, b) => a[1] > b[1] ? -1 : 1)).map(a => a[0]);
    const jsxPostsOrdered = nonIframePostsOrdered.concat(iframePostsOrdered);
    return (
        <div id="main">
            {jsxPostsOrdered}
        </div>
    );
};

export function postCreator(dispatch, resultsArray) {
    dispatch(clearPosts());
    resultsArray.forEach(result => {
        const neededData = {
            id: result.data.id,
            ups: result.data.ups,
            downs: result.data.downs,
            title: result.data.title,
            url: result.data.url,
            author: result.data.author,
            thumbnail: result.data.thumbnail,
            subreddit: result.data.subreddit,
            created: result.data.created_utc,
            preview: result.data.preview ? (result.data.preview.images ? result.data.preview.images[0].source.url : undefined) : undefined,
            numComments: result.data.num_comments,
            commentsExpanded: false
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
                    downs: comment.data.downs,
                    score: comment.data.score,
                    created: comment.data.created_utc
                }
                index += 1;
            })
            dispatch(addComments({id: result.data.id, comments: commentsFiltered}));
        }); 
    });
}

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

function iFrameEmbedder(post) {
    const title = post.title;
    const subreddit = post.subreddit;
    const id = post.id;
    return (
        <iframe id="reddit-embed" title="Embedded reddit posts" src={`https://www.redditmedia.com/r/${subreddit}/comments/${id}/${title}/?ref_source=embed&amp;ref=share&amp;embed=true`} sandbox="allow-scripts allow-same-origin allow-popups" style={{border: 'none'}} height="300" width="640" scrolling="yes"></iframe>
    )

}

export async function commentsExtractor(post) {
    const url = `https://www.reddit.com/r/${post.subreddit}/comments/${post.id}.json`
    const response = await fetch(url);
    const responseJS = response.json();
    return responseJS;
}


function dateConverter(dateSeconds) {
    const nowSeconds  = Date.now() / 1000;
    const secondsPassed = nowSeconds - dateSeconds;
    const minutesPassed = secondsPassed / 60;
    const hoursPassed = minutesPassed / 60;
    const daysPassed = hoursPassed / 24;
    const monthsPassed = daysPassed / 30;
    const yearsPassed = monthsPassed / 12;
    const timePassed =  yearsPassed < 1 ? (monthsPassed < 1 ? (daysPassed < 1 ? (hoursPassed < 1 ? (minutesPassed < 1 ? [Math.round(secondsPassed), 'second'] : [Math.round(minutesPassed), 'minute'])
                                    : [Math.round(hoursPassed), 'hour']) : [Math.round(daysPassed), 'day']) : [Math.round(monthsPassed), 'month']) : [Math.round(yearsPassed), 'year'];

    return timePassed[0] < 1 ? `${timePassed[0]} ${timePassed[1]} ago` : `${timePassed[0]} ${timePassed[1]}s ago`
}

function commentsExpander(post) {
    const comments = post.comments;
    const jsxComments = [];
    for (let comment in comments) {
        const jsxComment = (
            <div className="comment">
                <span>{comments[comment].author} {dateConverter(comments[comment].created)}</span>
                <div className="commentBody">{comments[comment].body}</div>
                <section className="statistics">
                    {comments[comment].replies ? <a>{comments[comment].replies.data.children.length} replies</a> : <p>0 replies</p>}
                    {comments[comment].score >= 0 ? <a>{comments[comment].score}<i className="fa-regular fa-thumbs-up"></i></a> : <a>{comments[comment].score}<i className="fa-regular fa-thumbs-down"></i></a>} 
                </section>
            </div>
        )
        
        jsxComments.push({created: comments[comment].created, comment: jsxComment});
    }

    const jsxCommentsSorted = (jsxComments.sort((a, b) => a.created > b.created ? -1 : 1)).map(element => element.comment);
    return jsxCommentsSorted;
}