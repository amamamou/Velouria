export class User {
  constructor(
    public userId: number = 0,
    public username: string = '',
    public email: string = '',
    public password: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public profilePic: string = ''
  ) {}
}
