/* ==========================================================================
   SCRIPT.JS · a parte INTERATIVA do site (JavaScript)

   O HTML tem só caixas vazias (ex.: #titulos-grid). Aqui pegamos os dados do
   data.js e MONTAMOS os cartões, a linha do tempo, a vitrine de camisas etc.
   Também criamos as interações: abas, setas, inclinação 3D, contadores...

   Conceitos usados:
     const / let     criam variáveis (const não muda; let pode mudar)
     (x) => ...      "função seta": jeito curto de escrever uma função
     .map()          transforma cada item de uma lista em outra coisa
     .join("")       junta uma lista de textos num texto só
     `texto ${x}`    texto entre crases, onde ${...} insere valores
     addEventListener("click", fn)   executa fn quando alguém clica
   ========================================================================== */


/* ---- 0. ATALHOS E CONFIGURAÇÃO ---------------------------------------------- */

// Ao recarregar, o navegador costuma voltar para onde você estava na página.
// Aqui desligamos isso: o site sempre abre no topo (hero).
// Também limpamos o "#secao" do endereço, senão ele pularia para aquela seção.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (location.hash) history.replaceState(null, "", location.pathname + location.search);
window.scrollTo(0, 0);

// $("#id") acha UM elemento; $$(".classe") acha TODOS (devolve uma lista).
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// true se a pessoa pediu "reduzir movimento" nas configurações do sistema
const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Marca o <html> com a classe "js". O CSS só esconde os elementos ".rv"
// (para aparecerem ao rolar) quando o JavaScript está funcionando.
document.documentElement.classList.add("js");


// Rola uma lista horizontal (caixa) para deixar um item no centro.
// Importante: NÃO usamos scrollIntoView, porque ele também rola a PÁGINA inteira
// (era isso que fazia o site abrir lá embaixo, na seção de camisas).
function centralizar(caixa, item) {
  const alvo = item.offsetLeft - (caixa.clientWidth - item.offsetWidth) / 2;
  caixa.scrollTo({ left: alvo, behavior: reduzir ? "auto" : "smooth" });
}


/* ---- 1. DESENHOS (SVG) ------------------------------------------------------
   SVG é imagem feita de formas matemáticas, ótima para trocar cores por código. */

// Cruz simples (usada só se um escudo não tiver foto)
const cruz = (cor, x, y, s) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="${cor}">
    <path d="M-3-14h6l2 10 10-2v6l-10 2 4 8-5 3-5-6-5 6-5-3 4-8-10-2v-6l10 2z"/>
  </g>`;

// Desenha uma camisa com os dados de uma época (c). "sfx" deixa o id único,
// já que a mesma camisa aparece em mais de um lugar da página.
function camisaSvg(c, sfx = "") {
  const { tipo, c1, c2 } = c;
  const corpo = "M30 20 L60 8 Q80 22 100 8 L130 20 L150 52 L128 62 L120 50 L120 150 L40 150 L40 50 L32 62 L10 52 Z";
  const id = `cl-${c.era.replace(/\W/g, "")}-${sfx}`;

  let extra = "";                                   // detalhe conforme o tipo
  if (tipo === "faixa")
    extra = `<path d="M40 50 L120 105 L120 130 L40 75 Z" fill="${c2}"/>`;
  if (tipo === "listras")
    extra = [50, 70, 90, 110].map((x) => `<rect x="${x}" y="20" width="10" height="130" fill="${c2}"/>`).join("");

  // <image> coloca a foto do escudo no peito. Com a faixa, sobe um pouco.
  const escudo = `<image href="assets/escudos/escudo-logo.png" x="${tipo === "faixa" ? 88 : 86}" y="${tipo === "faixa" ? 24 : 28}" width="22" height="28"/>`;

  return `<svg viewBox="0 0 160 160" role="img" aria-label="Camisa ${c.era}">
    <defs><clipPath id="${id}"><path d="${corpo}"/></clipPath></defs>
    <path d="${corpo}" fill="${c1}" stroke="#9a978e" stroke-width="2"/>
    <g clip-path="url(#${id})">${extra}</g>
    <path d="M60 8 Q80 22 100 8" fill="none" stroke="${c2}" stroke-width="4"/>
    ${escudo}
  </svg>`;
}

// Escudo desenhado (só aparece se o item não tiver "img" no data.js)
function escudoSvg(e) {
  if (e.forma === "redondo")
    return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="#111" stroke="#f4f1e8" stroke-width="5"/>${cruz("#f4f1e8", 60, 60, 1.4)}</svg>`;
  return `<svg viewBox="0 0 120 140"><path d="M10 10h100v60q0 40-50 62Q10 110 10 70z" fill="#111" stroke="#f4f1e8" stroke-width="5"/><path d="M10 10h100v22H10z" fill="#f4f1e8"/>${cruz("#d7263d", 60, 78, 1.5)}<text x="60" y="27" text-anchor="middle" font-size="14" font-weight="800" fill="#111" font-family="sans-serif">VASCO</text></svg>`;
}


