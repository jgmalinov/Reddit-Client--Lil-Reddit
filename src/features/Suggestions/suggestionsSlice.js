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
            funny: {
                name: 'Funny',
                baseURL: 'https://www.reddit.com/r/funny/',
                members: ''
            },
            news: {
                name: 'News',
                baseURL: 'https://www.reddit.com/r/news/',
                members: ''
            },
            gaming: {
                name: 'Gaming',
                baseURL: 'https://www.reddit.com/r/gaming/',
                members: ''
            },
            memes: {
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
        },
        selected: '',
    },
    reducers: {
        setMembers: (state, action) => {
            const subreddit = action.payload.subreddit;
            const members = action.payload.members;
            state.subreddits[subreddit].members = members;
        },
        setSelected: (state, action) => {
            const selectedSubreddit = action.payload;
            state.selected = selectedSubreddit;
        },
        setIndex: (state) => {
            if (state.animationUnits.index !== 4) {
                state.animationUnits.index += 1;
            } else {
                state.animationUnits.index = 0;
            }
        }
    }
});


export const { setMembers, setSelected, setIndex } = suggestionsSlice.actions;
export const selectSubreddits = (state) => state.Suggestions.subreddits;
export const selectMembers = (state) => {
    const subreddits = state.Suggestions.subreddits;
    let members = {};
    for (let subreddit in subreddits) {
        members[subreddit] = subreddits[subreddit].members;
    };
    return members;
};
export const selectSelected = (state) => state.Suggestions.selected;
export const selectAnimationUnits = (state) => state.Suggestions.animationUnits;
export default suggestionsSlice.reducer;