interface RaceResult {
  reindeerName: string;
  totalDistance: number;
}

class Reinder {
  private cycleDuration: number;

  constructor(
    private name: string,
    private speed: number,
    private flyDuration: number,
    restDuration: number
  ) {
    this.cycleDuration = flyDuration + restDuration;
  }

  race(duration: number): RaceResult {
    let raceTime: number = 0;
    let flyingTime: number = 0;

    while (raceTime < duration) {
      const isFirstFlightInProgress: boolean = raceTime / this.flyDuration < 1;
      const canFly: boolean = raceTime % this.cycleDuration < this.flyDuration;

      if (isFirstFlightInProgress || canFly) {
        flyingTime++;
      }
      raceTime++;
    }

    return {
      reindeerName: this.name,
      totalDistance: this.speed * flyingTime,
    };
  }
}

function printResults(reindeers: Reinder[], duration: number): void {
  console.log("#################################");
  console.log("###########  RESULTS  ###########");
  console.log("#################################");
  reindeers
    .map((reindeer: Reinder) => reindeer.race(duration))
    .sort((r1: RaceResult, r2: RaceResult) => r2.totalDistance - r1.totalDistance)
    .forEach((result: RaceResult, index: number) => console.log(`${index}. ${result.reindeerName} made ${result.totalDistance} km in ${duration} seconds.`));
}

function main(): void {
  const DURATION: number = 2503;

  const reindeers: Reinder[] = [
    new Reinder("Vixen", 19, 7, 124),
    new Reinder("Rudolph", 3, 15, 28),
    new Reinder("Donner", 19, 9, 164),
    new Reinder("Blitzen", 19, 9, 158),
    new Reinder("Comet", 13, 7, 82),
    new Reinder("Cupid", 25, 6, 145),
    new Reinder("Dasher", 14, 3, 38),
    new Reinder("Dancer", 3, 16, 37),
    new Reinder("Prancer", 25, 6, 143),
  ];

  printResults(reindeers, DURATION);
}

main();
