import { useSelector } from "react-redux";
import { postSelector } from "./MainSlice";
import { PostsConverter } from "../Utilities/Utilities";

export function Main(args) {
    const posts = useSelector(postSelector);
    return (
        <PostsConverter posts={posts}/>
    )
}



