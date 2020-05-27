//=========================================================================================================================
// Arquivo customizado: Contém funções especificas para esse formulário
//=========================================================================================================================


$(document).ready(function() {

  /* Cfe email da Suelen de 10/04/2019 - passa a pagar HE domingo, então foi retirada a mensagem
    $(".c2").on('change', function() {
      
      if($("#txtDataRealizacao").val() == '') { return;}

      aux = ($("#txtDataRealizacao").val()).split('/');
      aux = new Date(aux[2]+'-'+aux[1]+'-'+aux[0]);
      if(aux.getDay() == 6) {
        //fnAlert('Aviso','Data da Realização será no domingo.<br>Não é necessário informar a Data de Compensação<br>As horas serão pagas na folha de pagamento.',"Fechar");
        $("#alertaDomingo").show();
        $("#span_txtDataCompensacao").hide();
        $("#txtDataCompensacao").val('');
        $("#txtDataRealizacaoDom").val('S');
      }else {
        $("#alertaDomingo").hide();
        $("#span_txtDataCompensacao").show();
        $("#txtDataRealizacaoDom").val('N');
      }
      
    });
    */

    //Usar a classe .date para qq dia da semana a partir da data de hoje
    FLUIGC.calendar('.date', { pickDate : true, pickTime : false, minDate: new Date()});

    //Usar a classe .dateAll para somente de seg à sex a partir de qq data
    FLUIGC.calendar('.dateAll', { pickDate : true, pickTime : false, daysOfWeekDisabled: [0,6] });

    //Usar a classe .dateAll para somente de seg à sex a partir de qq data
    FLUIGC.calendar('.dateAll2', { pickDate : true, pickTime : false });

    //Usar a classe .date2 para somente de seg à sex a partir da data de hoje
    FLUIGC.calendar('.date2', { pickDate : true, pickTime : false, minDate: new Date(), daysOfWeekDisabled: [0,6] });

    //Usar a classe .date3 para somente de seg à sex até a data de hoje
    FLUIGC.calendar('.date3', { pickDate : true, pickTime : false, maxDate: new Date(), daysOfWeekDisabled: [0,6] });    

});


//=========================================================================================================================
// Rotina padrão: Tratamento do botão do menu principal
//=========================================================================================================================
function init() {
  //Coloca o titulo
  $("#id_nomeTitulo").text('Dados da Solicitação');
  //mostra painel
  //$('#op1_painel1').collapse('show');
}
//=========================================================================================================================
// Rotina padrão: Tratamento titulo conforme a opção escolhida no menu principal
//=========================================================================================================================
function fnNomeAba(obj) {
  //Coloca o nome das abas no menu
  //$("#id_nomeMenu").text(obj.text);
  aux = obj.text
  //Mostra ou oculta o botão para voltar
  if(obj.id == 'id_op_principal') { $("#span_Voltar").hide();}
  else                            { $("#span_Voltar").show();}

  $("#id_nomeTitulo").text(aux);
}

//=========================================================================================================================
// Rotina padrão: Para abrir o documento do projeto
//=========================================================================================================================
function fnMostraDoctoAjuda() {

  //nomeURL = serverURL() + "/portal/p/1/ecmnavigation?app_ecm_navigation_doc=" + $('#idDoctoAjuda').val();
  //window.open(nomeURL, "status , scrollbars=no ,width=600, height=350 , top=0 , left=0");

  //Busca a versão do documento
  idDocto = $('#idDoctoAjuda').val();
  var c1 = DatasetFactory.createConstraint('activeVersion'         , 'true', 'true', ConstraintType.MUST);
  var c2 = DatasetFactory.createConstraint('documentPK.documentId' , idDocto, idDocto, ConstraintType.MUST); 
  var colunas = new Array('activeVersion','documentPK.documentId','documentPK.version');
  var document = DatasetFactory.getDataset('document', null, new Array(c1,c2), null);     
  versaoDocto  = document.values[0]['documentPK.version'];
  openDocument(idDocto,versaoDocto);
 
}

function openDocument(idDocto,versaoDocto) {
    var parentOBJ;
    if (window.opener) {
        parentOBJ = window.opener.parent;
    } else {
        parentOBJ = parent;
    }
  console.log(parentOBJ);
    var cfg = {
        url : "/ecm_documentview/documentView.ftl",
        maximized : true,
        title : "Visualizador de Documentos",
        callBack : function() {
            parentOBJ.ECM.documentView.getDocument(idDocto,versaoDocto);
        },
        customButtons : []
    };
    parentOBJ.ECM.documentView.panel = parentOBJ.WCMC.panel(cfg);
}

