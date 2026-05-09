// ── STATE ──
const state = {
  modalidade: null,
  nome: '',
  whatsapp: '',
  cpf: '',
  limitacao: false,
  limitacaoDesc: '',
  horario: null,
  dia: null,
  diasConsecutivos: []
};

// ── CONFIG ──
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwnQ2BUxUcTq0DftWFoplfPx8pCyUFpCSZr6e37r_r6AYB43DzZ56ZjxcCBdvZfdwZK/exec';
const WHATSAPP_NUMERO = '5591984862479';
const HORARIOS_MUSC = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
const HORARIOS_CROSS = ['06:00','12:30','18:30','19:30','Padrão'];
const DIAS_SEMANA = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const DIAS_CONSECUTIVOS = {
  'Segunda': ['Segunda','Terça','Quarta'],
  'Terça':   ['Terça','Quarta','Quinta'],
  'Quarta':  ['Quarta','Quinta','Sexta'],
  'Quinta':  ['Quinta','Sexta','Segunda'],
  'Sexta':   ['Sexta','Segunda','Terça']
};

// ── STEP NAVIGATION ──
function goStep(n) {
  document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
  const target = n === 'sucesso' ? document.getElementById('stepSucesso') : document.getElementById('step'+n);
  target.classList.add('active');
  updateDots(n);

  if (n === 3) renderHorarios();
  if (n === 4) renderDias();
  if (n === 5) renderResumo();
}

function updateDots(current) {
  for (let i = 1; i <= 5; i++) {
    const dot = document.getElementById('dot'+i);
    if (!dot) continue;
    dot.className = 'step-dot';
    if (i < current) dot.classList.add('done');
    else if (i == current) dot.classList.add('active');
    if (i < 5) {
      const line = document.getElementById('line'+i);
      line.className = 'step-line' + (i < current ? ' done' : '');
    }
  }
  if (current === 'sucesso') {
    document.getElementById('stepsIndicator').style.display = 'none';
  }
}

// ── SELECTS ──
function selectOption(key, val, el) {
  state[key] = val;
  el.closest('.option-grid').querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('btn1').disabled = false;
}

function selectLimitacao(val) {
  state.limitacao = val;
  document.getElementById('limSim').classList.toggle('selected', val);
  document.getElementById('limNao').classList.toggle('selected', !val);
  document.getElementById('limitacaoField').style.display = val ? 'block' : 'none';
  validateStep2();
}

// ── MASKS ──
function maskPhone(el) {
  let v = el.value.replace(/\D/g,'').slice(0,11);
  el.value = v;
}

