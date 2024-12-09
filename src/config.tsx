
export const CONFIG = {
    tickDurationMs: 2,
    // Rythm game options
    TickForNextPSTick: 1,
    PSDefaultSpeedPx: 2,
    PSMAXSpeedVariationPx: 1,
    PSMAXPerfectAcceptanceMargin: 0.05,
    PSPerfectPoints: 200,
    PSMAXAcceptanceMargin: 0.2,
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
    progressBarEveryTicks: 20,
    progressSpeedMultiplierPerCat: 0.1,
    progressMultiplierItem: 0.2,
    // Interaction phase
    TickForNextInteractionTick: 1,
    interactionDefaultSpeedPx: 4,
      // Do not change values if there isn't an image for the percentage set
    petSuccessPercentage: 60,
    scratchSuccessPercentage: 30,
    rubSuccessPercentage: 15,
     // Rewards
    petSuccessPointsAward: 200,
    petFailPointsAward: 100,
    scratchSuccessPointsAward: 500,
    scratchFailPointsAward: 250,
    rubSuccessPointsAward: 1000,
    rubFailPointsAward: 500,
      // Decreases the rewards for each bar progression (0 is the lowest with 1 the highest giving full reward) 
    DecreaseAwardRate: 0.05,
    FailedInteractionMeowMeterPenalty: 5

}