/* ---- 2. FAIXA DE TEXTO (ticker) ----------------------------------------------
   Monta "4× Campeonato Brasileiro", "1× Libertadores"... e repete a lista duas
   vezes: o CSS anda 50% para a esquerda e recomeça, sem que se note o corte. */
const itensTicker = TITULOS.map((t) => `<span>${t.qtd}× ${t.nome}</span>`).join("");
$("#ticker").innerHTML = itensTicker + itensTicker;


/* ---- 3. LINHA DO TEMPO INTERATIVA ---------------------------------------------
   Os anos viram botões. Clicar (ou usar as setas) troca o painel. */
let tlIdx = 0;                                            // posição atual

$("#tlYears").innerHTML = LINHA_DO_TEMPO.map(
  (e, i) => `<button role="tab" data-i="${i}"><span>${e.ano}</span></button>`
).join("");

function mostrarAno(i) {
  // Mantém i entre 0 e o último item (sem passar dos limites)
  tlIdx = Math.max(0, Math.min(LINHA_DO_TEMPO.length - 1, i));
  const e = LINHA_DO_TEMPO[tlIdx];

  $$("#tlYears button").forEach((b, n) => {
    b.classList.toggle("on", n === tlIdx);
    b.setAttribute("aria-selected", n === tlIdx);
    // Rola SÓ a lista de anos para deixar o botão ativo no meio
    if (n === tlIdx) centralizar($("#tlYears"), b);
  });

  $("#tlBig").textContent = e.ano;
  $("#tlTxt").textContent = e.txt;
  $("#tlFill").style.width = ((tlIdx + 1) / LINHA_DO_TEMPO.length) * 100 + "%";

  // Reinicia a animação do painel: tira a classe, força o navegador a
  // "perceber" (offsetWidth) e coloca de novo.
  const p = $("#tlPanel");
  p.classList.remove("swap"); void p.offsetWidth; p.classList.add("swap");
}
$("#tlYears").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) mostrarAno(+b.dataset.i);                        // "+" converte texto em número
});
$("#tlPrev").addEventListener("click", () => mostrarAno(tlIdx - 1));
$("#tlNext").addEventListener("click", () => mostrarAno(tlIdx + 1));
mostrarAno(0);


/* ---- 4. TÍTULOS COM FILTRO -------------------------------------------------------
   renderTitulos(f) desenha só os cartões da categoria escolhida. */
