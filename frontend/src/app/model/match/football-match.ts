import {Match} from "./match";

export class FootballMatch extends Match {

  private ht_home_score: number;
  private ht_away_score: number;
  private final_home_score: number;
  private final_away_score: number;

  constructor(home?: string, away?: string, competition?: string, sport?: string, date?: string, active?: boolean, events?: Set<Event>, ht_home_score?: number, ht_away_score?: number, final_home_score?: number, final_away_score?: number) {
    super(home, away, competition, sport, date, active, events);
    this.ht_home_score = ht_home_score;
    this.ht_away_score = ht_away_score;
    this.final_home_score = final_home_score;
    this.final_away_score = final_away_score;
  }
}
