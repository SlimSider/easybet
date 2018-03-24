export class Match {
  constructor(home?: string, away?: string, date?: Date, status?: boolean) {
    this.home = home;
    this.away = away;
    this.date = date;
    this.status = status;
  }
  private id: number;
  private home: string;
  private away: string;
  private date: Date;
  private status: boolean;
  private events: Array<Event>;
}
