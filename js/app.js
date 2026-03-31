// ─────────────────────────────────────────────
// Controller — lógica e renderização
// ─────────────────────────────────────────────

// ── Render ───────────────────────────────────

function render() {
  const main = document.getElementById('cookbook');

  CATEGORIES.forEach(cat => {
    const recipes = RECIPES.filter(r => r.category === cat.id);
    main.appendChild(renderCategory(cat, recipes));
  });
}

function renderCategory(cat, recipes) {
  const section = el('section', 'category');

  const header = el('div', 'category-header');
  header.appendChild(el('h2', '', cat.label));
  section.appendChild(header);

  if (recipes.length === 0) {
    section.appendChild(el('p', 'empty', 'Nenhuma receita ainda.'));
    return section;
  }

  const list = el('div', 'recipe-list');
  recipes.forEach(r => list.appendChild(renderRecipe(r)));
  section.appendChild(list);

  return section;
}

function renderRecipe(recipe) {
  const card = el('div', 'recipe');
  card.id = recipe.id;

  // ── Toggle button ──
  const toggle = document.createElement('button');
  toggle.className = 'recipe-toggle';
  toggle.addEventListener('click', () => card.classList.toggle('open'));

  const title = el('span', 'recipe-title', recipe.title);

  const meta = el('span', 'recipe-meta');
  const timeStr = recipe.cookTime
    ? `⏱ ${recipe.prepTime} preparo · ${recipe.cookTime} cozimento`
    : `⏱ ${recipe.prepTime} · sem cozimento`;
  meta.appendChild(el('span', '', timeStr));
  meta.appendChild(el('span', '', `🍽 ${recipe.servings} ${recipe.servingsLabel}`));

  toggle.appendChild(title);
  toggle.appendChild(meta);
  toggle.innerHTML += `<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`;

  card.appendChild(toggle);
  card.appendChild(renderBody(recipe));

  return card;
}

function renderBody(recipe) {
  const body = el('div', 'recipe-body');

  // ── Servings control ──
  body.appendChild(renderServingsControl(recipe.servings));

  // ── Ingredients ──
  body.appendChild(el('h3', '', '📦 Ingredientes'));
  recipe.ingredientGroups.forEach(group => {
    if (group.name) body.appendChild(el('h4', '', group.name));
    body.appendChild(renderIngredientList(group.items));
  });

  // ── Steps ──
  body.appendChild(el('h3', '', '👨‍🍳 Modo de preparo'));
  let stepCounter = 0;
  recipe.stepGroups.forEach(group => {
    if (group.name) body.appendChild(el('h4', '', group.name));
    const ol = el('ol', 'step-list');
    ol.style.counterReset = `steps ${stepCounter}`;
    group.steps.forEach(step => ol.appendChild(el('li', '', step)));
    stepCounter += group.steps.length;
    body.appendChild(ol);
  });

  // ── Tip ──
  const tip = el('div', 'tip');
  tip.appendChild(el('strong', '', '💡 Dica'));
  tip.appendChild(document.createTextNode(recipe.tip));
  body.appendChild(tip);

  return body;
}

function renderServingsControl(baseServings) {
  const ctrl = el('div', 'servings-control');

  ctrl.appendChild(el('span', 'servings-label', 'Porções'));

  const btnMinus = el('button', 'servings-btn', '−');
  btnMinus.addEventListener('click', () => adjustServings(input, -1));

  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'servings-input';
  input.value = baseServings;
  input.min = 1;
  input.max = 99;
  input.dataset.base = baseServings;
  input.addEventListener('input', () => scaleRecipe(input));

  const btnPlus = el('button', 'servings-btn', '+');
  btnPlus.addEventListener('click', () => adjustServings(input, 1));

  const resetBtn = el('button', 'reset-btn', '↺ original');
  resetBtn.addEventListener('click', () => {
    input.value = baseServings;
    scaleRecipe(input);
  });

  const badge = el('span', 'servings-scaled-badge', 'escalado');

  ctrl.appendChild(btnMinus);
  ctrl.appendChild(input);
  ctrl.appendChild(btnPlus);
  ctrl.appendChild(resetBtn);
  ctrl.appendChild(badge);

  return ctrl;
}

function renderIngredientList(items) {
  const ul = el('ul', 'ingredient-list');

  items.forEach(item => {
    const li = document.createElement('li');

    if (item.fixed) {
      li.textContent = item.fixed;
    } else {
      const qtySpan = el('span', 'qty', formatQty(item.qty));
      li.dataset.qty = item.qty;
      if (item.unit)   li.dataset.unit   = item.unit;
      if (item.unitSg) li.dataset.unitSg = item.unitSg;
      if (item.unitPl) li.dataset.unitPl = item.unitPl;
      li.dataset.rest = item.rest ?? '';

      li.appendChild(qtySpan);

      if (item.unit) {
        li.appendChild(document.createTextNode(item.unit + item.rest));
      } else {
        const unit = item.qty <= 1 ? item.unitSg : item.unitPl;
        li.appendChild(document.createTextNode(' ' + unit + item.rest));
      }
    }

    ul.appendChild(li);
  });

  return ul;
}

// ── Servings scaling ─────────────────────────

function adjustServings(input, delta) {
  input.value = Math.max(1, parseInt(input.value || input.dataset.base) + delta);
  scaleRecipe(input);
}

function scaleRecipe(input) {
  const base   = parseFloat(input.dataset.base);
  const target = parseFloat(input.value) || base;
  const ratio  = target / base;
  const card   = input.closest('.recipe');
  const badge  = input.closest('.servings-control').querySelector('.servings-scaled-badge');
  const scaled = Math.abs(ratio - 1) > 0.001;

  badge.classList.toggle('visible', scaled);

  card.querySelectorAll('[data-qty]').forEach(li => {
    const baseQty = parseFloat(li.dataset.qty);
    const newQty  = baseQty * ratio;
    const unitSg  = li.dataset.unitSg || li.dataset.unit || '';
    const unitPl  = li.dataset.unitPl || li.dataset.unit || '';
    const rest    = li.dataset.rest ?? '';

    li.querySelector('.qty').textContent = formatQty(newQty);

    // rebuild trailing text node
    const span = li.querySelector('.qty');
    let node = span.nextSibling;
    while (node) { const next = node.nextSibling; li.removeChild(node); node = next; }

    if (li.dataset.unit) {
      li.appendChild(document.createTextNode(li.dataset.unit + rest));
    } else {
      const unit = newQty <= 1 ? unitSg : unitPl;
      li.appendChild(document.createTextNode(' ' + unit + rest));
    }

    li.classList.toggle('scaled', scaled);
  });
}

// ── Helpers ──────────────────────────────────

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatQty(n) {
  if (n <= 0) return '0';

  const fracs = [
    [1/4, '¼'], [1/3, '⅓'], [1/2, '½'], [2/3, '⅔'], [3/4, '¾'],
  ];

  const whole = Math.floor(n);
  const frac  = n - whole;

  for (const [val, sym] of fracs) {
    if (Math.abs(frac - val) < 0.07) return whole > 0 ? `${whole} ${sym}` : sym;
  }

  if (Math.abs(n - Math.round(n)) < 0.07) return String(Math.round(n));

  return n.toFixed(1).replace('.', ',');
}

// ── Boot ─────────────────────────────────────

document.addEventListener('DOMContentLoaded', render);
