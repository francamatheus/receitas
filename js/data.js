// ─────────────────────────────────────────────
// Model — adicione receitas aqui
// ─────────────────────────────────────────────

const CATEGORIES = [
  { id: 'lanches',    label: '🥪 Lanches' },
  { id: 'carnes',     label: '🥩 Carnes' },
  { id: 'massas',     label: '🍝 Massas' },
  { id: 'sobremesas', label: '🍰 Sobremesas' },
  { id: 'molhos',     label: '🫙 Molhos e Acompanhamentos' },
];

// Ingrediente com quantidade escalável:
//   { qty, unit, rest }          → "336g de acém moído"  (unit fixo, ex: "g")
//   { qty, unitSg, unitPl, rest } → "1 colher de chá de sal" / "2 colheres de chá de sal"
//
// Ingrediente fixo (sem escala):
//   { fixed: 'Pitada de sal' }

const RECIPES = [
  {
    id: 'hamburguer-artesanal',
    title: 'Hambúrguer Artesanal na Tábua de Ferro',
    category: 'lanches',
    prepTime: '20 min',
    cookTime: '10 min',
    servings: 4,
    servingsLabel: 'hambúrgueres',
    ingredientGroups: [
      {
        name: 'Disco de carne',
        items: [
          { qty: 336,  unit: 'g',                                         rest: ' de acém moído (70%)' },
          { qty: 144,  unit: 'g',                                         rest: ' de fraldinha moída (30%)' },
          { qty: 1,    unitSg: 'colher de chá',  unitPl: 'colheres de chá',  rest: ' de sal grosso' },
          { qty: 1,    unitSg: 'colher de chá',  unitPl: 'colheres de chá',  rest: ' de pimenta-do-reino' },
        ],
      },
      {
        name: 'Montagem',
        items: [
          { qty: 4,    unitSg: 'pão de hambúrguer',    unitPl: 'pães de hambúrguer',    rest: '' },
          { fixed: 'Manteiga para tostar o pão' },
          { qty: 4,    unitSg: 'fatia',                unitPl: 'fatias',                rest: ' de queijo mussarela ou american cheese' },
          { qty: 4,    unitSg: 'folha',                unitPl: 'folhas',                rest: ' de alface' },
          { qty: 1,    unitSg: 'tomate médio',         unitPl: 'tomates médios',        rest: ' em rodelas' },
          { qty: 1,    unitSg: 'cebola roxa média',    unitPl: 'cebolas roxas médias',  rest: ' em rodelas finas' },
          { fixed: 'Burger Sauce Clássico (ver receita abaixo)' },
        ],
      },
    ],
    stepGroups: [
      {
        name: 'Carne',
        steps: [
          'Peça ao açougueiro para moer os 336g de acém e os 144g de fraldinha juntos na hora. Se possível, passe duas vezes no moedor.',
          'Em casa, misture a carne levemente com as mãos — só até incorporar. Não sove.',
          'Divida em 4 porções de ~120g e modele os discos com a mão. Faça uma leve pressão no centro para não emborricar na churrasqueira.',
          'Tempere com sal grosso e pimenta-do-reino só na hora de grelhar — temperar antes desidrata a carne.',
        ],
      },
      {
        name: 'Churrasqueira',
        steps: [
          'Aqueça bem a tábua de ferro na churrasqueira em fogo alto por pelo menos 5 min antes de colocar a carne.',
          'Coloque os discos na tábua e grelhe por 3 min e 30 seg de cada lado sem apertar com a espátula.',
          'No último minuto, coloque 1 fatia de queijo por cima de cada disco e tampe com uma tampa ou tigela de inox para derreter.',
        ],
      },
      {
        name: 'Pão',
        steps: [
          'Passe manteiga nos dois lados do pão e toste na própria tábua de ferro por 1 a 2 min até dourar levemente.',
        ],
      },
      {
        name: 'Montagem (de baixo pra cima)',
        steps: [
          'Pão de baixo → Burger Sauce → alface → tomate → hambúrguer com queijo → cebola roxa → Burger Sauce → pão de cima.',
        ],
      },
    ],
    tip: 'Tampar o queijo nos últimos segundos é o segredo para derreter sem ressecar a carne. Se não tiver tampa, use papel alumínio dobrado por cima.',
  },

  {
    id: 'burger-sauce-classico',
    title: 'Burger Sauce Clássico',
    category: 'lanches',
    prepTime: '5 min',
    cookTime: null,
    servings: 4,
    servingsLabel: 'hambúrgueres',
    ingredientGroups: [
      {
        name: null,
        items: [
          { qty: 4,    unitSg: 'colher de sopa', unitPl: 'colheres de sopa', rest: ' de maionese' },
          { qty: 1,    unitSg: 'colher de sopa', unitPl: 'colheres de sopa', rest: ' de ketchup' },
          { qty: 1,    unitSg: 'colher de chá',  unitPl: 'colheres de chá',  rest: ' de mostarda amarela' },
          { qty: 1,    unitSg: 'colher de sopa', unitPl: 'colheres de sopa', rest: ' de picles picado fino (ou pepino em conserva)' },
          { qty: 0.25, unitSg: 'colher de chá',  unitPl: 'colheres de chá',  rest: ' de cebola em pó' },
          { qty: 0.25, unitSg: 'colher de chá',  unitPl: 'colheres de chá',  rest: ' de páprica doce' },
          { fixed: 'Pitada de sal' },
        ],
      },
    ],
    stepGroups: [
      {
        name: null,
        steps: [
          'Misture as 4 colheres de maionese com 1 colher de ketchup e 1 colher de chá de mostarda em uma tigela pequena.',
          'Adicione 1 colher de picles picado fino, ¼ colher de chá de cebola em pó e ¼ colher de chá de páprica.',
          'Tempere com uma pitada de sal, misture bem e leve à geladeira por pelo menos 15 min antes de usar.',
        ],
      },
    ],
    tip: 'O descanso na geladeira é importante — os sabores se integram e o molho fica muito melhor. Pode fazer de manhã e deixar para a noite.',
  },
];
