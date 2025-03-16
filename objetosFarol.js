import { Objeto, Ferramenta } from "./Basicas.js";
import { ChaveMestra, Gasolina } from "./ferramentasFarol.js";

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

export class PortaTrancada extends Objeto {
  constructor() {
    super(
      "porta_do_farol",
      "A porta está fechada e parece eletrônica.",
      "A porta agora está aberta, revelando a entrada do farol."
    );
  }

  usar(ferramenta) {
    // Precisamos da chave mestra E do gerador ligado para abrir a porta
    if (ferramenta instanceof ChaveMestra) {
      // Poderíamos verificar também se o gerador está ligado (opcional)
      // Se quisermos ser mais realistas, podemos checar algo como:
      // se "gerador.acaoOk" estiver true => libera
      // Mas, como o gerador está em outra sala, faz sentido
      // essa lógica ir para a sala (ver salaFarolFechado.js).
      // Aqui, num exemplo simples, apenas "acaoOk = true".
      this.acaoOk = true;
      return true;
    }
    return false;
  }
}
