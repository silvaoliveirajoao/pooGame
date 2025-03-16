import { Ferramenta } from "./Basicas.js";

export class ChaveMestra extends Ferramenta {
  constructor() {
    super("chave_mestra");
  }

  usar() {
    // Esta chave pode ser usada ilimitadamente,
    // ou, se quiser, limitar usos, controlar num counter
    return true;
  }
}

export class Gasolina extends Ferramenta {
  constructor() {
    super("gasolina");
  }

  usar() {
    // Após usar a gasolina uma vez, ela acaba.
    return false; 
    // Retornando false a primeira vez que usamos
    // indica que ela não estará mais disponível.
  }
}
