export class Event {

  constructor(id: number, homeOdds: number, drawOdds: number, awayOdds: number, status: boolean, type: string) {
    this.id = id;
    this.homeOdds = homeOdds;
    this.drawOdds = drawOdds;
    this.awayOdds = awayOdds;
    this.status = status;
    this.type = type;
  }

  private id: number;
  private homeOdds: number;
  private drawOdds: number;
  private awayOdds: number;
  private status: boolean;
  private type: string;
}
