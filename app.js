const lotes = [
  { produto: "Leite Integral 1L", quantidade: 24, validade: "2026-11-16", beneficiario: "Família Silva (4 pessoas)" },
  { produto: "Feijão Carioca 1kg", quantidade: 40, validade: "2027-03-10", beneficiario: "Associação Bairro Sul" }
];

function mostrarTela(idTela) {
  document.querySelectorAll("main > section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(idTela).classList.remove("hidden");
  renderizarEstoque();
  renderizarAlertas();
}

function sair() {
  document.getElementById("main-nav").classList.add("hidden");
  mostrarTela("tela-login");
}

function calcularUrgencia(dataValidade) {
  const hoje = new Date();
  const alvo = new Date(dataValidade + "T00:00:00");
  const diffDias = Math.ceil((alvo - hoje) / (1000 * 60 * 60 * 24));
  return diffDias <= 7;
}

function renderizarEstoque() {
  const tbody = document.getElementById("tabela-estoque");
  tbody.innerHTML = "";
  lotes.forEach(item => {
    const urgente = calcularUrgencia(item.validade);
    const statusHtml = urgente
      ? `<span class="badge-urgente">⚠️ Vence em breve</span>`
      : `<span class="badge-normal">✅ Regular</span>`;
    tbody.innerHTML += `
      <tr>
        <td>${item.produto}</td>
        <td>${item.quantidade}</td>
        <td>${item.validade}</td>
        <td>${statusHtml}</td>
      </tr>
    `;
  });
}

function renderizarAlertas() {
  const container = document.getElementById("lista-alertas");
  container.innerHTML = "";
  const urgentes = lotes.filter(item => calcularUrgencia(item.validade));

  if (urgentes.length === 0) {
    container.innerHTML = "<p>✅ Nenhum lote com vencimento crítico nos próximos 7 dias.</p>";
    return;
  }

  urgentes.forEach(item => {
    container.innerHTML += `
      <div class="alert-card" role="alert">
        <strong>⚠️ PRIORIDADE DE ENTREGA: ${item.produto} (${item.quantidade} un.)</strong><br>
        <span>Validade: ${item.validade}</span><br>
        <span>Destino sugerido: <strong>${item.beneficiario}</strong></span>
      </div>
    `;
  });
}

document.getElementById("form-login").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("main-nav").classList.remove("hidden");
  mostrarTela("tela-estoque");
});

document.getElementById("form-estoque").addEventListener("submit", (e) => {
  e.preventDefault();
  const produto = document.getElementById("produto").value.trim();
  const quantidade = Number(document.getElementById("quantidade").value);
  const validade = document.getElementById("validade").value;

  lotes.unshift({
    produto,
    quantidade,
    validade,
    beneficiario: "Família Oliveira (Triagem Prioritária)"
  });

  e.target.reset();
  renderizarEstoque();
  renderizarAlertas();
});