function renderTitulos(f) {
  const lista = TITULOS.filter((t) => f === "todos" || t.cat === f);   // .filter() mantém só o que passa no teste

  $("#titulos-grid").innerHTML = lista.map(
    (t) => `<article class="card cut" data-tilt>
      <span class="badge">${t.qtd}×</span>
      <span class="tag">${t.cat}</span>
      <h3>${t.nome}</h3>
      <div class="anos">${t.anos.map((a) => `<i>${a}</i>`).join("")}</div>
    </article>`
  ).join("");

  // reduce() soma todos os valores da lista
  const total = lista.reduce((soma, t) => soma + t.qtd, 0);
  $("#titulos-total").innerHTML = `<b>${total}</b> títulos nesta lista`;
}
$("#filtros").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  $$("#filtros button").forEach((x) => x.classList.toggle("on", x === b));
  renderTitulos(b.dataset.f);                             // data-f vem do HTML
});
renderTitulos("todos");


/* ---- 5. VITRINE DE CAMISAS -----------------------------------------------------------
   Uma camisa grande + um trilho de miniaturas. Se a camisa tiver foto real (c.img),
   usamos a foto; senão, o desenho. */
let shIdx = 0;
const figCamisa = (c, sfx) => c.img ? `<img src="${c.img}" alt="Camisa ${c.era}">` : camisaSvg(c, sfx);

$("#shirtRail").innerHTML = CAMISAS.map(
  (c, i) => `<button role="tab" data-i="${i}">${figCamisa(c, "r" + i)}<small>${c.era}</small></button>`
).join("");

