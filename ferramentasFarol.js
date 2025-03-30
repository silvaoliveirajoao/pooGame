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
  #usada;
  constructor() {
    super("gasolina");
    this.#usada = false;
  }

  usar() {
    if (this.#usada) {
      // Se já foi usada, retorna false 
      return false;
    } else {
      this.#usada = true;
      return true;
    }
  }
}

/**
 * Lanterna - possui bateria limitada. Exemplo: pode ser usada 3 vezes.
 */
export class Lanterna extends Ferramenta {
  #bateria;
  constructor() {
    super("lanterna");
    this.#bateria = 3; // Defina quantos usos achar adequado
  }

  usar() {
    // Cada "usar" pode significar "ligar" em um momento crítico.
    if (this.#bateria > 0) {
      this.#bateria--;
      console.log(`Você ligou a lanterna. Bateria restante: ${this.#bateria}`);
      return true;
    } else {
      console.log("A lanterna está sem bateria!");
      return false;
    }
  }

  get temBateria() {
    return this.#bateria > 0;
  }
}
