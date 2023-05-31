export default class Administrador {
    id;
    nome;
    email;
    uuid_firebase;
    estacionamentos;
    constructor(nome, email, uuid_firebase) {
        this.nome = nome;
        this.email = email;
        this.uuid_firebase = uuid_firebase;
    }
}