function mostrarCamisa(i) {
  const n = CAMISAS.length;
  shIdx = (i + n) % n;                                    // "%" faz voltar ao início ao passar do fim
  const c = CAMISAS[shIdx];

  $("#shirtFig").innerHTML = figCamisa(c, "g");
  $("#shEra").textContent = c.era;
  $("#shTitle").textContent = c.titulo;
  $("#shTxt").textContent = c.txt;
  $("#shCount").textContent = `${String(shIdx + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;

  $$("#shirtRail button").forEach((b, k) => {
    b.classList.toggle("on", k === shIdx);
    b.setAttribute("aria-selected", k === shIdx);
    if (k === shIdx) centralizar($("#shirtRail"), b);
  });

  const v = $("#shirtView");
  v.classList.remove("swap"); void v.offsetWidth; v.classList.add("swap");
}
$("#shirtRail").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) mostrarCamisa(+b.dataset.i);
});
$("#shPrev").addEventListener("click", () => mostrarCamisa(shIdx - 1));
$("#shNext").addEventListener("click", () => mostrarCamisa(shIdx + 1));
mostrarCamisa(0);

// Setas do teclado ← → trocam a camisa/ano quando o foco está na própria seção
document.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  const passo = e.key === "ArrowRight" ? 1 : -1;
  if (e.target.closest("#shirtView, #shirtRail")) mostrarCamisa(shIdx + passo);
  else if (e.target.closest("#tlYears, .tl")) mostrarAno(tlIdx + passo);
});


/* ---- 6. ESCUDOS, ÍDOLOS E CURIOSIDADES -------------------------------------------------- */

// Escudos: o número no canto mostra a ORDEM da evolução (01, 02, 03...)
$("#escudos-grid").innerHTML = ESCUDOS.map(
  (e, i) => `<article class="card crest-card cut" data-tilt>
    <span class="badge">0${i + 1}</span>
    <div class="fig">${e.img ? `<img src="${e.img}" alt="${e.nome}">` : escudoSvg(e)}</div>
    <span class="tag">${e.ano}</span>
    <h3>${e.nome}</h3>
    <p>${e.txt}</p>
  </article>`
).join("");

// Ídolos: pegamos a primeira letra de cada palavra do nome para as iniciais gigantes
$("#idolos-grid").innerHTML = IDOLOS.map((p) => {
  const iniciais = p.nome.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return `<article class="card idol cut" data-tilt>
    <span class="ini" aria-hidden="true">${iniciais}</span>
    <span class="tag">${p.pos}</span>
    <h3>${p.nome}</h3>
    <p>${p.txt}</p>
  </article>`;
}).join("");

// Curiosidades: <button> com duas faces. Clicar alterna a classe "on" (o CSS vira o cartão).
$("#curio").innerHTML = CURIOSIDADES.map(
  (c, i) => `<button class="flip" aria-pressed="false">
    <span class="flip-in">
      <span class="face front cut"><span class="n">${String(i + 1).padStart(2, "0")}</span><small>Toque para ler</small></span>
      <span class="face back cut"><small>Você sabia?</small><span>${c}</span></span>
    </span>
  </button>`
).join("");
$("#curio").addEventListener("click", (e) => {
  const b = e.target.closest(".flip");
  if (!b) return;
  const aberto = b.classList.toggle("on");
  b.setAttribute("aria-pressed", aberto);
});


/* ---- 7. INCLINAÇÃO 3D E BRILHO QUE SEGUE O MOUSE -----------------------------------------
   Usamos UM ouvinte no documento inteiro (delegação), assim os cartões criados
   depois (ex.: ao trocar o filtro) também funcionam. */
let atual = null;                                         // elemento com inclinação ativa

function resetar(el) { el.style.removeProperty("--rx"); el.style.removeProperty("--ry"); }

document.addEventListener("pointermove", (e) => {
  if (reduzir || e.pointerType === "touch") return;
  const el = e.target.closest("[data-tilt]");
  if (atual && atual !== el) resetar(atual);              // saiu do cartão: desfaz a inclinação
  atual = el;
  if (!el) return;

  const r = el.getBoundingClientRect();                   // posição e tamanho do cartão na tela
  const x = (e.clientX - r.left) / r.width;               // 0 (esquerda) a 1 (direita)
  const y = (e.clientY - r.top) / r.height;               // 0 (topo) a 1 (base)
  el.style.setProperty("--rx", ((0.5 - y) * 9).toFixed(2) + "deg");
  el.style.setProperty("--ry", ((x - 0.5) * 11).toFixed(2) + "deg");
  el.style.setProperty("--mx", x * 100 + "%");            // posição do brilho
  el.style.setProperty("--my", y * 100 + "%");
});
document.addEventListener("pointerleave", () => { if (atual) resetar(atual); });


/* ---- 8. HERO: ESCUDO ACOMPANHA O MOUSE E FOTO COM PARALAXE ----------------------------------
   Paralaxe = o fundo anda mais devagar que a página, criando sensação de profundidade. */
const hero = $(".hero");
const crest = $("#heroCrest");
if (!reduzir) {
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    crest.style.setProperty("--cry", (((e.clientX - r.left) / r.width - 0.5) * 22).toFixed(2) + "deg");
    crest.style.setProperty("--crx", ((0.5 - (e.clientY - r.top) / r.height) * 16).toFixed(2) + "deg");
  });
  hero.addEventListener("pointerleave", () => {
    crest.style.removeProperty("--cry"); crest.style.removeProperty("--crx");
  });
}


/* ---- 9. ROLAGEM: BARRA DE PROGRESSO E PARALAXE ------------------------------------------------
   requestAnimationFrame agrupa as atualizações a cada quadro, para não travar. */
const barra = $("#progress");
const fundo = $("#heroBg");
let pendente = false;

const menuBarra = $("#nav");
let yAnterior = 0;

function aoRolar() {
  pendente = false;
  const y = window.scrollY;

  // Menu: some ao rolar para BAIXO e volta ao rolar para CIMA.
  // (Diferença menor que 6px é ignorada para não "piscar".)
  if (Math.abs(y - yAnterior) > 6) {
    menuBarra.classList.toggle("oculto", y > yAnterior && y > 160);
    yAnterior = y;
  }
  menuBarra.classList.toggle("solido", y > 40);          // fica mais escuro depois de rolar um pouco

  // No topo da página (ainda no hero) nenhum link fica ativo
  if (y < innerHeight * 0.4 && linkAtivo()) {
    links.forEach((a) => a.classList.remove("on"));
    moverPilula(null);
  }

  const total = document.documentElement.scrollHeight - innerHeight;
  barra.style.width = (total > 0 ? (y / total) * 100 : 0) + "%";
  if (!reduzir && y < innerHeight * 1.2) fundo.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
}
addEventListener("scroll", () => {
  if (!pendente) { pendente = true; requestAnimationFrame(aoRolar); }
}, { passive: true });


/* ---- 10. MENU: DESTACA A SEÇÃO QUE ESTÁ NA TELA --------------------------------------------------
   IntersectionObserver avisa quando um elemento entra ou sai da área visível. */
const links = $$("#menu a");
const secoes = links.map((a) => $(a.getAttribute("href")));   // acha a seção de cada link (#historia, #titulos...)

// A "pílula" do menu desliza até um link. Guardamos a posição (x) e a largura (w)
// do link nas variáveis CSS --x e --w; o CSS faz a animação sozinho.
const pilula = $("#navPill");
function moverPilula(link) {
  if (!link) { pilula.style.opacity = 0; return; }
  pilula.style.setProperty("--x", link.offsetLeft + "px");
  pilula.style.setProperty("--w", link.offsetWidth + "px");
  pilula.style.opacity = 1;
}
const linkAtivo = () => $("#menu a.on");
links.forEach((a) => {
  a.addEventListener("pointerenter", () => moverPilula(a));        // segue o mouse
  a.addEventListener("focus", () => moverPilula(a));                // e o foco do teclado
});
$("#menu").addEventListener("pointerleave", () => moverPilula(linkAtivo()));   // volta ao link ativo
addEventListener("resize", () => moverPilula(linkAtivo()));

if ("IntersectionObserver" in window) {
  const espiao = new IntersectionObserver((itens) => {
    itens.forEach((it) => {
      if (it.isIntersecting) {
        links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + it.target.id));
        moverPilula(linkAtivo());                                  // pílula acompanha a seção atual
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });                  // só conta quando a seção passa pelo meio da tela
  secoes.forEach((s) => s && espiao.observe(s));


  /* ---- 11. APARECER AO ROLAR ----------------------------------------------------------------------
     Elementos com a classe "rv" ganham "in" (visível) quando entram na tela. */
  const revelar = new IntersectionObserver((itens, obs) => {
    itens.forEach((it) => {
      if (it.isIntersecting) { it.target.classList.add("in"); obs.unobserve(it.target); }
    });
  }, { threshold: 0.12 });
  $$(".rv").forEach((el) => revelar.observe(el));


  /* ---- 12. CONTADORES ANIMADOS ------------------------------------------------------------------------
     Os números do topo sobem de 0 até o valor de data-count quando aparecem. */
  const contar = new IntersectionObserver((itens, obs) => {
    itens.forEach((it) => {
      if (!it.isIntersecting) return;
      obs.unobserve(it.target);
      $$("[data-count]", it.target).forEach((el) => {
        const alvo = +el.dataset.count;
        const ini = performance.now();
        const dur = reduzir ? 1 : 1400;                      // duração em milissegundos
        (function quadro(agora) {
          const t = Math.min(1, (agora - ini) / dur);        // progresso de 0 a 1
          const suave = 1 - Math.pow(1 - t, 3);              // começa rápido e desacelera no fim
          el.textContent = Math.round(alvo * suave);
          if (t < 1) requestAnimationFrame(quadro);
        })(ini);
      });
    });
  }, { threshold: 0.4 });
  contar.observe($("#stats"));
} else {
  // Navegador muito antigo: mostra tudo e já coloca os números finais.
  $$(".rv").forEach((el) => el.classList.add("in"));
  $$("[data-count]").forEach((el) => (el.textContent = el.dataset.count));
}

// Primeira atualização da barra/menu, depois que tudo acima já foi criado
aoRolar();

// Garantia final: depois de tudo montado, a página começa no topo
window.scrollTo(0, 0);
