export class User {
  public id: string | number;
  public firstName!: string;
  public lastName!: string;

  constructor(id: string, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
