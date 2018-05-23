export abstract class Match {
  constructor(home?: string, away?: string, competition?: string, sport?: string, date?: string, active?: boolean, events?: Set<Event>) {
    this.home = home;
    this.away = away;
    this.competition = competition;
    this.sport = sport;
    this.date = date;
    this.active = active;
    this.events = events ? events : new Set<Event>();
  }
  private id: number;
  private home: string;
  private away: string;
  private competition: string;
  private sport: string;
  private date: string;
  private active: boolean;
  private events: Set<Event>;

  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getHome(): string {
    return this.home;
  }

  setHome(value: string) {
    this.home = value;
  }

  getAway(): string {
    return this.away;
  }

  setAway(value: string) {
    this.away = value;
  }

  getCompetition(): string {
    return this.competition;
  }

  setCompetition(value: string) {
    this.competition = value;
  }

  getSport(): string {
    return this.sport;
  }

  setSport(value: string) {
    this.sport = value;
  }

  getDate(): string {
    return this.date;
  }

  setDate(value: string) {
    this.date = value;
  }

  getActive(): boolean {
    return this.active;
  }

  setActive(value: boolean) {
    this.active = value;
  }

  getEvents(): Set<Event> {
    return this.events;
  }

  setEvents(value: Set<Event>) {
    this.events = value;
  }
}
