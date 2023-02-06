import { useSelector, useDispatch } from "react-redux";
import { postSelector } from "./MainSlice";
import { PostsConverter } from "../Utilities/Utilities";



export function Main(args) {
    const posts = useSelector(postSelector);
    if (!posts) {
        
    }

    return (
        <div id="mainSection" >
            <PostsConverter posts={posts}/>
        </div>
    );
};

