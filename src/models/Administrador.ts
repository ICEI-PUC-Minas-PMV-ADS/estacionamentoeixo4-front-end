export default class Administrador {
  public readonly id?: number;
  public readonly nome: string;

  public readonly email: string;

  public readonly uuid_firebase: string;

  constructor(nome: string, email: string, uuid_firebase: string) {
    this.nome = nome;
    this.email = email;
    this.uuid_firebase = uuid_firebase;
  }
}
