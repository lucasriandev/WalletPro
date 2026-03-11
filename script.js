const entradas = document.querySelector("#total-entradas");
const saidas = document.querySelector("#total-saidas");
const saldoTotal = document.querySelector("#saldo-total");
const listaHtml = document.querySelector("#lista-transacoes");

const descricao = document.querySelector("#input-desc");
const valor = document.querySelector("#input-valor");
const receita = document.querySelector("#select-tipo");

const form = document.querySelector("#form-transacao");

let chave = "listaTransacoes";
let transacoes = JSON.parse(localStorage.getItem(chave)) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const desc = descricao.value;
  const val = Number(valor.value);
  const tipo = receita.value;

  if (desc === "" || val <= 0) {
    alert("Preencha os campos!");
    return;
  }
  const novaTransacao = {
    descricao: desc,
    valor: val,
    tipo: tipo,
  };

  transacoes.push(novaTransacao);
  localStorage.setItem(chave, JSON.stringify(transacoes));
  renderizar();

  descricao.value = "";
  valor.value = "";
});

function renderizar() {
  listaHtml.innerHTML = "";

  transacoes.forEach((item, index) => {
    const novoLi = document.createElement("li");
    novoLi.classList.add("transacao", item.tipo);

    novoLi.innerHTML = `
  <span class="descricao">${item.descricao}</span>
  <span class="valor">R$ ${item.valor.toFixed(2)}</span>
`;

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-delete");
    btnDelete.innerHTML = "🗑️";

    btnDelete.addEventListener("click", () => {
      transacoes.splice(index, 1);
      localStorage.setItem(chave, JSON.stringify(transacoes));
      renderizar();
    });

    novoLi.appendChild(btnDelete);
    listaHtml.appendChild(novoLi);
  });

  atualizarPainel();
}

function atualizarPainel() {
  const entrada = transacoes.filter((entradas) => entradas.tipo === "Entrada");
  const saida = transacoes.filter((saidas) => saidas.tipo === "Saída");

  const totalEntradas = entrada.reduce((acumulador, item) => {
    return acumulador + item.valor;
  }, 0);

  const totalSaida = saida.reduce((acumulador, item) => {
    return acumulador + item.valor;
  }, 0);

  const total = totalEntradas - totalSaida;
  console.log(total);

  entradas.innerHTML = `R$ ${totalEntradas.toFixed(2)}`;
  saidas.innerHTML = `R$ ${totalSaida.toFixed(2)}`;
  saldoTotal.innerHTML = `R$ ${total.toFixed(2)}`;
}

renderizar();
