function calculateMaxProfit(timeUnit) {
  const earnings = new Array(timeUnit + 1).fill(0);
  const propertyCounts = new Array(timeUnit + 1).fill([0, 0, 0]);

  const theatreIncome = 1500;
  const pubIncome = 1000;
  const parkIncome = 3000;
  const theatreBuildTime = 5;
  const pubBuildTime = 4;
  const parkBuildTime = 10;

  for (let i = 1; i <= timeUnit; i++) {
    if (i >= theatreBuildTime && earnings[i - theatreBuildTime] + theatreIncome > earnings[i]) {
      earnings[i] = earnings[i - theatreBuildTime] + theatreIncome;
      propertyCounts[i] = [propertyCounts[i - theatreBuildTime][0] + 1, propertyCounts[i - theatreBuildTime][1], propertyCounts[i - theatreBuildTime][2]];
    }

    if (i >= pubBuildTime && earnings[i - pubBuildTime] + pubIncome > earnings[i]) {
      earnings[i] = earnings[i - pubBuildTime] + pubIncome;
      propertyCounts[i] = [propertyCounts[i - pubBuildTime][0], propertyCounts[i - pubBuildTime][1] + 1, propertyCounts[i - pubBuildTime][2]];
    }

    if (i >= parkBuildTime && earnings[i - parkBuildTime] + parkIncome > earnings[i]) {
      earnings[i] = earnings[i - parkBuildTime] + parkIncome;
      propertyCounts[i] = [propertyCounts[i - parkBuildTime][0], propertyCounts[i - parkBuildTime][1], propertyCounts[i - parkBuildTime][2] + 1];
    }
  }

  const [theatreCount, pubCount, parkCount] = propertyCounts[timeUnit];

  return `Theatre: ${theatreCount}, Pub: ${pubCount}, Commercial Park: ${parkCount}\nTotal Earnings: $${earnings[timeUnit]}`;
}


