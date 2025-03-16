import { Sala } from "./Basicas.js";
import { Gerador, PortaTrancada } from "./objetosFarol.js";
import { Gasolina, ChaveMestra } from "./ferramentasFarol.js";

// Sala 1
export class Praia extends Sala {
  constructor(engine) {
    super("Praia", engine);
    // Nenhuma ferramenta ou objeto específico aqui
    // Exemplo: this.ferramentas.set("tocha", new Tocha());
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

// Sala 3
export class Bosque extends Sala {
  constructor(engine) {
    super("Bosque", engine);
    // Podemos deixar a chave mestra solta ou dentro de um objeto
    // Aqui, vamos deixá-la como ferramenta solta na sala
    this.ferramentas.set("chave_mestra", new ChaveMestra());
  }

  usa(nomeFerramenta, nomeObjeto) {
    // Se tivéssemos um baú ou um tronco com 'usar' especial, trataríamos aqui
    return false;
  }
}

// Sala 4
export class FarolFechado extends Sala {
  constructor(engine) {
    super("FarolFechado", engine);
    // Objeto principal é a porta trancada
    this.objetos.set("porta_do_farol", new PortaTrancada());
  }

  usa(nomeFerramenta, nomeObjeto) {
    // Precisamos saber se o gerador está ligado. 
    // Podemos checar acessando a sala Cabana e pegando o objeto gerador,
    // ou guardar alguma flag global. Exemplo simples:
    const ferramenta = this.engine.mochila.pega(nomeFerramenta);
    const objeto = this.objetos.get(nomeObjeto);

    if (ferramenta && objeto && ferramenta.usar()) {
      // Verificar se o gerador (na sala Cabana) foi ligado
      const salaCabana = this.engine
        .salaCorrente.engine // Engine
        .salaCorrente.engine // cuidado: double engine (depende de como você acessa)
        // ou simplesmente busque outra forma de obter "Cabana"
        // Para o protótipo, vamos ignorar essa verificação
        ;
      // Chama 'usar' no objeto "porta_do_farol"
      if (objeto.usar(ferramenta)) {
        console.log("A porta do farol se abriu! Você pode entrar!");
        // Opcional: indica fim de jogo se quisermos
        this.engine.indicaFimDeJogo();
        return true;
      }
    }
    return false;
  }
}
