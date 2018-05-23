import {Match} from "./match";

export class BaseballMatch extends Match{

  private final_home_score: number;
  private final_away_score: number;

  constructor(home?: string, away?: string, competition?: string, sport?: string, date?: string, active?: boolean, events?: Set<Event>, final_home_score?: number, final_away_score?: number) {
    super(home, away, competition, sport, date, active, events);
    this.final_home_score = final_home_score;
    this.final_away_score = final_away_score;
  }
}
