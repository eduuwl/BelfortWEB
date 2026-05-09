// ── STATE ──
const state = {
  nome: '', nascimento: '', email: '', cpf: '',
  endereco: '', whatsapp: '', instagram: '',
  limitacao: null, limitacaoDesc: '',
  modalidade: null, unidade: null,
  horario: null, plano: null,
  aceite: false
};

// ── CONFIG ──
const APPS_SCRIPT_URL = 'COLE_A_URL_DO_APPS_SCRIPT_AQUI';
const WHATSAPP_NUMERO = '5591984862479';

// ── PLANOS ──
const PLANOS = {
  musculacao: [
    { id: 'musc_mensal',    nome: 'Mensal',     detalhe: 'Pagamento único',      preco: 'R$ 110,00',  parcela: '' },
    { id: 'musc_trim',      nome: 'Trimestral', detalhe: '3 meses',              preco: 'R$ 315,00',  parcela: '3x de R$ 105,00' },
    { id: 'musc_sem',       nome: 'Semestral',  detalhe: '6 meses',              preco: 'R$ 600,00',  parcela: '6x de R$ 100,00' },
  ],
  cross: [
    { id: 'cross_mensal',   nome: 'Mensal',     detalhe: 'Pagamento único',      preco: 'R$ 190,00',  parcela: '' },
    { id: 'cross_trim',     nome: 'Trimestral', detalhe: '3 meses',              preco: 'R$ 510,00',  parcela: '3x de R$ 170,00' },
    { id: 'cross_sem',      nome: 'Semestral',  detalhe: '6 meses',              preco: 'R$ 900,00',  parcela: '6x de R$ 150,00' },
  ]
};

// ── HORÁRIOS CROSS ──
const HORARIOS_CROSS = ['06:00','07:00','08:00','10:00','18:30','19:30','20:30'];

// ── NAVEGAÇÃO ──
function goStep(n) {
  document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
  const target = n === 'sucesso'
    ? document.getElementById('stepSucesso')
    : document.getElementById('step' + n);
  target.classList.add('active');
  updateDots(n);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (n === 4) renderStep4();
  if (n === 6) renderResumo();
}

function updateDots(current) {
  for (let i = 1; i <= 6; i++) {
    const dot = document.getElementById('dot' + i);
    if (!dot) continue;
    dot.className = 'step-dot';
    if (i < current) dot.classList.add('done');
    else if (i == current) dot.classList.add('active');
    if (i < 6) {
      const line = document.getElementById('line' + i);
      if (line) line.className = 'step-line' + (i < current ? ' done' : '');
    }
  }
  if (current === 'sucesso') {
    document.getElementById('stepsIndicator').style.display = 'none';
  }
}

// ── VALIDAÇÕES ──
function validateStep1() {
  const nome = document.getElementById('nome').value.trim();
  const nasc = document.getElementById('nascimento').value;
  const email = document.getElementById('email').value.trim();
  const cpf = document.getElementById('cpf').value;
  const end = document.getElementById('endereco').value.trim();
  const whats = document.getElementById('whatsapp').value.replace(/\D/g, '');

  const ok = nome.length >= 3 && nome.includes(' ')
    && nasc !== ''
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && cpfValido(cpf)
    && end.length >= 5
    && whats.length >= 10;

  document.getElementById('btn1').disabled = !ok;
}

function validateStep5() {
  const ok = document.getElementById('aceiteCheck').checked;
  document.getElementById('btn5').disabled = !ok;
}

// ── LIMITAÇÃO ──
function selectLimitacao(val) {
  state.limitacao = val;
  document.getElementById('limSim').classList.toggle('selected', val);
  document.getElementById('limNao').classList.toggle('selected', !val);
  document.getElementById('limitacaoField').style.display = val ? 'block' : 'none';
  document.getElementById('btn2').disabled = false;
}

