const fromMiddleToDestinationVW = 41.25;
const offsetToCenter = -50;
const shadowAdjustment = 1.5;
const verticalAdjustment = -6;
let vw = 12;
let vwSmaller = 9.1;
let translateX = 294.75;
let translateXSmaller = fromMiddleToDestinationVW / vwSmaller * 100 + offsetToCenter + shadowAdjustment;
let translateY = 110;


export const data = {
    AskReddit: ["r/AskReddit", -170, translateX, translateY * 4, translateXSmaller, translateY * 4 + verticalAdjustment],
    funny: ["r/funny", -50,  translateX, translateY * 3, translateXSmaller, translateY * 3 + verticalAdjustment],
    news: ["r/news", 190, translateX, translateY * 2, translateXSmaller, translateY * 2 + verticalAdjustment],
    gaming: ["r/gaming", 70, translateX, translateY * 1, translateXSmaller, translateY * 1 + verticalAdjustment],
    memes: ["r/memes", -290, translateX, translateY * 0, translateXSmaller, translateY * 0 + verticalAdjustment]
};

const eventListeners = [];
export function animationCreator() {
    for (let subreddit in data) {
        console.log('hleb');
        const domElement = document.getElementById(subreddit);
        const keyframes = new KeyframeEffect(
            domElement,
            [ { transform: `translate(${data[subreddit[1]]}%)`, 'aspect-ratio': '1 / 1', width: '12vw'}, {transform: `translate(${data[subreddit][2]}%)`, 'aspect-ratio': '1 / 1', width: '12vw'}, {transform: `translate(${data[subreddit][4]}%, ${data[subreddit][5]}%)`, 'aspect-ratio': '1 / 1', width: '9.1vw'}],
            { duration: 200, fill: 'backwards', direction: 'reverse'}
        );
    
        const animation = new Animation(keyframes, document.timeline);
        animation.id = subreddit;

        function play(e) {
            const eventListenerObj = eventListeners.find((element) => element.subreddit === animation.id);
            const indexOfEventListenerObj = eventListeners.indexOf(eventListenerObj);
            const reversing = eventListenerObj.reversing;
            const lastScrollY = eventListeners[indexOfEventListenerObj].lastScrollY;
            const currentScrollY = window.scrollY;

            if (lastScrollY < currentScrollY && reversing === 'AtoB') {
                animation.reverse()
                eventListeners[indexOfEventListenerObj].reversing = 'BtoA';
            } else if (lastScrollY > currentScrollY && reversing === 'BtoA' && currentScrollY <= 80) {
                animation.reverse();
                eventListeners[indexOfEventListenerObj].reversing = 'AtoB';
            }
            eventListeners[indexOfEventListenerObj].lastScrollY = window.scrollY;
        };

        function reverse(e) {
            if (0 <= window.scrollY && window.scrollY <= 10 && animation.playState !== 'running') {
                animation.reverse();
                animation.pause();   
            }
        };
        
        eventListeners.push({subreddit, animation, play, reverse, reversing: 'AtoB', lastScrollY: 0});
    };
    
    for (let i = 0; i < eventListeners.length; i++) {
        window.addEventListener('scroll', eventListeners[i].play);
        
    };

    const littleLogo = document.getElementById('littleLogo');
    const inputBar = document.getElementById('inputBar');
    const keyframes = new KeyframeEffect(
        littleLogo,
        [{position: 'relative', bottom: '0px'}, {position: 'relative', bottom: '8px'}, {position: 'relative', bottom: '0px'}],
        {duration: 130, easing: 'ease-in'}
    )
    const littleLogoAnimation = new Animation(keyframes, document.timeline);
    const playLittleLogoAnimation = (e) => {
        littleLogoAnimation.play();
    }
    inputBar.addEventListener('keypress', playLittleLogoAnimation);
};