function maskCPF(el) {
  let v = el.value.replace(/\D/g,'').slice(0,11);
  v = v.replace(/(\d{3})(\d)/,'$1.$2');
  v = v.replace(/(\d{3})(\d)/,'$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  el.value = v;
}

function cpfValido(cpf) {
  cpf = cpf.replace(/\D/g,'');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let s = 0;
  for (let i=0;i<9;i++) s += parseInt(cpf[i])*(10-i);
  let r = (s*10)%11; if(r===10||r===11) r=0;
  if (r !== parseInt(cpf[9])) return false;
  s = 0;
  for (let i=0;i<10;i++) s += parseInt(cpf[i])*(11-i);
  r = (s*10)%11; if(r===10||r===11) r=0;
  return r === parseInt(cpf[10]);
}

// ── VALIDATION ──
function validateStep2() {
  const nome = document.getElementById('nome').value.trim();
  const whats = document.getElementById('whatsapp').value.replace(/\D/g,'');
  const cpf = document.getElementById('cpf').value;
  const limOk = state.limitacao !== null && state.limitacao !== undefined ? 
    (typeof state.limitacao === 'boolean') : false;
  
  const nomeOk = nome.length >= 3 && nome.includes(' ');
  const whatsOk = whats.length >= 10;
  const cpfOk = cpfValido(cpf);
  const limSelected = document.getElementById('limSim').classList.contains('selected') || 
                      document.getElementById('limNao').classList.contains('selected');

  document.getElementById('btn2').disabled = !(nomeOk && whatsOk && cpfOk && limSelected);
}

// ── RENDER HORÁRIOS ──
function renderHorarios() {
  const grid = document.getElementById('horarioGrid');
  const desc = document.getElementById('horarioDesc');
  const horarios = state.modalidade === 'musculacao' ? HORARIOS_MUSC : HORARIOS_CROSS;
  
  desc.textContent = state.modalidade === 'musculacao'
    ? 'Seg a Sex: 07h–17h · Sábado: 09h–14h'
    : 'Horários disponíveis para Cross Training';

  grid.innerHTML = horarios.map(h => `
    <button class="horario-btn${state.horario===h?' selected':''}" onclick="selectHorario('${h}',this)">${h}</button>
  `).join('');
  document.getElementById('btn3').disabled = !state.horario;
}

function selectHorario(h, el) {
  state.horario = h;
  document.querySelectorAll('.horario-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('btn3').disabled = false;
}

// ── RENDER DIAS ──
function renderDias() {
  const grid = document.getElementById('diaGrid');
  const desc = document.getElementById('diaDesc');

  if (state.modalidade === 'cross') {
    desc.textContent = 'Escolha o primeiro dia — suas 3 aulas consecutivas serão definidas automaticamente.';
    const diasCross = Object.keys(DIAS_CONSECUTIVOS);
    grid.innerHTML = diasCross.map(d => {
      const consecutivos = DIAS_CONSECUTIVOS[d];
      return `<button class="dia-btn${state.dia===d?' selected':''}" onclick="selectDia('${d}',this)">
        ${d}<span class="dia-consecutive">${consecutivos.join(' · ')}</span>
      </button>`;
    }).join('');
  } else {
    desc.textContent = 'Escolha o melhor dia para sua aula experimental.';
    grid.innerHTML = DIAS_SEMANA.map(d => `
      <button class="dia-btn${state.dia===d?' selected':''}" onclick="selectDia('${d}',this)">${d}</button>
    `).join('');
  }
  document.getElementById('btn4').disabled = !state.dia;
}

function selectDia(d, el) {
  state.dia = d;
  if (state.modalidade === 'cross') {
    state.diasConsecutivos = DIAS_CONSECUTIVOS[d] || [];
  }
  document.querySelectorAll('.dia-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('btn4').disabled = false;
}

// ── RESUMO ──
function renderResumo() {
  const diasStr = state.modalidade === 'cross'
    ? state.diasConsecutivos.join(', ')
    : state.dia;

  document.getElementById('resumoBox').innerHTML = `
    <div class="resumo-item"><span class="resumo-label">Modalidade</span><span class="resumo-val">${state.modalidade==='musculacao'?'🏋️ Musculação':'⚡ Cross Training'}</span></div>
    <div class="resumo-item"><span class="resumo-label">Nome</span><span class="resumo-val">${document.getElementById('nome').value.trim()}</span></div>
    <div class="resumo-item"><span class="resumo-label">WhatsApp</span><span class="resumo-val">${document.getElementById('whatsapp').value}</span></div>
    <div class="resumo-item"><span class="resumo-label">CPF</span><span class="resumo-val">${document.getElementById('cpf').value}</span></div>
    <div class="resumo-item"><span class="resumo-label">Horário</span><span class="resumo-val">${state.horario}</span></div>
    <div class="resumo-item"><span class="resumo-label">Dia(s)</span><span class="resumo-val">${diasStr}</span></div>
    ${state.limitacao ? `<div class="resumo-item"><span class="resumo-label">Limitação</span><span class="resumo-val" style="color:var(--red)">${document.getElementById('limitacao').value||'Sim'}</span></div>` : ''}
  `;
}

// ── SUBMIT ──
async function submitForm() {
  const nome = document.getElementById('nome').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const limitacaoDesc = document.getElementById('limitacao').value.trim();
  const diasStr = state.modalidade === 'cross'
    ? state.diasConsecutivos.join(', ')
    : state.dia;

  const payload = {
    timestamp: new Date().toLocaleString('pt-BR'),
    nome,
    whatsapp,
    cpf,
    modalidade: state.modalidade === 'musculacao' ? 'Musculação' : 'Cross Training',
    horario: state.horario,
    dia: diasStr,
    limitacao: state.limitacao ? (limitacaoDesc || 'Sim') : 'Não'
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
  } catch(e) {
    console.warn('Sheets error (ignorado em no-cors):', e);
  }

  document.getElementById('loadingOverlay').classList.remove('show');

  // Tela de sucesso
  document.getElementById('successMsg').textContent =
    `Olá ${nome.split(' ')[0]}! Sua aula de ${payload.modalidade} foi agendada com sucesso.`;

  const diasHtml = state.modalidade === 'cross'
    ? `<p>Seus 3 dias de treino:</p><strong>${state.diasConsecutivos.join(' · ')}</strong><br><span style="font-size:0.8rem;color:var(--gray)">Horário: ${state.horario}</span>`
    : `<p>Data e horário:</p><strong>${state.dia} às ${state.horario}</strong>`;

  document.getElementById('successDias').innerHTML = diasHtml;

  const msg = encodeURIComponent(`Olá! Acabei de agendar minha aula de cortesia de ${payload.modalidade} na Academia Belfort para ${diasStr} às ${state.horario}. Nome: ${nome}`);
  document.getElementById('btnWhats').href = `https://wa.me/${WHATSAPP_NUMERO}?text=${msg}`;

  goStep('sucesso');
}