// ── MODALIDADE / UNIDADE ──
function selectModalidade(val, el) {
  state.modalidade = val;
  state.horario = null;
  state.plano = null;
  document.querySelectorAll('#step3 .option-grid:first-of-type .option-btn')
    .forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  checkStep3();
}

function selectUnidade(val, el) {
  state.unidade = val;
  document.querySelectorAll('#step3 .option-grid:last-of-type .option-btn')
    .forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  checkStep3();
}

function checkStep3() {
  document.getElementById('btn3').disabled = !(state.modalidade && state.unidade);
}

// ── STEP 4: HORÁRIO + PLANO ──
function renderStep4() {
  const horarioSection = document.getElementById('horarioSection');
  const desc = document.getElementById('step4Desc');

  if (state.modalidade === 'cross') {
    horarioSection.style.display = 'block';
    desc.textContent = 'Escolha seu horário preferido e o plano desejado.';
    renderHorarios();
  } else {
    horarioSection.style.display = 'none';
    desc.textContent = 'Musculação tem horário livre. Escolha seu plano.';
    state.horario = 'Livre';
  }

  renderPlanos();
  checkStep4();
}

function renderHorarios() {
  document.getElementById('horarioGrid').innerHTML = HORARIOS_CROSS.map(h => `
    <button class="horario-btn${state.horario === h ? ' selected' : ''}" onclick="selectHorario('${h}', this)">${h}</button>
  `).join('');
}

