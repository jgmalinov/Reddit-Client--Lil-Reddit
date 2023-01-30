import { loadingSelector, loadingStyleSelector, toggleLoading, initialSelector, toggleInitial } from "./loadingScreenSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { scrollEnable } from "../Utilities/Utilities";

export default function LoadingScreen(args) {
    const dispatch = useDispatch();
    const loading = useSelector(loadingSelector);
    const initial = useSelector(initialSelector);
    const style = useSelector(loadingStyleSelector);
    


    useEffect(() => {
        let keyframes, animation, iterations;
        const domElement = document.getElementById("logo");

        if(loading && initial) {
            setTimeout(() => {
                dispatch(toggleLoading(false));
                dispatch(toggleInitial(false));
                scrollEnable();
            }, 8000);

            iterations = 16;

        } else if (loading && !initial) {
            setTimeout(() => {
                dispatch(toggleLoading(false));
                scrollEnable();
            }, 1000);

            iterations = 2;
        };
 
        keyframes = new KeyframeEffect(
            domElement,
            [{transform: 'rotate(0deg)'}, {transform: 'rotate(360deg)'}],
            {duration: 500, direction: 'alternate', iterations: iterations, easing: 'ease-in-out'}
        );
        animation = new Animation(keyframes, document.timeline);
        animation.play();
        
    });
    
    return (
        <div id="loading" style={loading ? style[1] : style[0]}>
            <i className="fa-brands fa-reddit" id="logo"></i>
        </div>
    )
}