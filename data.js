/* ==========================================================================
   DATA.JS · o CONTEÚDO do site (os dados)

   Aqui ficam só informações, sem lógica. É o arquivo que você mais vai editar.
   Cada lista abaixo é um ARRAY: vários itens entre [ ], separados por vírgula.
   Cada item é um OBJETO: pares nome: valor entre { }.
       { ano: 1898, txt: "Fundação" }
   Para ADICIONAR algo, copie um item, cole logo abaixo (com vírgula entre eles)
   e troque os valores. Textos sempre entre aspas.
   Cuidado com vírgulas e aspas: um erro aqui quebra o site inteiro.

   Imagens oficiais: coloque os arquivos em assets/escudos/ e assets/camisas/
   e preencha o campo "img" (ex.: img: "assets/escudos/1898.png").
   Sem "img", o site desenha uma ilustração no lugar.
   ========================================================================== */

// TITULOS: nome da competição, quantidade, anos e categoria.
// "cat" precisa ser: "internacional", "nacional" ou "estadual" (usado pelos filtros).

const TITULOS = [
  { nome: "Campeonato Brasileiro", qtd: 4, anos: [1974, 1989, 1997, 2000], cat: "nacional" },
  { nome: "Copa do Brasil", qtd: 1, anos: [2011], cat: "nacional" },
  { nome: "Torneio Rio-São Paulo", qtd: 1, anos: [1958], cat: "nacional" },
  { nome: "Copa Libertadores da América", qtd: 1, anos: [1998], cat: "internacional" },
  { nome: "Copa Mercosul", qtd: 1, anos: [2000], cat: "internacional" },
  { nome: "Campeonato Sul-Americano de Campeões", qtd: 1, anos: [1948], cat: "internacional" },
  {
    nome: "Campeonato Carioca", qtd: 24, cat: "estadual",
    anos: [1923, 1924, 1929, 1934, 1936, 1945, 1947, 1949, 1950, 1952, 1956, 1958,
           1970, 1977, 1982, 1987, 1988, 1992, 1993, 1994, 1998, 2000, 2003, 2015]
  }
];

// LINHA_DO_TEMPO: um item por fato histórico, com ano e texto.
const LINHA_DO_TEMPO = [
  { ano: 1898, txt: "Em 21 de agosto, nasce o Club de Regatas Vasco da Gama, fundado por imigrantes portugueses e brasileiros no Rio de Janeiro. Começa nas águas, no remo." },
  { ano: 1915, txt: "O clube cria o departamento de futebol, após a fusão com o Lusitânia." },
  { ano: 1923, txt: "Primeiro título carioca, com um time que incluía jogadores negros e operários, quebrando as barreiras da elite do futebol da época. É o time da Camisa Preta." },
  { ano: 1927, txt: "Inauguração do Estádio de São Januário, o 'Caldeirão', maior estádio do país na época." },
  { ano: 1934, txt: "Os dirigentes recusam a ‘lei do amadorismo’ da época, mantendo o time aberto a todos os jogadores." },
  { ano: 1948, txt: "O Expresso da Vitória conquista o Sul-Americano de Campeões, em Santiago, considerado o precursor da Libertadores." },
  { ano: 1974, txt: "Roberto Dinamite surge e o Vasco conquista seu primeiro Campeonato Brasileiro." },
  { ano: 1989, txt: "Segundo Brasileirão, com gol decisivo de Sorato na final contra o São Paulo." },
  { ano: 1997, txt: "Terceiro título brasileiro, com Edmundo e Juninho Pernambucano." },
  { ano: 1998, txt: "Campeão da Copa Libertadores da América, diante do Barcelona de Guayaquil." },
  { ano: 2000, txt: "Ano de ouro: Copa Mercosul, Brasileirão e Carioca. Romário e Euller em campo." },
  { ano: 2011, txt: "Campeão da Copa do Brasil sobre o Coritiba, com Juninho Pernambucano de volta ao clube." }
];

// IDOLOS: nome, posição e uma frase sobre cada jogador.
const IDOLOS = [
  { nome: "Roberto Dinamite", pos: "Atacante", txt: "Maior artilheiro da história do clube e símbolo da torcida. Ex-presidente do Vasco." },
  { nome: "Ademir de Menezes", pos: "Atacante", txt: "Craque do Expresso da Vitória, artilheiro da Copa do Mundo de 1950." },
  { nome: "Barbosa", pos: "Goleiro", txt: "Goleiro do Expresso da Vitória e da Seleção na Copa de 1950." },
  { nome: "Bellini", pos: "Zagueiro", txt: "Capitão da Seleção campeã do mundo em 1958." },
  { nome: "Romário", pos: "Atacante", txt: "Craque do tetra, campeão brasileiro e da Mercosul pelo Vasco." },
  { nome: "Edmundo", pos: "Atacante", txt: "O Animal, protagonista do título brasileiro de 1997." },
  { nome: "Juninho Pernambucano", pos: "Meia", txt: "Mestre das faltas, campeão da Libertadores e ídolo da torcida." },
  { nome: "Felipe", pos: "Meia", txt: "Craque da geração dos títulos de 2000 e da Copa do Brasil de 2011." }
];


