import {Event} from "./event";

export class Bet {

  private id: number;
  private stake: number;
  private odds: number;
  private won: boolean;
  private events;
  private choices: Array<string>;
  private active: boolean;

  constructor(stake?: number, odds?: number, won?: boolean, active?: boolean, events?, choices?: Array<string>) {
    this.stake = stake;
    this.odds = odds;
    this.won = won;
    this.active = active;
    this.events = events ? events : new Set<Event>();
    this.choices = choices;
  }

  geStake(): number {
    return this.stake;
  }

  setStake(value: number) {
    this.stake = value;
  }

  getOdds(): number {
    return this.odds;
  }

  setOdds(value: number) {
    this.odds = value;
  }

  getWon(): boolean {
    return this.won;
  }

  setWon(value: boolean) {
    this.won = value;
  }

  getEvents() {
    return this.events;
  }

  setEvents(value) {
    this.events = value;
  }

  getChoices() : Array<string> {
    return this.choices;
  }

  setChoices(choices: Array<string>) {
    this.choices = choices;
  }

  setActive(active : boolean) {
    this.active = active;
  }

  isActive() : boolean {
    return this.active;
  }

  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }
}
