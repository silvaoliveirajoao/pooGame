import { Sala } from "./Basicas.js";
import { Gerador, PortaDoFarol, Alcapao, BauDoTesouro, LivroAntigo } from "./objetosFarol.js";
import { Gasolina, ChaveMestra, Lanterna } from "./ferramentasFarol.js";

// Sala 1: Praia
export class Praia extends Sala {
  constructor(engine) {
    super("Praia", engine);
    // Nenhuma ferramenta ou objeto específico aqui
    this.ferramentas.set("lanterna", new Lanterna())
  }
  usa(nomeFerramenta, nomeObjeto) {
    return false; // nenhum uso especial nesta sala
  }
}

// Sala 2
export class Cabana extends Sala {
  constructor(engine) {
    super("Cabana", engine);
    // Adicionamos o gerador como objeto
    this.objetos.set("gerador", new Gerador());
    // Adicionamos a gasolina como ferramenta na sala
    this.ferramentas.set("gasolina", new Gasolina());
  }

  // Exemplo de sobrecarga do método usa(...)
  usa(nomeFerramenta, nomeObjeto) {
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);
    if (ferramenta && objeto && ferramenta.usar()) {
      // chama o método 'usar' do objeto, passando a ferramenta
      if (objeto.usar(ferramenta)) {
        return true;
      }
    }
    return false;
  }
}

// Sala 3: Bosque
export class Bosque extends Sala {
  constructor(engine) {
    super("Bosque", engine);
    // Ferramenta: chave mestra
    this.ferramentas.set("chave_mestra", new ChaveMestra());
    // Objeto "livro_antigo" (decorativo)
    this.objetos.set("livro_antigo", new LivroAntigo());
  }

  usa(nomeFerramenta, nomeObjeto) {
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);

    if (ferramenta && objeto && ferramenta.usar()) {
      if (objeto.usar(ferramenta)) {
        return true;
      }
    }
    // Se tivéssemos um baú ou um tronco com 'usar' especial, trataríamos aqui
    return false;
  }
}

/**
 * Sala 4: FarolFechado (exterior)
 * Porta do Farol trancada eletronicamente.
 */
export class FarolFechado extends Sala {
  constructor(engine) {
    super("FarolFechado", engine);
    this.objetos.set("porta_do_farol", new PortaDoFarol());
  }

  usa(nomeFerramenta, nomeObjeto) {
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);

    // Verifica se o gerador da Cabana está ligado (acaoOk == true)
    const cabana = this.engine.getSalaPorNome("Cabana");
    const gerador = cabana?.objetos.get("gerador");
    const geradorLigado = gerador ? gerador.acaoOk : false;

    if (ferramenta && objeto && ferramenta.usar()) {
      // Passamos geradorLigado como parâmetro extra
      if (objeto.usar(ferramenta, geradorLigado)) {
        return true;
      }
    }
    return false;
  }
}

/**
 * Sala 5: Interior do Farol
 * Há um alçapão perigoso. Se usar incorretamente, game over.
 */
export class InteriorFarol extends Sala {
  constructor(engine) {
    super("InteriorFarol", engine);
    this.objetos.set("alcapao", new Alcapao());
  }

  usa(nomeFerramenta, nomeObjeto) {
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);

    // Precisamos checar se a Lanterna está com bateria para "iluminar" o alçapão
    let lanternaLigada = false;
    if (ferramenta instanceof Lanterna && ferramenta.temBateria) {
      // "usar" já decrementa a bateria, se tiver
      lanternaLigada = true;
    }

    if (ferramenta && objeto) {
      // Se o return for false, a lanterna não tinha bateria
      if (!lanternaLigada && ferramenta instanceof Lanterna) {
        console.log("A lanterna está sem bateria! Você não consegue iluminar nada.");
        return false;
      }
      // Tenta acionar o objeto
      if (objeto.usar(ferramenta, lanternaLigada)) {
        // Conseguiu abrir sem cair
        return true;
      } else {
        // Falhou ao usar o alçapão -> game over
        console.log("Você acionou o alçapão às cegas e caiu em uma armadilha!");
        this.engine.derrota();
        return false;
      }
    }
    return false;
  }
}

/**
 * Sala 6: Topo do Farol
 * Onde está o baú do tesouro.
 */
export class TopoDoFarol extends Sala {
  constructor(engine) {
    super("TopoDoFarol", engine);
    this.objetos.set("bau_do_tesouro", new BauDoTesouro());
  }

  usa(nomeFerramenta, nomeObjeto) {
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);

    if (ferramenta && objeto && ferramenta.usar()) {
      if (objeto.usar(ferramenta)) {
        // Se usou a Chave Mestra, o baú se abre com sucesso
        if (objeto.acaoOk) {
          // Vitória
          this.engine.vitoria();
        }
        return true;
      } else {
        // Tentou usar algo diferente da chave mestra => explosão
        console.log("O baú explodiu ao ser forçado de maneira incorreta!");
        this.engine.derrota();
        return false;
      }
    }
    return false;
  }
}