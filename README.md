# Vasco da Gama · Gigante da Colina

Site de torcedor sobre o **Club de Regatas Vasco da Gama**: história, títulos, camisas, escudos, ídolos e curiosidades, num visual escuro e interativo.

**Ver o site:** https://clubegigantedacolina.netlify.app

> Projeto de torcedor, sem vínculo oficial com o clube. O escudo e as imagens do clube são marcas e conteúdo de seus respectivos donos.

---

## Sumário

1. [O que o site tem](#o-que-o-site-tem)
2. [Como o projeto foi construído](#como-o-projeto-foi-construído)
3. [Ideias e recursos acrescentados](#ideias-e-recursos-acrescentados)
4. [Estrutura de arquivos](#estrutura-de-arquivos)
5. [Como editar o conteúdo](#como-editar-o-conteúdo)
6. [Como rodar no computador](#como-rodar-no-computador)
7. [Imagens usadas](#imagens-usadas)
8. [Responsividade](#responsividade)
9. [Acessibilidade](#acessibilidade)
10. [Pontos de atenção](#pontos-de-atenção)

---

## O que o site tem

| Seção | O que mostra |
| --- | --- |
| **Topo (hero)** | Foto da torcida no São Januário ao fundo, escudo flutuante, chamadas e quatro números animados (4 Brasileirões, 1 Libertadores, 24 Cariocas, 1927 São Januário). |
| **Faixa de texto** | Uma faixa que corre sem parar com os títulos do clube. |
| **História** | Linha do tempo interativa de 1898 a 2011: escolha um ano e o painel muda. |
| **Títulos** | Cartões por competição, com filtro (todos, internacionais, nacionais, estaduais) e soma dos títulos listados. |
| **Camisas** | Vitrine com 23 camisas, de 1898 até 2025, com setas e um trilho de miniaturas. |
| **Escudos e logos** | A evolução do escudo em 10 versões, de 1898 a 2011, numeradas em ordem. |
| **Ídolos** | Cartões com os grandes nomes do clube. |
| **Curiosidades** | Cartões que viram ao clicar (ou passar o mouse) para revelar o texto. |

---

## Como o projeto foi construído

O site é **HTML, CSS e JavaScript puros**, sem framework e sem etapa de build. Basta abrir o `index.html`.

A ideia central é separar **estrutura**, **aparência**, **comportamento** e **conteúdo**:

- `index.html` guarda a estrutura. Várias caixas ficam vazias de propósito (por exemplo `#titulos-grid`).
- `style.css` cuida de toda a aparência e das animações.
- `script.js` monta os cartões e cuida das interações.
- `data.js` guarda o **conteúdo** (textos, anos, caminhos das imagens). É o arquivo que mais se edita.

Todos os arquivos têm **comentários em português, pensados para quem está começando**, explicando o que cada bloco faz.

---

## Ideias e recursos acrescentados

O site passou por várias rodadas de melhoria. Estas foram as ideias que entraram:

### Visual e identidade

- **Fundo escuro com foto do estádio** no topo e, de forma bem discreta, fixa atrás de todo o site.
- **Cartões de canto cortado** com número em destaque no canto, inspirados nas referências enviadas.
- **Abas e botões de ano inclinados** (efeito de paralelogramo).
- **Linhas diagonais animadas** no topo, lembrando a faixa da camisa.
- **Topo em preto e branco**, sem brilhos vermelhos. O vermelho fica só como detalhe (etiquetas, barra de progresso).
- **Fontes:** *Isometra* nos títulos, *Jost* nos números e etiquetas, *Barlow* no texto corrido. A *Nothing You Could Do* está carregada e disponível (`--font-script`), mas hoje nada a usa.

### Interatividade

- **Menu em cápsula flutuante**, com efeito de vidro. Uma "pílula" desliza até a seção atual ou até o link sob o mouse.
- **Menu inteligente:** some ao rolar para baixo e volta ao rolar para cima. Tem barra de progresso da rolagem na base.
- **Escudo do topo** que se inclina seguindo o mouse, com **paralaxe** na foto de fundo.
- **Inclinação 3D e brilho que segue o mouse** nos cartões.
- **Contadores animados** que sobem de 0 até o valor final quando aparecem na tela.
- **Linha do tempo clicável**, com setas e barra de progresso.
- **Vitrine de camisas** com setas, trilho de miniaturas e navegação pelo teclado (← →).
- **Filtro de títulos** com soma automática.
- **Cartões que viram** (flip) nas curiosidades.
- **Aparecer ao rolar:** as seções entram com animação suave.
- **Abre sempre no topo** ao carregar ou recarregar a página.

### Conteúdo e imagens

- Fotos reais das **23 camisas** e dos **10 escudos**, recortadas de um painel e com o fundo removido.
- Foto da torcida no São Januário como fundo.
- Todo o conteúdo em um único arquivo (`data.js`), fácil de editar.

---

## Estrutura de arquivos

```
site-vasco/
├── index.html        # estrutura da página
├── style.css         # aparência e animações
├── script.js         # interações e montagem dos cartões
├── data.js           # conteúdo (textos, anos, imagens)
├── README.md         # este arquivo
└── assets/
    ├── camisas/      # c01.png … c23.png (uma por época)
    ├── escudos/      # e01.png … e10.png + escudo-logo.png
    ├── fundo/        # torcida.jpg (fundo do site)
    └── originais/    # imagens originais, antes dos recortes
```

---

## Como editar o conteúdo

Abra o `data.js`. Ele tem uma lista para cada parte do site:

| Lista | Para que serve | Campos |
| --- | --- | --- |
| `TITULOS` | Cartões da seção Títulos | `nome`, `qtd`, `anos`, `cat` (`internacional`, `nacional` ou `estadual`) |
| `LINHA_DO_TEMPO` | Linha do tempo da História | `ano`, `txt` |
| `IDOLOS` | Cartões da seção Ídolos | `nome`, `pos`, `txt` |
| `CAMISAS` | Vitrine de camisas | `era`, `titulo`, `txt`, `img` |
| `ESCUDOS` | Evolução dos escudos | `nome`, `ano`, `txt`, `img` |
| `CURIOSIDADES` | Cartões que viram | só o texto |

Para **adicionar** um item, copie uma linha, cole logo abaixo (com vírgula entre elas) e troque os valores. Textos ficam sempre entre aspas. Atenção às vírgulas e aspas, pois um erro de digitação ali pode quebrar o site inteiro.

Para **trocar uma imagem**, coloque o arquivo na pasta de `assets/` e aponte o campo `img` para ele.

---

## Como rodar no computador

**Jeito simples:** dê um duplo clique no `index.html`.

**Com um servidor local** (melhor para testar do jeito que o site roda na internet):

```bash
cd site-vasco
python3 -m http.server 8765
```

Depois abra http://localhost:8765/index.html no navegador.

---

## Imagens usadas

- **`assets/fundo/torcida.jpg`:** foto da torcida no São Januário, usada como fundo.
- **`assets/camisas/c01–c23.png`:** as 23 camisas, recortadas de um painel de uniformes. Para as camisas pretas (2012 em diante), cujo corpo se confundia com o fundo escuro, o contorno foi refeito usando o de uma camisa branca como molde.
- **`assets/escudos/e01–e10.png`:** os 10 escudos, recortados do mesmo painel.
- **`assets/escudos/escudo-logo.png`:** o escudo atual com fundo transparente, usado no menu, no topo e no rodapé.
- **`assets/originais/`:** os arquivos originais, caso seja preciso refazer os recortes.

---

## Responsividade

O site foi testado em tamanho de **celular (375 px)** e **tablet (768 px)**:

- **Tablet (até 860 px):** o topo e a vitrine de camisas passam para uma coluna, e o menu usa links menores para caberem todos.
- **Celular (até 560 px):** números em 2 colunas, escudos em 2 colunas, menu só com o escudo e links que rolam para o lado (com um degradê indicando que há mais), e espaçamentos reduzidos.
- Nenhuma tela rola para o lado.

---

## Acessibilidade

- Respeita a opção **"reduzir movimento"** do sistema: sem animações, sem rolagem suave e sem paralaxe.
- Navegação por **teclado**, com contorno visível no foco e setas ← → nas vitrines.
- Textos alternativos nas imagens e `aria-label` nos botões de seta.
- Sem JavaScript, o conteúdo fixo da página continua legível.

---

## Pontos de atenção

- **Direitos de imagem:** o escudo, as camisas e as fotos pertencem ao clube e aos respectivos autores. O site é de torcedor, sem fins oficiais.
- **Conferir os fatos:** os textos de títulos, linha do tempo e ídolos foram escritos sem fontes citadas. Vale revisar antes de divulgar. Os textos dos cartões de camisas e escudos foram escritos a partir dos nomes e anos do painel.
- **Qualidade das camisas e escudos:** as imagens do painel são pequenas (cerca de 130 px cada), então ficam um pouco suaves quando aparecem grandes. Com arquivos individuais em maior resolução, o resultado melhora.
- **Foto do topo:** a foto da torcida tem boa resolução. A foto antiga do estádio, que tinha só 888 px, foi substituída por ela.
