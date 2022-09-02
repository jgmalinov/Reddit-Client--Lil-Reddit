export  function postsConverter(posts) {
    const iframePosts = [];
    const nonIframePosts = []; 
    for(let post in posts) {
        const currentPost = posts[post];
        const currentPostTime = currentPost.created;
        let jsxPost;
            if (isImage(currentPost.url)) {
                jsxPost = (
                    <div className='post' id={post} style={{width:'640px'}}>
                        <section className="info">
                            <span>/{currentPost.subreddit}, Posted by: {currentPost.author} {dateConverter(Number(currentPostTime))}</span>
                            <h3>{currentPost.title}</h3>
                        </section>
                        <section className="visual-content">
                            {<img src={currentPost.url} alt='content visualization'></img>}
                        </section>
                        <section className="statistics">
                            <div id="centerstats">
                                <a>{posts[post].numComments} comments</a>
                                <div className="thumbs">
                                <a>{posts[post].ups}<i className="fa-regular fa-thumbs-up"></i></a>
                                <a>{posts[post].downs}<i className="fa-regular fa-thumbs-down"></i></a>
                                </div>
                            </div>
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
    return jsxPostsOrdered;
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