//=========================================================================================================================
// Rotina padrão: Sobre
//=========================================================================================================================
function fnSobre() {

    nrSolicDemanda   = $('#nrSolicDemanda').val();
    WKDef     = getWKDef();

    descricaoProcesso      = ''; 
    versaoProcesso         = ''; 
    idFormProcesso         = ''; 
    versaoFormProcesso     = ''; 
    dtAtualizaFormProcesso = '';
    nomeDataset            = '';
    codProcessoDemanda     = '';
    idFormDemanda          = '';
    versaoFormDemanda      = '';
    dtAtualizaFormDemanda  = '';
    nomeDatasetDemanda     = '';
    nmAnalistaNegocio      = '';
    nmUsuarioHomolog       = '';
    nmAnalistaDesenv       = '';
    descAjustes            = '';

    var c1      = DatasetFactory.createConstraint("nrSolicDemanda", nrSolicDemanda, nrSolicDemanda, ConstraintType.MUST);
    var c2      = DatasetFactory.createConstraint("codProcesso", WKDef, WKDef, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('ds_busca_inf_processo', null, new Array(c1,c2),null);
    if (dataset.values.length > 0) {
      descricaoProcesso      = dataset.values[0]['descricaoProcesso']     ; 
      versaoProcesso         = dataset.values[0]['versaoProcesso']        ; 
      idFormProcesso         = dataset.values[0]['idFormProcesso']        ; 
      versaoFormProcesso     = dataset.values[0]['versaoFormProcesso']    ; 
      dtAtualizaFormProcesso = dataset.values[0]['dtAtualizaFormProcesso'];
      nomeDataset            = dataset.values[0]['nomeDataset']           ;
      codProcessoDemanda     = dataset.values[0]['codProcessoDemanda']    ;
      idFormDemanda          = dataset.values[0]['idFormDemanda']         ;
      versaoFormDemanda      = dataset.values[0]['versaoFormDemanda']     ;
      dtAtualizaFormDemanda  = dataset.values[0]['dtAtualizaFormDemanda'] ;
      nomeDatasetDemanda     = dataset.values[0]['nomeDatasetDemanda']    ;
      nmAnalistaNegocio      = dataset.values[0]['nmAnalistaNegocio']     ;
      nmUsuarioHomolog       = dataset.values[0]['nmUsuarioHomolog']      ;
      nmAnalistaDesenv       = dataset.values[0]['nmAnalistaDesenv']      ;
      descAjustes            = dataset.values[0]['descAjustes']           ;

    }

$('#descricaoProcesso').val(descricaoProcesso);
$('#versaoProcesso').val(versaoProcesso);
$('#versaoFormProcesso').val(versaoFormProcesso);
$('#dtAtualizaFormProcesso').val(dtAtualizaFormProcesso);
$('#nrSolicDemanda').val(nrSolicDemanda);
$('#nmAnalistaNegocio').val(nmAnalistaNegocio);
$('#nmUsuarioHomolog').val(nmUsuarioHomolog);
$('#nmAnalistaDesenv').val(nmAnalistaDesenv);


/*
  mensagem =  '<div class="form-group col-sm-12">';
  //mensagem += ' <h2>' + descricaoProcesso + '</h2>';
  mensagem += '   <div class="row">';
  mensagem += '      <label class="col-sm-4 control-label" align="right">Código do Processo:</label>';   
  mensagem += '      <div class="col-sm-6"><p>'     + descricaoProcesso   +  '</p></div>';
  mensagem += '   </div>';
  mensagem += '   <div class="row">';
  mensagem += '      <label class="col-sm-4 control-label" align="right">Versão do Processo:</label>';   
  mensagem += '      <div class="col-sm-3"><p>'     + versaoProcesso   +  '</p></div>';
  mensagem += '   </div>';
  mensagem += '   <div class="row">';
  mensagem += '      <label class="col-sm-4 control-label" align="right">Versão do Formulário:</label>';   
  mensagem += '      <div class="col-sm-3"><p>'     + versaoFormProcesso   +  '</p></div>';
  mensagem += '   </div>';
  mensagem += '   <div class="row">';
  mensagem += '      <label class="col-sm-4 control-label" align="right">Data Atualização:</label>';   
  mensagem += '      <div class="col-sm-3"><p>'     + dtAtualizaFormProcesso   +  '</p></div>';
  mensagem += '   </div>';
  mensagem += '   <div class="row">';
  mensagem += '      <label class="col-sm-4 control-label" align="right">Projeto:</label>';   
  mensagem += '      <div class="col-sm-3"><p>'     + nrSolicDemanda   +  '</p></div>';
  mensagem += '   </div>';
  mensagem += '   <div class="row">';
  mensagem += '      <label class="col-sm-4 control-label" align="right">Analista de Negócio:</label>';   
  mensagem += '      <div class="col-sm-4"><p>'     + nmAnalistaNegocio   +  '</p></div>';
  mensagem += '   </div>';
  mensagem += '   <div class="row">';
  mensagem += '      <label class="col-sm-4 control-label" align="right">Usuário Homologador:</label>';   
  mensagem += '      <div class="col-sm-4"><p>'     + nmUsuarioHomolog   +  '</p></div>';
  mensagem += '   </div>';
  mensagem += '   <div class="row">';
  mensagem += '      <label class="col-sm-4 control-label" align="right">Analista Desenv:</label>';   
  mensagem += '      <div class="col-sm-4"><p>'     + nmAnalistaDesenv   +  '</p></div>';
  mensagem += '   </div>';
  //mensagem += '   <div class="row">';
  //mensagem += '      <label class="col-sm-4 control-label" align="right">Ajustes:</label>';   
  //mensagem += '      <div class="col-sm-3"><p>'     + descAjustes   +  '</p></div>';
  //mensagem += '   </div>';
  mensagem += '</div>';
  fnAlert(descricaoProcesso,mensagem,"Fechar");
*/
}

//=========================================================================================================================
// Padrão: Essa funcao é padrão:
//=========================================================================================================================
function fnBuscaInfSolicitante(){
  
  loginFluig = $('#loginUserAberturaSolic').val();
  //Registra que o usuario solicitante e Em Nome de são os mesmos
  $('#h_escolhaAPITransfer').val('N');

  $('#msgPesquisandoSolic').show();

  setTimeout(function(){

    var c1      = DatasetFactory.createConstraint("cod_usuario_fluig", loginFluig, loginFluig, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("dsBusca_vppr010_vp_funcionario", null, new Array(c1),null);

    if (dataset.values.length > 0) {

      //Solicitante
      $('#codEmpUserAberturaSolic').val(dataset.values[0].cod_empresa);
      $('#nmEmpUserAberturaSolic').val(dataset.values[0].des_empresa);
      $('#txtEmpUserAberturaSolic').val(dataset.values[0].cod_empresa + "-" + dataset.values[0].des_empresa);

      $('#codEstUserAberturaSolic').val(dataset.values[0].cod_estabel);
      $('#nmEstUserAberturaSolic').val(dataset.values[0].des_estabel);
      $('#txtEstUserAberturaSolic').val(dataset.values[0].cod_estabel + "-" + dataset.values[0].des_estabel);

      $('#codCustoUserAberturaSolic').val(dataset.values[0].cod_ccusto);
      $('#nmCustoUserAberturaSolic').val(dataset.values[0].des_ccusto);
      $('#txtCustoUserAberturaSolic').val(dataset.values[0].cod_ccusto + "-" + dataset.values[0].des_ccusto);

      $('#ramalUserAberturaSolic').val(dataset.values[0].ramal);
      $('#foneUserAberturaSolic').val(dataset.values[0].telefone);

      $('#loginChefeUserAberturaSolic').val(dataset.values[0].cod_usuario_pai_fluig);
      $('#nmChefeUserAberturaSolic').val(dataset.values[0].nom_usuario_pai_fluig);

      $('#situacaoUserAberturaSolic').val(dataset.values[0].situacao);
      $('#tipoUserAberturaSolic').val(dataset.values[0].tipo);

      //Em nome de
      $('#codEmpUserEmNome').val(dataset.values[0].cod_empresa);
      $('#nmEmpUserEmNome').val(dataset.values[0].des_empresa);
      $('#txtEmpUserEmNome').val(dataset.values[0].cod_empresa + "-" + dataset.values[0].des_empresa);

      $('#codEstUserEmNome').val(dataset.values[0].cod_estabel);
      $('#nmEstUserEmNome').val(dataset.values[0].des_estabel);
      $('#txtEstUserEmNome').val(dataset.values[0].cod_estabel + "-" + dataset.values[0].des_estabel);

      $('#codCustoUserEmNome').val(dataset.values[0].cod_ccusto);
      $('#nmCustoUserEmNome').val(dataset.values[0].des_ccusto);
      $('#txtCustoUserEmNome').val(dataset.values[0].cod_ccusto + "-" + dataset.values[0].des_ccusto);

      $('#ramalUserEmNome').val(dataset.values[0].ramal);
      $('#foneUserEmNome').val(dataset.values[0].telefone);

      $('#loginChefeUserEmNome').val(dataset.values[0].cod_usuario_pai_fluig);
      $('#nmChefeUserEmNome').val(dataset.values[0].nom_usuario_pai_fluig);

      $('#situacaoUserEmNome').val(dataset.values[0].situacao);
      $('#tipoUserEmNome').val(dataset.values[0].tipo);

      //Verifica se encontrou o chefe imediato do usuário
      if($('#loginChefeUserAberturaSolic').val() == '' || $('#loginChefeUserAberturaSolic').val() == null) {
        mensagem  = 'Não é possível identificar seu chefe imediato.' + '<br>';
        mensagem += 'Com isso não será possível iniciar essa solicitação.' + '<br>';
        fnAlert('Atenção!',mensagem,'OK Entendi!');
      }

    }else {
      mensagem  = 'O seu login não está registrado no ERP<br><br>';
      mensagem += 'Com isso não é possível identificar seu chefe imediato para iniciar essa solicitação.<br>';
      mensagem += 'Mas, se você alterar o campo "Em Nome de" abrirá a solicitação em nome de outra pessoa.<br>';
      fnAlert('Atenção!!',mensagem,'OK Entendi!');
    }

    $('#msgPesquisandoSolic').hide();

  }, 500);

}

//=========================================================================================================================
// Padrão: Essa funcao é padrão:
//=========================================================================================================================
function fnBuscaInfEmNome(){
  $('#msgPesquisandoSolic').show();
  loginFluig = $('#loginEmNome').val();

  setTimeout(function(){

    var c1      = DatasetFactory.createConstraint("cod_usuario_fluig", loginFluig, loginFluig, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("dsBusca_vppr010_vp_funcionario", null, new Array(c1),null);
    if (dataset.values.length > 0) {
      $('#codEmpUserEmNome').val(dataset.values[0].cod_empresa);
      $('#nmEmpUserEmNome').val(dataset.values[0].des_empresa);
      $('#txtEmpUserEmNome').val(dataset.values[0].cod_empresa + "-" + dataset.values[0].des_empresa);

      $('#codEstUserEmNome').val(dataset.values[0].cod_estabel);
      $('#nmEstUserEmNome').val(dataset.values[0].des_estabel);
      $('#txtEstUserEmNome').val(dataset.values[0].cod_estabel + "-" + dataset.values[0].des_estabel);

      $('#codCustoUserEmNome').val(dataset.values[0].cod_ccusto);
      $('#nmCustoUserEmNome').val(dataset.values[0].des_ccusto);
      $('#txtCustoUserEmNome').val(dataset.values[0].cod_ccusto + "-" + dataset.values[0].des_ccusto);

      $('#ramalUserEmNome').val(dataset.values[0].ramal);
      $('#foneUserEmNome').val(dataset.values[0].telefone);

      $('#loginChefeUserEmNome').val(dataset.values[0].cod_usuario_pai_fluig);
      $('#nmChefeUserEmNome').val(dataset.values[0].nom_usuario_pai_fluig);

      $('#situacaoUserEmNome').val(dataset.values[0].situacao);
      $('#tipoUserEmNome').val(dataset.values[0].tipo);

      //Verifica se encontrou o chefe imediato do usuário
      if($('#loginChefeUserEmNome').val() == '' || $('#loginChefeUserEmNome').val() == null) {
        mensagem  = 'Não é possível identificar seu chefe imediato.' + '<br>';
        mensagem += 'Com isso não será possível iniciar essa solicitação.' + '<br>';
        fnAlert('Atenção!',mensagem,'OK Entendi!');
      }else {
        //Verifica se está abrindo a solicitação em nome de outra pessoa
        if ($('#loginUserAberturaSolic').val() != $('#loginEmNome').val()) {

          //mensagem = 'Essa solicitação será enviada para ' + $('#txtEmNome').val() + ' para aprovação.' + '<br>';
          mensagem = $('#txtEmNome').val() + ' assumirá todas as funções desse processo como Solicitante.' + '<br>';
          fnAlert('Atenção!',mensagem,'OK Entendi!');
          $('#h_escolhaAPITransfer').val('S');
        }else { 
          $('#h_escolhaAPITransfer').val('N');
        }  
      }

    }else {
      mensagem  = 'O usuário escolhido não está registrado no ERP<br><br>';
      mensagem += 'Com isso não é possível identificar seu chefe imediato.<br>';
      mensagem += 'Portanto, não será possível abrir essa solicitação';
      fnAlert('Atenção',mensagem,'OK Entendi!');
    }

    $('#msgPesquisandoSolic').hide();
    
  }, 500);

}

//=========================================================================================================================
// Padrão: Essa funcao é padrão:
//=========================================================================================================================
function fnMostraHistGeral() {
  
  histGeral = $('#histGeral').val();
  if(histGeral == '') {
    document.getElementById("span_histGeral").innerHTML = "<br>Não existe registro de histórico até o momento.";
    return;  
  }

  hist = histGeral.split('§2');
  qtde = hist.length - 1;
  b = '';
  cHTML = '';
  for (i=0;i<qtde;i++) {
    dt = hist[i].split('§')[0];
    if(dt != b) { 
      cHTML += '<span class="col-xs-12 label label-default">' + dt + '</span><br>';
    }
    cHTML += hist[i].split('§')[1] + hist[i].split('§')[2] + '<br>';
    b = hist[i].split('§')[0];  
  } 
  //console.log(cHTML);
  document.getElementById("span_histGeral").innerHTML = cHTML;
}



//=========================================================================================================================
// Essa função ainda está em testes
//=========================================================================================================================
function showCamera(nomeArquivo) {
    //Pega o nome do arquivo e adiciona ano, mes e dia no nome
    aux = fnBuscarDataHora('data'); //retorna data dd/mm/aaaa
    aux = aux.split('/');
    JSInterface.showCamera(aux[2] + '_' + aux[1] + '_' + aux[0] + '_' + nomeArquivo);

parent.$('a[href="#details"]').click(); 
parent.$('a[href="#details"]').click(); 

console.log(parent.ECM.workflowView.formId > 0); //$("body").click();return
console.log(parent.ECM.workflowView.adHocTask); //$('a[href="#adhoc"]').click();return
console.log(parent.ECM.workflowView.processDefinition.processInstanceId > 0 ); //$('a[href="#complements"]').click();return
  
//$('a[href="#attachments"]').click();return
//$('a[href="#complements"]').click();return
//$('a[href="#details"]').click();return


}
  
//=========================================================================================================================
// Essa função contém rotinas padrões e customizadas
//=========================================================================================================================
function setSelectedZoomItem(selectedItem) {
  //Utiliza-se o split para poder contemplar campos de zoom de pai x filho também
  var campo  = selectedItem.inputName.split('___')[0];
  var indice = selectedItem.inputName.split('___')[1];

  //========================================
  // Campos que são padrões nesse formulário
  //========================================
  if(campo == "txtEmNome") {
    document.getElementById("loginEmNome").value = selectedItem["colleagueId"];
    //Buscar os dados do usuário no Datasul para completar os campos
    fnBuscaInfEmNome();
  }
  if(campo == "idDiretoria") {
    document.getElementById("idDiretoriaValue").value = selectedItem["num_processo"];
    reloadZoomFilterValues("idArea", "idDiretoriaValue," + selectedItem["num_processo"]);
    $('#div_idArea').show();    
  }
  if(campo == "idArea") {
    document.getElementById("idAreaValue").value = selectedItem["num_processo"];
    reloadZoomFilterValues("idMacroProcesso", "idAreaValue," + selectedItem["num_processo"]);
    $('#div_idMacroProcesso').show();   
  }
  if(campo == "idMacroProcesso") {
    document.getElementById("idMacroProcessoValue").value = selectedItem["num_processo"];
    reloadZoomFilterValues("idProcesso", "idMacroProcessoValue," + selectedItem["num_processo"]);
    $('#div_idProcesso').show();    
  }
  if(campo == "idProcesso") {
    document.getElementById("idProcessoValue").value = selectedItem["num_processo"];
    reloadZoomFilterValues("idSubProcesso", "idProcessoValue," + selectedItem["num_processo"]);
    $('#div_idSubProcesso').show();   
  }
  if(campo == "idSubProcesso") {
    document.getElementById("idSubProcessoValue").value = selectedItem["num_processo"];
    document.getElementById("loginAnalistaResponsavel").value = selectedItem["cod_analista_ti"];
    carregaHomologadoresTotvs(selectedItem["num_processo"]);
  }

  //========================================
  // Campos específicos para esse formulário
  //========================================

  //Atividade 5-Avaliar Solicitação
  if(campo == "cod_des_motivo") {
    $('#cod_motivo').val(selectedItem["cod_motivo"]);   
    $('#des_motivo').val(selectedItem["des_motivo"]);   
  }

}

//=========================================================================================================================
// Essa função contém rotinas padrões e customizadas
//=========================================================================================================================
function removedZoomItem(removedItem) {
  //Utiliza-se o split para poder contemplar campos de zoom de pai x filho também
  var campo  = removedItem.inputName.split('___')[0];
  var indice = removedItem.inputName.split('___')[1];

  //========================================
  // Campos que são padrões nesse formulário
  //========================================
  if (campo === 'txtEmNome') {
    $("#loginEmNome").val('');
    $('#txtEmpUserEmNome').val('');
    $('#codEmpUserEmNome').val('');
    $('#nmEmpUserEmNome').val('');
    $('#codEstUserEmNome').val('');
    $('#txtEstUserEmNome').val('');
    $('#nmEstUserEmNome').val('');
    $('#txtCustoUserEmNome').val('');
    $('#codCustoUserEmNome').val('');
    $('#nmCustoUserEmNome').val('');
    $('#ramalUserEmNome').val('');
    $('#foneUserEmNome').val('');
    $('#loginChefeUserEmNome').val('');
    $('#nmChefeUserEmNome').val('');
  }
  if (campo == 'idDiretoria') {
    $("#idDiretoriaValue").val(''); 
    //Limpar os demais campos relacionados
    $("#idAreaValue").val('');      window['idArea'].clear();      $('#div_idArea').hide();
    $("#idMacroProcessoValue").val(''); window['idMacroProcesso'].clear(); $('#div_idMacroProcesso').hide();
    $("#idProcessoValue").val('');    window['idProcesso'].clear();      $('#div_idProcesso').hide();
    $("#idSubProcessoValue").val('');   window['idSubProcesso'].clear();   $('#div_idSubProcesso').hide();
  }
  if (campo == 'idArea') {
    $("#idAreaValue").val(''); 
    //Limpar os demais campos relacionados
    $("#idMacroProcessoValue").val(''); window['idMacroProcesso'].clear(); $('#div_idMacroProcesso').hide();
    $("#idProcessoValue").val('');    window['idProcesso'].clear();      $('#div_idProcesso').hide();
    $("#idSubProcessoValue").val('');   window['idSubProcesso'].clear();   $('#div_idSubProcesso').hide();
  }
  if (campo == 'idMacroProcesso') {
    $("#idMacroProcessoValue").val(''); 
    //Limpar os demais campos relacionados                   
    $("#idProcessoValue").val('');    window['idProcesso'].clear();      $('#div_idProcesso').hide();
    $("#idSubProcessoValue").val('');   window['idSubProcesso'].clear();   $('#div_idSubProcesso').hide();
  }
  if (campo == 'idProcesso') {
    $("#idProcessoValue").val(''); 
    //Limpar os demais campos relacionados
    $("#idSubProcessoValue").val('');   window['idSubProcesso'].clear();   $('#div_idSubProcesso').hide();
  }
  if (campo == 'idSubProcesso') {
    $("#idSubProcessoValue").val(''); 
  }

  //========================================
  // Campos específicos para esse formulário
  //========================================

  //Atividade 5-Avaliar Solicitação
  if(campo == "cod_des_motivo") {
    $('#cod_motivo').val('');   
    $('#des_motivo').val('');   
  }

}

//=========================================================================================================================
// Inicio das funções específicas para esse formulário
//=========================================================================================================================

function fnIncluir(tabela){
  console.log('===================');
  console.log('fnIncluir ' + tabela);

  if(tabela == 'tabMotivoLiberar') {
    indice = wdkAddChild(tabela);
  }

}

function fnRemoverFilho(tabela,obj){
  indice = obj.id.split('___')[1];

  if(tabela == 'tabDocto') {
    $('#idDocto___'      + indice).val('');   
    $('#versaoDocto___'  + indice).val('');   
    $('#versaoAtiva___'  + indice).val('');   
    $('#tipoDocto___'    + indice).val('');   
    $('#idDoctoPai___'   + indice).val('');   
    $('#usuarioDocto___' + indice).val('');   
  }

  fnWdkRemoveChild(obj);

}


function fnVerificaFilhos(tabela){
  console.log('fnVerificaFilhos');
  if(tabela == 'tabDocto') {  
    //Verifica se foi selecionado um documento no registro filho.
    var tabelaOBJ = document.getElementById(tabela);
    var linhas = tabelaOBJ.getElementsByTagName('tr');
    for ( var i = 0; i < linhas.length; i++) { 
      var inputs    = linhas[i].getElementsByTagName('input');
      var qtColunas = inputs.length; 
      for ( var j = 0; j < qtColunas; j++)    { 
        if (inputs[j].name.indexOf('idDocto___') >= 0){ 
          console.log(inputs[j].value);
          if (inputs[j].value == '') { return true; }
        }
      }
    }
    return false;
  }
}




function fnDisplayCampos() {
	//Funcao acionada pelo displayFields para mostrar ou ocultar os campos e divs conforme a informação armazenada

  //================================================================
	// Atividade 5-Avaliar Solicitação
  //================================================================
	valor = $("#h_rsDecisaoAvaliacao").val();
  $("#div_cod_des_motivo").hide();
	if(valor == 'Aprovada') {
	    $("#div_cod_des_motivo").hide();
  }
	if(valor == 'Reprovada') {
	      $("#div_cod_des_motivo").show();
	}

  //================================================================
  // Atividade 9-Executar
  //================================================================
  valor = $("#h_rsExecutado").val();
    $("#div_executado_sim").hide();
  if(valor == 'Sim') {
    $("#div_executado_sim").show();
  }
  if(valor == 'Nao') {
    $("#div_executado_sim").hide();
  }

}//fecha function

//=====================================================================
// Acionado nos campos que tiverem onchange='fnOnChange(this);' no html
//=====================================================================
function fnOnChange(obj) {
  //Pegar o nome e id do campo
    nomeCampo = obj.name;
    idCampo   = obj.id;
    valor     = obj.value;

    console.log(nomeCampo + " " + valor);
    console.log('=====================');

    fnOnChange2(nomeCampo,valor);
}

//============================================================
// Acionado pela função fnOnChange e também pelo displayFields
//============================================================
function fnOnChange2(nomeCampo,valor) {
  //Essa função foi criada para poder ser usada também pelo displayFields

  //================================================================
  // Atividade 5-Liberar Pedido
  //================================================================
  if(nomeCampo == 'rsDecisaoAvaliacao') {
    $("#h_rsDecisaoAvaliacao").val(valor);

    if(valor == 'Aprovada') {
      $("#div_cod_des_motivo").hide();
    }
    if(valor == 'Reprovada') {
      $("#div_cod_des_motivo").show();
    }
  } //campo 

  //================================================================
  // Atividade 9-Executar
  //================================================================
  if(nomeCampo == 'rsExecutado') {
    $("#h_rsExecutado").val(valor);
    if(valor == 'Sim') {
      $("#div_executado_sim").show();
    }
    if(valor == 'Nao') {
      $("#div_executado_sim").hide();
    }
  } //campo 
  
}//fecha function


//=========================================================================================================================
// Rotina padrão: Mensagem de ajuda de cada campo do formulário quando for necessário
//=========================================================================================================================
function fnAjudaCampo(obj) {
  campo = obj.id;
  titulo = 'Informações do Campo';
  mensagem = '';

  if(campo == 'lbl_txtEmNome') {
    mensagem += '<b>Em nome de</b> (obrigatório)<br><br>';
    mensagem += 'É o nome da pessoa no qual você está abrindo a solicitação.<br>';
    mensagem += 'Esse campo é preenchido automaticamente com o nome do usuário atual.<br><br>';
    mensagem += 'Para apagar essa informação, clique no "x" que está ao lado do nome.<br>';
    mensagem += 'Para selecionar um outro nome você deve, primeiramente, apagar a informação atual.<br>';
    mensagem += 'Digitar o nome desejado ou clicar no botão de pesquisa.<br>';
  }else if(campo == 'lbl_nmUserAberturaSolic') {
    mensagem += '<b>Solicitante</b><br><br>';
    mensagem += 'É o nome da pessoa no qual você está abrindo a solicitação.<br>';
    mensagem += 'Esse campo é preenchido automaticamente com o nome do usuário atual.<br><br>';
    mensagem += 'Não é possível mudar essa informação. O campo não está habilitado para a edição.<br>';

  //Atividade 4-
  }else if(campo == 'lbl_obsComplementar') {
    mensagem += '<b>Observação Complementar</b> (obrigatório)<br><br>';
    mensagem += 'Descrever outras informações para o pedido.<br>';

  //Atividade 5-
  }else if(campo == 'lbl_rsAprovDiretoria') {
    mensagem += '<b>Decisão</b> (obrigatório)<br><br>';
    mensagem += 'Informar a decisão a ser tomada.<br>';
  }else if(campo == 'lbl_cod_des_motivoDir') {
    mensagem += '<b>Motivo</b> (obrigatório)<br><br>';
    mensagem += 'Identifica o motivo da reprovação.<br><br>';
    mensagem += 'Esse campo estará habilitado somente se a decisão for Reprovar.<br>';
    mensagem += 'A lista dos motivos obedece uma regra conforme o processo e etapa cadastrado no ERP.<br>';  
  }else if(campo == 'lbl_edObsDir') {
    mensagem += '<b>Observações</b><br><br>';
    mensagem += 'Deixar informações adicionais.<br><br>';

  //Atividade 9-
  }else if(campo == 'lbl_rsAprovDiretoria') {
    mensagem += '<b>Decisão</b> (obrigatório)<br><br>';
    mensagem += 'Informar a decisão a ser tomada.<br>';
  }else if(campo == 'lbl_cod_des_motivoDir') {
    mensagem += '<b>Motivo</b> (obrigatório)<br><br>';
    mensagem += 'Identifica o motivo da reprovação.<br><br>';
    mensagem += 'Esse campo estará habilitado somente se a decisão for Reprovar.<br>';
    mensagem += 'A lista dos motivos obedece uma regra conforme o processo e etapa cadastrado no ERP.<br>';  
  }else if(campo == 'lbl_edObsDir') {
    mensagem += '<b>Observações</b><br><br>';
    mensagem += 'Deixar informações adicionais.<br><br>';
  //Atividade 17-Verificar Integração
  }else {
    mensagem = 'Esse campo não possui informações.';
  }

  fnAlert(titulo,mensagem,'OK. Entendi!');
  return;
}

function fnVerificaDataRealizacao() {


return;

  aux = ($("#txtDataRealizacao").val()).split('/');
  aux = new Date(aux[2]+'-'+aux[1]+'-'+aux[0]);
  if(aux.getDay() == 6) {
    fnAlert('Aviso','Data da Realização será no domingo.<br>Não é necessário informar a Data de Compensação<br>As horas serão pagas na folha de pagamento.',"Fechar");
    $("#txtDataCompensacao").val('');
    $("#txtDataRealizacaoDom").val('S');
  }else {
    $("#txtDataRealizacaoDom").val('N');
  }

}

function fnDiferencaHorasPrev() {
    var hrIni = $("#horaPrevIni").val();
    var hrFim = $("#horaPrevFim").val();

    $("#horaPrevTotal").val('');

    if(hrIni == '' || hrFim == '') { return;}
    if(hrIni > hrFim) { 
      fnAlert("Atenção!","Hora Inicial não pode ser maior do que a Hora Final.","OK");
      $("#horaPrevFim").val('');      
      return;
    }

    s = hrIni.split(':');
    e = hrFim.split(':');

    min = e[1]-s[1];
    hour_carry = 0;
    if(min < 0){
        min += 60;
        hour_carry += 1;
    }
    hour = e[0]-s[0]-hour_carry;
    
    if(hour < 9) { hour = '0' + hour; }
    if(min  < 9) { min  = '0' + min; }

    diff = hour + ":" + min;

    $("#horaPrevTotal").val(diff);

}

function fnDiferencaHorasReal() {
    var hrIni = $("#horaRealIni").val();
    var hrFim = $("#horaRealFim").val();

    $("#horaRealTotal").val('');

    if(hrIni == '' || hrFim == '') { return;}
    if(hrIni > hrFim) { 
      fnAlert("Atenção!","Hora Inicial não pode ser maior do que a Hora Final.","OK");
      $("#horaRealFim").val('');      
      return;
    }

    s = hrIni.split(':');
    e = hrFim.split(':');

    min = e[1]-s[1];
    hour_carry = 0;
    if(min < 0){
        min += 60;
        hour_carry += 1;
    }
    hour = e[0]-s[0]-hour_carry;
    
    if(hour < 9) { hour = '0' + hour; }
    if(min  < 9) { min  = '0' + min; }

    diff = hour + ":" + min;

    $("#horaRealTotal").val(diff);

}
//=========================================================================================================================
// 
//=========================================================================================================================

