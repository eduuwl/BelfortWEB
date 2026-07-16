/**
 * Academia Belfort — recebe os POSTs do backend NestJS (rotas /cortesia e /matricula)
 * e grava cada um numa aba diferente desta planilha. Também expõe uma leitura (doGet)
 * protegida por segredo, usada pelo backend para checar duplicidade de CPF e montar
 * os lembretes de aula por e-mail.
 *
 * Como implantar:
 * 1. Crie uma planilha nova no Google Sheets.
 * 2. Extensões → Apps Script.
 * 3. Apague o conteúdo padrão e cole este arquivo inteiro.
 * 4. Troque SHARED_SECRET abaixo por um valor aleatório seu.
 * 5. Salve, depois Implantar → Nova implantação → tipo "App da Web".
 *    Executar como: Eu. Quem pode acessar: Qualquer pessoa.
 * 6. Autorize as permissões pedidas (é a sua própria planilha).
 * 7. Copie a URL do App da Web e cole em backend/.env, nas variáveis:
 *    APPS_SCRIPT_URL_CORTESIA e APPS_SCRIPT_URL_MATRICULA (é a mesma URL para as duas).
 * 8. Cole o mesmo valor de SHARED_SECRET em backend/.env, na variável APPS_SCRIPT_SHARED_SECRET.
 *
 * Se editar este arquivo depois de já ter implantado uma vez, é preciso reimplantar:
 * Implantar → Gerenciar implantações → ícone de lápis → Versão: "Nova versão" → Implantar.
 * A URL continua a mesma, não precisa trocar no backend.
 *
 * Importante: as colunas de cada aba são formatadas como texto puro (@) na criação, pra
 * evitar que o Sheets "adivinhe" que valores como "07:00", "20/07/2026" ou um WhatsApp
 * são hora/data/número e converta a célula sozinho. Se uma aba já existir de antes dessa
 * mudança, apague a aba pra ela ser recriada com a formatação certa.
 */

var SHARED_SECRET = 'TROQUE_ESTE_SEGREDO';
var CODE_VERSION = 'v3-utf8-fix';

var CORTESIA_HEADERS = [
  'timestamp', 'nome', 'whatsapp', 'email', 'cpf', 'modalidade', 'horario', 'dia', 'datasAula', 'limitacao',
];

var MATRICULA_HEADERS = [
  'timestamp', 'nome', 'nascimento', 'email', 'cpf', 'endereco', 'whatsapp',
  'instagram', 'limitacao', 'modalidade', 'unidade', 'horario', 'plano', 'aceite',
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.getDataAsString('UTF-8'));

    var isMatricula = data.tipo === 'matricula';
    var sheetName = isMatricula ? 'Matrícula' : 'Cortesia';
    var headers = isMatricula ? MATRICULA_HEADERS : CORTESIA_HEADERS;

    var sheet = getOrCreateSheet(sheetName, headers);
    var row = headers.map(function (key) {
      return data[key] !== undefined ? String(data[key]) : '';
    });
    sheet.appendRow(row);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function doGet(e) {
  if (!e.parameter.secret || e.parameter.secret !== SHARED_SECRET) {
    return jsonResponse({ success: false, error: 'unauthorized' });
  }

  var isMatricula = e.parameter.tipo === 'matricula';
  var sheetName = isMatricula ? 'Matrícula' : 'Cortesia';
  var headers = isMatricula ? MATRICULA_HEADERS : CORTESIA_HEADERS;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < 2) {
    return jsonResponse({ success: true, rows: [], version: CODE_VERSION });
  }

  var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
  var rows = values.map(function (row) {
    var obj = {};
    headers.forEach(function (key, i) {
      obj[key] = row[i];
    });
    return obj;
  });

  return jsonResponse({ success: true, rows: rows, version: CODE_VERSION });
}

function getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    // Trava as colunas (cabeçalho + 2000 linhas futuras) como texto puro, senão o Sheets
    // converte sozinho valores que parecem hora/data/número (ex: "07:00", "20/07/2026").
    sheet.getRange(1, 1, 2001, headers.length).setNumberFormat('@');
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
