import { loadingSelector, loadingStyleSelector, toggleLoading } from "./loadingScreenSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { scrollEnable } from "../Utilities/Utilities";

export default function LoadingScreen(args) {
    const dispatch = useDispatch();
    const loading = useSelector(loadingSelector);
    const style = useSelector(loadingStyleSelector);
    


    useEffect(() => {
        if(loading) {
            setTimeout(() => {
                dispatch(toggleLoading(false));
                scrollEnable();
            }, 1000);
        };

        const domElement = document.getElementById("logo");
        const keyframes = new KeyframeEffect(
            domElement,
            [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}],
            {duration: 500, direction: 'alternate', iterations: 2, easing: 'ease-in-out'}
        );
        const animation = new Animation(keyframes, document.timeline);
        animation.play();
        
    });
    
    return (
        <div id="loading" style={loading ? style[1] : style[0]}>
            <i className="fa-brands fa-reddit" id="logo"></i>
        </div>
    )
}