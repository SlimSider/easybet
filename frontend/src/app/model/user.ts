import {Bet} from "./bet";
import {Role} from "./enums/role";

export class User {
  getUsername(): string {
    return this.username;
  }

  setUsername(value: string) {
    this.username = value;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(value: string) {
    this.email = value;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(value: string) {
    this.password = value;
  }

  getBalance(): number {
    return this.balance;
  }

  setBalance(value: number) {
    this.balance = value;
  }

  getRole(): Role {
    return this.role;
  }

  setRole(value: Role) {
    this.role = value;
  }

  getBets(): Array<Bet> {
    return this.bets;
  }

  setBets(value: Array<Bet>) {
    this.bets = value;
  }

  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  constructor(username?: string, email?: string, password?: string, balance?: number, role?: Role, bets?: Array<Bet>) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.balance = balance;
    this.role = role;
    this.bets = bets ? bets : [];
  }

  private id: number;
  private username: string;
  private email: string;
  private password: string;
  private balance: number;
  private role: Role;
  private bets: Array<Bet>;
}
