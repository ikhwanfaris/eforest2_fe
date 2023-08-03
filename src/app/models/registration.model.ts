export class RegistrationModel {
  constructor(
    public username: boolean,
    public email: string,
    public password: string,
    public password_confirmation: string,
    public fullname: string,
    public country :string,
    public source_how :string,
    public upline_username?: string,
  ) {}
}
