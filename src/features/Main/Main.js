import { useSelector, useDispatch } from "react-redux";
import { postSelector } from "./MainSlice";
import { PostsConverter } from "../Utilities/Utilities";
import { toggleLoading } from "../Loading/loadingScreenSlice";



export function Main(args) {
    const posts = useSelector(postSelector);
    const dispatch = useDispatch();

    return (
        <div id="mainSection" >
            <PostsConverter posts={posts}/>
        </div>
    );
};

