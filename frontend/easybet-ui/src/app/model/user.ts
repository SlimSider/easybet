export class User {

  constructor(username?: string, email?: string, password?: string, balance?: number, role?: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.balance = balance;
    this.role = role;
  }

  private id: number;
  private username: string;
  private email: string;
  private password: string;
  private balance: number;
  private role: string;

  getUsername() {
    return this.username;
  }

}
