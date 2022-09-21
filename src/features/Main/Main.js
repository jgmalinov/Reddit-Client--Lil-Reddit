import { useSelector } from "react-redux";
import { postSelector } from "./MainSlice";
import { PostsConverter } from "../Utilities/Utilities";
import Suggestions from "../Suggestions/suggestions";

export function Main(args) {
    const posts = useSelector(postSelector);
    return (
        <div>
            <Suggestions/>
            <PostsConverter posts={posts}/>
        </div>
    )
}



