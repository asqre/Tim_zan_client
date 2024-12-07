
export const CONFIG = {
    tickDurationMs: 20,
    // Rythm game options
    PSDefaultSpeed: 0.4,
    PSMAXSpeedVariation: 0.2,
    PSMAXPerfectAcceptanceMargin: 0.05,
    PSPerfectPoints: 200,
    PSMAXAcceptanceMargin: 0.1,
    PSPartialPoints: 100,
    PSDefaultSpawnDelayTicks: 100,
    PSMAXSpawnDelayVariation: 0.2,
    // Background options
    backgroundWidthPx:350,
    backgroundHeightPx:650,
    catsSizePx: 100,
    catsItem: "More Cats",
    // X and Y based on the width and height of the background
    cats: [
        {x: 2, y:15.1, requiresItem: false},
        {x: 60, y:24.6, requiresItem: false},
        {x: -2, y:39, requiresItem: false},
        {x: 68, y:43.5, requiresItem: true},
        {x: 100, y:100, requiresItem: true},
    ],
    // Meow bar
    progressBarEveryTicks: 200

}
