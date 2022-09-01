export  function postsConverter(posts) {
    const jsxPosts = [];
    for(let post in posts) {
        const currentPost = posts[post];
            let jsxPost;
            if (isImage(currentPost.url)) {
                jsxPost = (
                    <div className='post' id={post} style={{width:'640px'}}>
                        <section className="info">
                            <h5>/{currentPost.subreddit}, Posted by: {currentPost.author}</h5>
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
            } else {
                jsxPost = iFrameEmbedder(currentPost);
            }
            jsxPosts.push(jsxPost);
        }

    const iframePosts = jsxPosts.filter(post => post.type === 'iframe');
    const nonIframePosts = jsxPosts.filter(post => post.type !== 'iframe');
    const jsxPostsOrdered = nonIframePosts.concat(iframePosts);
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

