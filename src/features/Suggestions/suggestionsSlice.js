import { createSlice } from "@reduxjs/toolkit";

const suggestionsSlice = createSlice({
    name: 'Suggestions',
    initialState: {
        subreddits: {
            AskReddit: {
                name: 'AskReddit',
                baseURL: 'https://www.reddit.com/r/AskReddit/',
                members: ''
            },
            Funny: {
                name: 'Funny',
                baseURL: 'https://www.reddit.com/r/funny/',
                members: ''
            },
            News: {
                name: 'News',
                baseURL: 'https://www.reddit.com/r/news/',
                members: ''
            },
            Gaming: {
                name: 'Gaming',
                baseURL: 'https://www.reddit.com/r/gaming/',
                members: ''
            },
            Memes: {
                name: '/r/Memes the original since 2008',
                baseURL: 'https://www.reddit.com/r/memes/',
                members: ''
            }
        },
        sortQuery: '?sort=',
        sortCriteria: {
            relevance: 'relevance',
            hot: 'hot',
            top: 'top',
            new: 'new',
            comments: 'comments'
        }
    },
    reducers: {
        setMembers: (state, action) => {
            const subreddit = action.payload.subreddit;
            const members = action.payload.members;
            state.subreddits[subreddit].members = members;
        }
    }
});


export const { setMembers } = suggestionsSlice.actions;
export const selectSubreddits = (state) => state.Suggestions.subreddits;
export const selectMembers = (state) => {
    const subreddits = state.Suggestions.subreddits;
    let members = {};
    for (let subreddit in subreddits) {
        members[subreddit] = subreddits[subreddit].members;
    };
    return members;
}
export default suggestionsSlice.reducer;