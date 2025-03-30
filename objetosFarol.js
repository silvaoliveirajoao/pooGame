import { Objeto, Ferramenta } from "./Basicas.js";
import { ChaveMestra, Gasolina, Lanterna } from "./ferramentasFarol.js";

export class Gerador extends Objeto {
  constructor() {
    super(
      "gerador",
      "Um gerador antigo, desligado.",
      "O gerador está funcionando e fornecendo energia."
    );
  }

  usar(ferramenta) {
    // Precisamos de gasolina para ligá-lo.
    if (ferramenta instanceof Gasolina) {
      // Ao usar gasolina, marcamos acaoOk = true
      this.acaoOk = true;
      console.log("Você abasteceu o gerador. Ele agora está ligado!");
      return true;
    }
    return false;
  }
}

export class PortaDoFarol extends Objeto {
  constructor() {
    super(
      "porta_do_farol",
      "A porta está fechada e parece eletrônica.",
      "A porta agora está aberta, revelando a entrada do farol."
    );
  }

  usar(ferramenta, geradorLigado = false) {
    // Precisamos da chave mestra E do gerador ligado para abrir a porta
    if (ferramenta instanceof ChaveMestra && geradorLigado) {
      this.acaoOk = true;
      console.log('A fechadura eletrônica destrancou com a chave mestra!')
      return true;
    }
    return false;
  }
}

/**
 * Alcapao - Se o jogador usar errado ou não estiver com a lanterna acesa
 * pode cair na armadilha -> game over.
 */
export class Alcapao extends Objeto {
  constructor() {
    super(
      "alcapao",
      "Um alçapão no chão. Está escuro; você mal consegue enxergar.",
      "O alçapão foi aberto com segurança."
    );
  }

  usar(ferramenta, lanternaLigada = false) {
    // Se o jogador usar a lanterna aqui (lanternaLigada==true), consegue abrir sem cair
    // Caso contrário, armadilha -> game over
    if (ferramenta instanceof Lanterna && lanternaLigada) {
      this.acaoOk = true;
      console.log("Você iluminou o alçapão e o abriu sem problemas.");
      return true;
    }
    return false;
  }
}

/**
 * BauDoTesouro - Se usar a chave mestra (e, opcionalmente, outras condições),
 * abre com sucesso. Se usar outra ferramenta, explode -> game over.
 */
export class BauDoTesouro extends Objeto {
  constructor() {
    super(
      "bau_do_tesouro",
      "Um baú robusto, com um cadeado intrincado.",
      "O baú está aberto, revelando o tesouro escondido!"
    );
  }

  usar(ferramenta) {
    if (ferramenta instanceof ChaveMestra) {
      this.acaoOk = true;
      console.log("Você destrancou o baú com a Chave Mestra! O tesouro é seu!");
      return true;
    }
    // Qualquer outra ferramenta -> explosão:
    return false;
  }
}

/**
 * LivroAntigo - objeto "decorativo" ou que pode fornecer dica.
 */
export class LivroAntigo extends Objeto {
  constructor() {
    super(
      "livro_antigo",
      "Um livro empoeirado com páginas amareladas.",
      "Você já consultou o livro e não há mais nada de útil."
    );
  }

  usar(ferramenta) {
    // Talvez posso criar interações extras; por enquanto, sem efeito especial
    return false;
  }
}