function selectHorario(h, el) {
  state.horario = h;
  document.querySelectorAll('.horario-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  checkStep4();
}

function renderPlanos() {
  const planos = PLANOS[state.modalidade] || [];
  document.getElementById('planosGrid').innerHTML = planos.map(p => `
    <div class="plano-card${state.plano === p.id ? ' selected' : ''}" onclick="selectPlano('${p.id}', this)">
      <div>
        <div class="plano-nome">${p.nome}</div>
        <div class="plano-detalhe">${p.detalhe}</div>
      </div>
      <div class="plano-valor">
        <div class="plano-preco">${p.preco}</div>
        ${p.parcela ? `<div class="plano-parcela">${p.parcela}</div>` : ''}
      </div>
    </div>
  `).join('');
}

function selectPlano(id, el) {
  state.plano = id;
  document.querySelectorAll('.plano-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  checkStep4();
}

function checkStep4() {
  const horarioOk = state.modalidade === 'musculacao' || state.horario !== null;
  document.getElementById('btn4').disabled = !(horarioOk && state.plano);
}

// ── RESUMO ──
function renderResumo() {
  const planoObj = (PLANOS[state.modalidade] || []).find(p => p.id === state.plano);
  const planoStr = planoObj ? `${planoObj.nome} — ${planoObj.preco}` : '';
  const unidadeStr = state.unidade === 'telegrafo' ? 'Telégrafo' : 'Sacramenta';
  const modalidadeStr = state.modalidade === 'musculacao' ? '🏋️ Musculação' : '⚡ Cross Training';
  const limitStr = state.limitacao
    ? (document.getElementById('limitacao').value.trim() || 'Sim')
    : 'Não';

  document.getElementById('resumoBox').innerHTML = `
    <div class="resumo-item"><span class="resumo-label">Nome</span><span class="resumo-val">${document.getElementById('nome').value.trim()}</span></div>
    <div class="resumo-item"><span class="resumo-label">Nascimento</span><span class="resumo-val">${formatDate(document.getElementById('nascimento').value)}</span></div>
    <div class="resumo-item"><span class="resumo-label">E-mail</span><span class="resumo-val">${document.getElementById('email').value.trim()}</span></div>
    <div class="resumo-item"><span class="resumo-label">CPF</span><span class="resumo-val">${document.getElementById('cpf').value}</span></div>
    <div class="resumo-item"><span class="resumo-label">Endereço</span><span class="resumo-val">${document.getElementById('endereco').value.trim()}</span></div>
    <div class="resumo-item"><span class="resumo-label">WhatsApp</span><span class="resumo-val">${document.getElementById('whatsapp').value}</span></div>
    ${document.getElementById('instagram').value ? `<div class="resumo-item"><span class="resumo-label">Instagram</span><span class="resumo-val">${document.getElementById('instagram').value}</span></div>` : ''}
    <div class="resumo-item"><span class="resumo-label">Limitação</span><span class="resumo-val">${limitStr}</span></div>
    <div class="resumo-item"><span class="resumo-label">Modalidade</span><span class="resumo-val">${modalidadeStr}</span></div>
    <div class="resumo-item"><span class="resumo-label">Unidade</span><span class="resumo-val">${unidadeStr}</span></div>
    ${state.modalidade === 'cross' ? `<div class="resumo-item"><span class="resumo-label">Horário</span><span class="resumo-val">${state.horario}</span></div>` : ''}
    <div class="resumo-item"><span class="resumo-label">Plano</span><span class="resumo-val">${planoStr}</span></div>
  `;
}

// ── SUBMIT ──
async function submitForm() {
  const planoObj = (PLANOS[state.modalidade] || []).find(p => p.id === state.plano);
  const payload = {
    timestamp: new Date().toLocaleString('pt-BR'),
    nome: document.getElementById('nome').value.trim(),
    nascimento: formatDate(document.getElementById('nascimento').value),
    email: document.getElementById('email').value.trim(),
    cpf: document.getElementById('cpf').value.trim(),
    endereco: document.getElementById('endereco').value.trim(),
    whatsapp: document.getElementById('whatsapp').value.trim(),
    instagram: document.getElementById('instagram').value.trim() || '-',
    limitacao: state.limitacao ? (document.getElementById('limitacao').value.trim() || 'Sim') : 'Não',
    modalidade: state.modalidade === 'musculacao' ? 'Musculação' : 'Cross Training',
    unidade: state.unidade === 'telegrafo' ? 'Telégrafo' : 'Sacramenta',
    horario: state.horario || 'Livre',
    plano: planoObj ? `${planoObj.nome} — ${planoObj.preco}` : '',
    aceite: 'Sim'
  };

  document.getElementById('loadingOverlay').classList.add('show');
  document.getElementById('btnSubmit').disabled = true;

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    console.warn('Sheets error:', e);
  }

  document.getElementById('loadingOverlay').classList.remove('show');

  const nome = payload.nome.split(' ')[0];
  document.getElementById('successMsg').textContent =
    `Olá ${nome}! Seu pré-cadastro foi realizado com sucesso.`;

  document.getElementById('successBox').innerHTML = `
    <strong>${payload.modalidade}</strong> · ${state.unidade === 'telegrafo' ? 'Telégrafo' : 'Sacramenta'}<br>
    Plano: ${planoObj ? planoObj.nome : ''}<br>
    ${state.modalidade === 'cross' ? `Horário: ${state.horario}` : 'Horário: Livre'}
  `;

  const msg = encodeURIComponent(`Olá! Acabei de realizar meu pré-cadastro na Academia Belfort. Nome: ${payload.nome} | Modalidade: ${payload.modalidade} | Plano: ${planoObj ? planoObj.nome : ''} | Unidade: ${payload.unidade}`);
  document.getElementById('btnWhats').href = `https://wa.me/${WHATSAPP_NUMERO}?text=${msg}`;

  goStep('sucesso');
}

// ── UTILITÁRIOS ──
function maskPhone(el) {
  el.value = el.value.replace(/\D/g, '').slice(0, 11);
}

function maskCPF(el) {
  let v = el.value.replace(/\D/g, '').slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  el.value = v;
}

function cpfValido(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += parseInt(cpf[i]) * (10 - i);
  let r = (s * 10) % 11; if (r === 10 || r === 11) r = 0;
  if (r !== parseInt(cpf[9])) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += parseInt(cpf[i]) * (11 - i);
  r = (s * 10) % 11; if (r === 10 || r === 11) r = 0;
  return r === parseInt(cpf[10]);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}