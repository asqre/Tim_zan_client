
// In the config below score is also referred as points
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
    // X and Y based on the width and height of the background
    cats: [
        {x: 2, y:15.1, requiresItem: false},
        {x: 60, y:24.6, requiresItem: false},
        {x: -2, y:39, requiresItem: false},
        {x: 68, y:43.5, requiresItem: true},
        {x: 100, y:100, requiresItem: true},
    ],
    // Meow bar 
    // Points logic: scoreNeeded = CONFIG.progressBarEveryPoints - (CONFIG.progressBarEveryPoints * multiplier) 
    // If user has item "Score Multiplier":  scoreNeeded = scoreNeeded * CONFIG.scoreMultiplierModifier
    progressBarEveryTicks: 20, // Only for interaction phase
    progressBarEveryPoints: 100,
    progressBarEveryPointsBy: 50,
    progressSpeedMultiplierPerCat: 0.1, // The higher the number the less points will be needed to progress the meow bar ( !| example |! progressBarEveryPoints: 1000 | For each cat present the number of points will be reduced by 100 if | progressSpeedMultiplierPerCat: 0.1 |)
    progressMultiplierItem: 0.2,
    // Interaction phase
    TickForNextInteractionTick: 1,
    interactionDefaultSpeed: 4,
      // Do not change values if there isn't an image for the percentage set
    petSuccessPercentage: 60,
    scratchSuccessPercentage: 30,
    rubSuccessPercentage: 15,
    // Rewards
    petSuccessPointsAward: 200, 
    petSuccessCoinsAward: 2, 
    petFailPointsAward: 0,
    petFailCoinsAward: 0,
    scratchSuccessPointsAward: 500,
    scratchSuccessCoinsAward: 5,
    scratchFailPointsAward: 0,
    scratchFailCoinsAward: 0,
    rubSuccessPointsAward: 1000,
    rubSuccessCoinsAward: 10,
    rubFailPointsAward: 0,
    rubFailCoinsAward: 0,
    // Decreases the rewards for each bar progression
    // Logic: CONFIG.rubFailPointsAward - (CONFIG.rubFailPointsAward * CONFIG.DecreaseAwardRate ) * (100 - meowBarProgress)
    DecreaseAwardRate: 0.005, 
    FailedInteractionMeowMeterPenalty: 5,

    items: [
      {name: "Fish Platter", addedCats: 1, scoreMultiplier: 0, description: "increase the number of cat visiting by 1", cost: 1, quantity: 1},
      {name: "Seafood Platter", addedCats: 2, scoreMultiplier: 0, description: "increase the number of cat visiting by 2", cost: 1, quantity: 1},
      {name: "Mouse Toy", addedCats: 0, scoreMultiplier: 1.5, description: "1.5x Score Multiplier", cost: 1, quantity: 1},
      {name: "Feather Toy", addedCats: 0, scoreMultiplier: 2, description: "2x Score Multiplier", cost: 1, quantity: 1},
      {name: "Catnip Leaft", addedCats: 0, scoreMultiplier: 0, description: "increase chance of succesful interaction", cost: 1, quantity: 1},
      {name: "Catnip Bocquet", addedCats: 0, scoreMultiplier: 0, description: "Greatly increase chance of succesful interaction", cost: 1, quantity: 1},
  ],
    // Store config
    cost1000Coins: 1,
    cost5000Coins: 1,
    cost10000Coins: 1,

}
