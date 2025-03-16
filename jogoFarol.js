import { Engine } from "./Basicas.js";
import { Praia, Cabana, Bosque, FarolFechado } from "./salasFarol.js";

export class JogoFarol extends Engine {
  constructor() {
    super(); // chama o construtor de Engine -> chama criaCenario() logo após
  }

  criaCenario() {
    // Criar as salas
    let praia = new Praia(this);
    let cabana = new Cabana(this);
    let bosque = new Bosque(this);
    let farol = new FarolFechado(this);

    // Configurar as portas (links) entre as salas
    praia.portas.set("Cabana", cabana);
    praia.portas.set("Bosque", bosque);

    cabana.portas.set("Praia", praia);

    bosque.portas.set("Praia", praia);
    bosque.portas.set("FarolFechado", farol);

    farol.portas.set("Bosque", bosque);

    // Define a sala inicial
    this.salaCorrente = praia;
  }
}
