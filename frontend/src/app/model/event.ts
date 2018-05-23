import {Type} from "./enums/type";

export class Event {

  constructor(homeOdds?: number, drawOdds?: number, awayOdds?: number, type?: Type, active?: boolean, line?: number) {
    this.homeOdds = homeOdds;
    this.drawOdds = drawOdds;
    this.awayOdds = awayOdds;
    this.type = type;
    this.active = active;
    this.line = line;
  }

  private id: number;
  private homeOdds: number;
  private drawOdds: number;
  private awayOdds: number;
  private type: Type;
  private line: number;
  private active: boolean;
}
