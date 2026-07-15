/**
 * Academia Belfort — recebe os POSTs do backend NestJS (rotas /cortesia e /matricula)
 * e grava cada um numa aba diferente desta planilha.
 *
 * Como implantar:
 * 1. Crie uma planilha nova no Google Sheets.
 * 2. Extensões → Apps Script.
 * 3. Apague o conteúdo padrão e cole este arquivo inteiro.
 * 4. Salve, depois Implantar → Nova implantação → tipo "App da Web".
 *    Executar como: Eu. Quem pode acessar: Qualquer pessoa.
 * 5. Autorize as permissões pedidas (é a sua própria planilha).
 * 6. Copie a URL do App da Web e cole em backend/.env, nas duas variáveis:
 *    APPS_SCRIPT_URL_CORTESIA e APPS_SCRIPT_URL_MATRICULA (é a mesma URL para as duas).
 */

var CORTESIA_HEADERS = [
  'timestamp', 'nome', 'whatsapp', 'cpf', 'modalidade', 'horario', 'dia', 'limitacao',
];

var MATRICULA_HEADERS = [
  'timestamp', 'nome', 'nascimento', 'email', 'cpf', 'endereco', 'whatsapp',
  'instagram', 'limitacao', 'modalidade', 'unidade', 'horario', 'plano', 'aceite',
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var isMatricula = data.tipo === 'matricula';
    var sheetName = isMatricula ? 'Matrícula' : 'Cortesia';
    var headers = isMatricula ? MATRICULA_HEADERS : CORTESIA_HEADERS;

    var sheet = getOrCreateSheet(sheetName, headers);
    var row = headers.map(function (key) {
      return data[key] !== undefined ? data[key] : '';
    });
    sheet.appendRow(row);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
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
