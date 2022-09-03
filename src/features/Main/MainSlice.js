import { createSlice } from "@reduxjs/toolkit";

const Main = createSlice({
    name: 'Main',
    initialState: {
        posts: {
        }
    },
    
    reducers: {
        addPost(state, action) {
            const id = action.payload.id;
            state.posts[id] = action.payload;
        },
        clearPosts(state) {
            state.posts = {};
        },
        addComments(state, action) {
            const id = action.payload.id;
            state.posts[id].comments = action.payload.comments;
        },
        expandComments(state, action) {
            const id = action.payload.id;
            state.posts[id].commentsExpanded ? state.posts[id].commentsExpanded = false : state.posts[id].commentsExpanded = true;
        }
    }
})


export const postSelector = (state) => state.Main.posts;
export const { addPost, clearPosts, addComments, expandComments} = Main.actions;
export default Main.reducer;