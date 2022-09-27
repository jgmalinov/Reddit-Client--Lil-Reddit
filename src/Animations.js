const fromMiddleToDestinationVW = 41.25;
const offsetToCenter = -50;
const shadowAdjustment = 1.5;
const verticalAdjustment = -60;
let vw = 12;
let vwSmaller = 10;
let translateX = 294.75;
let translateXSmaller = fromMiddleToDestinationVW / vwSmaller * 100 + offsetToCenter + shadowAdjustment;
let translateY = 110;


export const data = {
    AskReddit: ["r/Ask Reddit...", -170, translateX, translateY * 4, translateXSmaller, translateY * 4 + verticalAdjustment],
    funny: ["r/funny", -50,  translateX, translateY * 3, translateXSmaller, translateY * 3 + verticalAdjustment],
    news: ["r/news", 190, translateX, translateY * 2, translateXSmaller, translateY * 2 + verticalAdjustment],
    gaming: ["r/gaming", 70, translateX, translateY * 1, translateXSmaller, translateY * 1 + verticalAdjustment],
    memes: ["r/memes", -290, translateX, translateY * 0, translateXSmaller, translateY * 0 + verticalAdjustment]
};