// CAMISAS: uma por época. Cada item tem as imagens em assets/camisas/.
//   era    = período     titulo = descrição curta     txt = texto do cartão
//   img    = foto da camisa (PNG com fundo transparente)
// Para adicionar uma camisa, coloque o arquivo na pasta e copie uma linha abaixo.
const CAMISAS = [
  { era: "1898–1900", titulo: "Primeiro uniforme", txt: "O primeiro uniforme do clube: camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c01.png" },
  { era: "1901–1905", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c02.png" },
  { era: "1906–1910", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c03.png" },
  { era: "1911–1919", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c04.png" },
  { era: "1920–1929", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c05.png" },
  { era: "1930–1939", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c06.png" },
  { era: "1940–1949", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c07.png" },
  { era: "1950–1959", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c08.png" },
  { era: "1960–1969", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c09.png" },
  { era: "1970–1979", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c10.png" },
  { era: "1980–1989", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c11.png" },
  { era: "1990–1999", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c12.png" },
  { era: "2000–2009", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c13.png" },
  { era: "2010–2011", titulo: "Branco com faixa preta", txt: "Camisa branca com a faixa diagonal preta e a Cruz de Malta no peito.", img: "assets/camisas/c14.png" },
  { era: "2012–2013", titulo: "Preto com faixa branca", txt: "Camisa preta com a faixa diagonal branca, o desenho mais associado ao clube nos tempos atuais.", img: "assets/camisas/c15.png" },
  { era: "2014–2015", titulo: "Preto com faixa branca", txt: "Camisa preta com a faixa diagonal branca, o desenho mais associado ao clube nos tempos atuais.", img: "assets/camisas/c16.png" },
  { era: "2016–2017", titulo: "Preto com faixa branca", txt: "Camisa preta com a faixa diagonal branca, o desenho mais associado ao clube nos tempos atuais.", img: "assets/camisas/c17.png" },
  { era: "2018–2019", titulo: "Preto com faixa branca", txt: "Camisa preta com a faixa diagonal branca, o desenho mais associado ao clube nos tempos atuais.", img: "assets/camisas/c18.png" },
  { era: "2020–2021", titulo: "Preto com faixa branca", txt: "Camisa preta com a faixa diagonal branca, o desenho mais associado ao clube nos tempos atuais.", img: "assets/camisas/c19.png" },
  { era: "2022–2023", titulo: "Preto com faixa branca", txt: "Camisa preta com a faixa diagonal branca, o desenho mais associado ao clube nos tempos atuais.", img: "assets/camisas/c20.png" },
  { era: "2023–2024", titulo: "Preto com faixa branca", txt: "Camisa preta com a faixa diagonal branca, o desenho mais associado ao clube nos tempos atuais.", img: "assets/camisas/c21.png" },
  { era: "2024–2025", titulo: "Preto com faixa branca", txt: "Camisa preta com a faixa diagonal branca, o desenho mais associado ao clube nos tempos atuais.", img: "assets/camisas/c22.png" },
  { era: "2025–atual", titulo: "Preto com faixa branca", txt: "Camisa preta com a faixa diagonal branca, o desenho mais associado ao clube nos tempos atuais.", img: "assets/camisas/c23.png" }
];

// ESCUDOS: do mais antigo ao mais novo. Imagens em assets/escudos/.
//   ano = quando surgiu    nome e txt = textos do cartão    img = imagem do escudo
const ESCUDOS = [
  { nome: "Primeiro escudo", ano: "1898", txt: "Primeiro escudo do clube, em forma de monograma.", img: "assets/escudos/e01.png" },
  { nome: "Escudo simplificado", ano: "1900", txt: "Versão mais simples do monograma, em formato redondo.", img: "assets/escudos/e02.png" },
  { nome: "Escudo com a Cruz de Malta", ano: "1903", txt: "A Cruz de Malta, símbolo ligado ao navegador Vasco da Gama, passa a ser a imagem central.", img: "assets/escudos/e03.png" },
  { nome: "Escudo com o navio", ano: "1915", txt: "Entra a caravela, em referência às navegações.", img: "assets/escudos/e04.png" },
  { nome: "Escudo oficial", ano: "1920", txt: "O formato de brasão com a caravela, as iniciais e a faixa diagonal.", img: "assets/escudos/e05.png" },
  { nome: "Contornos mais definidos", ano: "1940", txt: "O escudo ganha traços e contornos mais definidos.", img: "assets/escudos/e06.png" },
  { nome: "Novo formato", ano: "1952", txt: "Novo formato do escudo.", img: "assets/escudos/e07.png" },
  { nome: "Escudo modernizado", ano: "1974", txt: "Desenho atualizado, com linhas mais limpas.", img: "assets/escudos/e08.png" },
  { nome: "Ajustes no escudo", ano: "1997", txt: "Pequenos ajustes de desenho e proporção.", img: "assets/escudos/e09.png" },
  { nome: "Escudo atual", ano: "2011", txt: "O formato usado atualmente.", img: "assets/escudos/e10.png" }
];

// CURIOSIDADES: só uma lista de frases (textos entre aspas).
const CURIOSIDADES = [
  "O nome homenageia o navegador português Vasco da Gama, que chegou à Índia em 1498.",
  "A cruz do escudo é a Cruz de Malta/Ordem de Cristo, estampada nas velas das caravelas portuguesas.",
  "O Vasco foi pioneiro em escalar jogadores negros e operários, em uma época de futebol elitista.",
  "O mascote é o Almirante, referência ao navegador.",
  "O apelido do clube é Gigante da Colina, pela localização de São Januário.",
  "São Januário é um dos estádios mais tradicionais do país e já foi o maior do Brasil."
];
