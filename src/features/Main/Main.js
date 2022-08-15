import { useSelector } from "react-redux";
import { postSelector } from "./MainSlice";
import { postsConverter } from "../Utilities/Utilities";

export function Main(args) {
    const posts = useSelector(postSelector);
    return (
        <div id="main">
            {posts ? postsConverter(posts) : 'Nothing here, really :('}
        </div>
    )
}



