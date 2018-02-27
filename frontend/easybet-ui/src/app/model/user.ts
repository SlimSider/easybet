export class User {

  constructor(id: number, name: string, password: string, balance: number) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.balance = balance;
  }

  private id: number;
  private name: string;
  private password: string;
  private balance: number;

}
