import { Engine, Sala } from "./Basicas.js";
import { Praia, Cabana, Bosque, FarolFechado, InteriorFarol, TopoDoFarol } from "./salasFarol.js";

export class JogoFarol extends Engine {
  constructor() {
    super(); // chama o construtor de Engine -> chama criaCenario() logo após
  }
  
  criaCenario() {
    // Criar as salas
    let praia = new Praia(this);
    let cabana = new Cabana(this);
    let bosque = new Bosque(this);
    let farolExt = new FarolFechado(this);
    const interior = new InteriorFarol(this);
    const topo = new TopoDoFarol(this);

    // Configurar as portas (links) entre as salas
    // Ajusta portas (conexões)
    // Praia <-> Cabana
    praia.portas.set("Cabana", cabana);
    cabana.portas.set("Praia", praia);

    // Praia <-> Bosque
    praia.portas.set("Bosque", bosque);
    bosque.portas.set("Praia", praia);

    // Bosque <-> FarolFechado
    bosque.portas.set("FarolFechado", farolExt);
    farolExt.portas.set("Bosque", bosque);

    // FarolFechado <-> InteriorFarol (só se porta estiver destrancada)
    farolExt.portas.set("InteriorFarol", interior);
    interior.portas.set("FarolFechado", farolExt);

    // InteriorFarol <-> TopoDoFarol
    interior.portas.set("TopoDoFarol", topo);
    topo.portas.set("InteriorFarol", interior);

    // Sala inicial
    this.salaCorrente = praia;
  }
  /**
   * Métodos auxiliares para "final" do jogo
   */
  vitoria() {
    console.log("Parabéns! Você encontrou o tesouro e venceu o jogo!");
    this.indicaFimDeJogo();
  }

  derrota() {
    console.log("Infelizmente, você foi derrotado(a)...");
    this.indicaFimDeJogo();
  }

  /**
   * Exemplo de como obter sala por nome (usada no FarolFechado)
   */
  getSalaPorNome(nomeDaSala) {
    return null; // Fica como "stub" 
  }
}


