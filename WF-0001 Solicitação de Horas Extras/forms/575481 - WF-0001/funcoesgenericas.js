//==============================================================================================
// Nome......: funcoes.js
// Objetivos.: contem funcoes genericas
// Data......: 18/01/2016
//
// 001 - 12/12/2018 - inclusão de funcoes
//
// lista de fucoes disponiveis:
//  fnBuscarDataHora(tipo)
//  fnMostraOcultaDiv
//  fnMostraDiv
//  fnOcultaDiv
//  formatarHora
//  formataCEI
//  formataCnpj
//  formataCPF
//  formataRG
//  formatarValor - onkeypress="formatarValor(this);"
//  formataPlaca <input type="text" class="form-control" name="placa" id="placa" maxlength="8" onkeypress="formataPlaca(this);">
//  fnToast
//  fnAlert
//  fnConfirma
//  fn_numdias
//  fnExportarExcel
//  fnPosicionaAba
//  add_combo
//  sortSelect
//  zoomDataSet - para o zoom antigo que abre nova janela - não funciona para mobile
//  fnConverteRetornoJson - especifica para chamadas ao ExecBO dentro do html  
//  fnDiasNaAtividade - Acionada pelo displayFields para colocar mostrar a descrição dos dias na atividade
//  fnDiasAberturaProjeto - Acionada no displayFields especifica para ativiade inicial e mostra dias total
//  fnValidarCampo - validação de campo deixando em vermelho (essa técnica deve ser revista, não é padrão na Vipal)
//  alteraCorPanel - Acionada no displayFields aplica cor no painel default da atividade
//  trocaBackground - Acionada no displayFields troca a cor nas mensagens que estão no painel destacado
//  serverURL - 
//  isMobile - 
//  formataNumeros
//  formataLetras
//  formataEspeciais
//  
//=========================================================================================================================================

function fnBuscarDataHora(tipo){
  //=======================================================================================
  // Chamada: buscaDataHora("data") ou buscaDataHora("hora");
  // Retorna data no formato dd/mm/aaaa
  // Retorna hora no formato HH:MM
  //=======================================================================================
  var fullDate = new Date();

  //formata a hora
  var hora     = fullDate.getHours();
  var minuto   = fullDate.getMinutes();
  if (hora <= 9) { hora = "0" + hora; }
  if (minuto <= 9){ minuto = "0" + minuto; }
  var hrRetorno = hora + ":" + minuto;

  //formata a data
  var dia = fullDate.getDate().toString();
  if(dia.length == 1){ dia = "0" + dia; }
  var mes = (fullDate.getMonth()+1).toString();
  if(mes.length == 1){ mes = "0" + mes; }
  var dtRetorno = dia + "/" + mes + "/" + fullDate.getFullYear();
  
  if (tipo == "data") { return dtRetorno; }
  if (tipo == "hora") { return hrRetorno; }
}
//==============================================================
// fnMostraOcultaDiv
//==============================================================
function fnMostraOcultaDiv(valor){
  //Funcao para mostrar ou ocultar um div conforme o seu estado atual
  //Recebe o nome do div. Se esta oculton ent&atilde;o mostra e vice-versa.
  var buscaDiv = document.getElementById(valor);

  if (buscaDiv.style.display == 'none') {
     buscaDiv.style.display = 'block'; 
  } else {
     buscaDiv.style.display = 'none';
  }
}
//==============================================================
// fnMostraDiv
//==============================================================
function fnMostraDiv(valor){
    var buscaDiv = document.getElementById(valor);
    buscaDiv.style.display = 'block'; 
}
//==============================================================
// fnOcultaDiv
//==============================================================
function fnOcultaDiv(valor){
    var buscaDiv = document.getElementById(valor);
    buscaDiv.style.display = 'none';
}
//==============================================================
// formatacao de Valor: usa "ponto" e "vigula"
//onkeypress="formatarValor(this);"
//==============================================================
    function formatarValor(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataValor()", 1);
    }  

    function executarFormataValor(){
      l_valor = g_obj_data.value;
        l_valor = l_valor.replace(/\D/g,"") ;       
        l_valor = l_valor.replace(/(\d)(\d{8})$/,"$1.$2");  
        l_valor = l_valor.replace(/(\d)(\d{5})$/,"$1.$2");  
     
        l_valor = l_valor.replace(/(\d)(\d{2})$/,"$1,$2");  
        
        g_obj_data.value = l_valor;   
    }
//==============================================================
// formatacao da HORA
//==============================================================
function formatarHora(p_elemento) {   
  g_obj_data = p_elemento;
  setTimeout("executarFormataHora()", 1);
}

function executarFormataHora() {    
    l_valor = g_obj_data.value;                               
    l_valor = l_valor.replace(/\D/g,"");                     
      l_valor = l_valor.replace(/(\d{2})(\d)/,"$1:$2");     
    
      g_obj_data.value = l_valor;                                  
}  
//==============================================================
// formatacao do CEI -  27.487.48771/81
//==============================================================
    function formataCEI(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataCEI()", 1);
    }
    function executarFormataCEI(){
    l_valor = g_obj_data.value;
        l_valor = l_valor.replace(/\D/g,"")                           
        l_valor = l_valor.replace(/^(\d{2})(\d)/,"$1.$2")             
        l_valor = l_valor.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") 
        l_valor = l_valor.replace(/\.(\d{5})(\d)/,".$1/$2")           
        
       
       g_obj_data.value = l_valor;  
    }
//==============================================================
// formatacao do CNPJ
//==============================================================
    function formataCnpj(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataCnpj()", 1);
    }

    function executarFormataCnpj(){

      l_valor = g_obj_data.value;
        
        l_valor = l_valor.replace(/\D/g,"")                           
        l_valor = l_valor.replace(/^(\d{2})(\d)/,"$1.$2")             
        l_valor = l_valor.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") 
        l_valor = l_valor.replace(/\.(\d{3})(\d)/,".$1/$2")           
        l_valor = l_valor.replace(/(\d{4})(\d)/,"$1-$2")              
       
       g_obj_data.value = l_valor;  
    }
//==============================================================
// formatacao do CPF
//==============================================================
    function formataCpf(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataCpf()", 1);
    }

    function executarFormataCpf(){
      l_valor = g_obj_data.value;
        l_valor =l_valor.replace(/\D/g,"")                    
        l_valor =l_valor.replace(/(\d{3})(\d)/,"$1.$2")       
        l_valor =l_valor.replace(/(\d{3})(\d)/,"$1.$2")       
                                                    
        l_valor=l_valor.replace(/(\d{3})(\d{1,2})$/,"$1-$2")  

        g_obj_data.value = l_valor;
    }
//==============================================================
// formatacao do RG
//==============================================================
    function formataRg(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataRg()", 1);
    }

    function executarFormataRg(){
          l_valor = g_obj_data.value;
            l_valor = l_valor.replace(/\D/g,"");                  
            l_valor = l_valor.replace(/(\d)(\d{7})$/,"$1.$2");    
            l_valor = l_valor.replace(/(\d)(\d{4})$/,"$1.$2");    
            l_valor = l_valor.replace(/(\d)(\d)$/,"$1-$2");       

            g_obj_data.value = l_valor;       
    }
//==============================================================
// formatacao do Telefone
//==============================================================
    function formataTel(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataTel()", 1);
    }


    function executarFormataTel(){
        
        l_valor = g_obj_data.value;
        
        l_valor = l_valor.replace(/\D/g,"");             
        l_valor = l_valor.replace(/^(\d{2})(\d)/g,"($1) $2"); 
        l_valor = l_valor.replace(/(\d)(\d{4})$/,"$1-$2");    
        
        g_obj_data.value = l_valor; 
    }
//==============================================================
// formatacao do CEP
//==============================================================
    function formataCep(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataCep()", 1);
    }

    function executarFormataCep(){

      l_valor = g_obj_data.value

        l_valor = l_valor.replace(/\D/g,"")                    
        l_valor = l_valor.replace(/^(\d{5})(\d)/,"$1-$2")         

         g_obj_data.value = l_valor;  
       
    }
//==============================================================
// formatacao da Placa
//==============================================================
    function formataPlaca(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataPlaca()", 1);
    }

    function executarFormataPlaca(){

      l_valor = g_obj_data.value

        l_valor = l_valor.replace(/\D/g,"")                    
        l_valor = l_valor.replace(/^(\d{3})(\d)/,"$1-$2")         

         g_obj_data.value = l_valor;  
       
    }
//==============================================================
// formatacao do Especiais
//==============================================================
    function formataEspeciais(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataEspeciais()", 1);
    }

    function executarFormataEspeciais(v){
      l_valor = g_obj_data.value;

      l_valor = l_valor.replace(/[^a-z0-9]/g,"");   
      
        g_obj_data.value = l_valor;
    }
//==============================================================
// formatacao Somente numeros
//==============================================================
    function formataNumeros(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormatanumeros()", 1);
    }

    function executarFormatanumeros(v){
      l_valor = g_obj_data.value;

      l_valor = l_valor.replace(/[^0-9]/g,"");   

        g_obj_data.value = l_valor;
    }
//==============================================================
// formatacao Somente letras
//==============================================================
    function formataLetras(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataletras()", 1);
    }

    function executarFormataletras(v){
      l_valor = g_obj_data.value;

      l_valor = l_valor.replace(/[^a-z]/g,"");  

        g_obj_data.value = l_valor;
    }

function fnToast(titulo,mensagem,tipo){
     //type = default, info, warning, success, danger
     FLUIGC.toast({
        title: titulo,
        message: mensagem,
        type: tipo
    })
} //fecha funcao

function fnAlert(titulo,mensagem,rotulo){
  //rotulo será o label do botão    
  if(isMobile()) { tamanho = 'full'; } else { tamanho = 'medium'; }
  
  FLUIGC.message.alert({
    title: titulo,
    message: mensagem,
    label: rotulo,
    size: tamanho
  }, function(el, ev) {
    //this.someFunc();
  });    
} //fecha funcao

function fnConfirma(titulo,mensagem,rotuloSim,rotuloNao){
    FLUIGC.message.confirm({
        title: titulo,
        message: mensagem,
        labelYes: rotuloSim,
        labelNo: rotuloNao
    }, function(result, el, ev) {
        return result;
    });
}

//==============================================================
//Função para retornar o ultimo dia do mes informado
//==============================================================
function fn_numdias(p_mes,p_ano) {
    //mês ímpar menor que 8 ou mês par maior que 7 tem 31 dias    
  if ((p_mes<8 && p_mes%2==1) || (p_mes>7 && p_mes%2==0)) { return 31; }
  
  //se não for fevereiro, os outros meses que não os de cima têm 30 dias    
  if (p_mes!=2) { return 30; }
  
  //Se (ano módulo 4 é 0  e  (ano módulo 400 é 0 ou ano módulo 100 diferente 0))  entao é ano bissexto
  if (p_ano%4==0 && (p_ano%400 == 0 || p_ano%100 != 0)) { return 29; }
    
  return 28;
}

function fnExportarExcel(idTabela) {

    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>"; //cores dos rotulos
    var textRange; var j=0;
    tab = document.getElementById(idTabela); // id of table

    for(j = 0 ; j < tab.rows.length ; j++) {     
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }
    tab_text=tab_text+"</table>";

    tab_text= tab_text.replace(/<a[^>]*>|<\/a>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {     // If Internet Explorer
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa=txtArea1.document.execCommand("SaveAs",true,"nomearquivo.xls");
    }  
    else {                //other browser not tested on IE 11
      sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));   //corrige o caracter & que é passado para &amp;     
      //sa = window.open('data:application/vnd.ms-excel,' + escape(tab_text));  
      //sa = window.open('data:application/vnd.ms-excel;base64,' + escape(tab_text));  
    }

    return (sa);
}


// Função para reposicionamento da aba do formulario
// Parametros: nome da aba que será posicionada
function fnPosicionaAba(nomeAba) {
  var comando = "$('#abas a[href=" + '"#nomeAba"]' + "').tab('show');";
  comando = comando.replace("nomeAba",nomeAba);
  eval(comando);
} // fecha fnPosicionaAba

/* Funcao padrão para preencher um combo */
function add_combo(text, value, obj, pos){ 
    newOp=document.createElement('OPTION');
    newOp.value=value;  
    newOp.text=text;
    obj.add(newOp,pos);
} //fecha funcao

function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
}

function zoomDataSet(titulo, dataset, campos, resultFields, filtro, type){
  window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+"&resultFields="+resultFields+"&type="+type+"&title="+titulo, "zoom" , "status , scrollbars=no ,width=600, height=550 , top=0 , left=0");  
}   

function fnConverteRetornoJson(jsonResp) {  
  //console.log("===funcoesgenericas - fnConverteRetornoJson");
  jsonResp = new String(jsonResp);
  var aux = jsonResp;
  var posicao1 = jsonResp.indexOf('"{');
  var str1     = jsonResp.substring(0,posicao1); 
  var str2     = jsonResp.substring(posicao1 + 1,jsonResp.length);
  var jsonResp = str1 + str2;
  var posicao1 = jsonResp.indexOf('}"');  
  var str1     = jsonResp.substring(0,posicao1 + 1);
  var str2     = jsonResp.substring(posicao1 + 2,jsonResp.length);
  var jsonResp = str1 + str2; 
  jsonResp = jsonResp.replace(/[\\]/g, "");
  var jsonObj = eval ( "(" + jsonResp + ")");
  return jsonObj;
}

//=========================================================================================================================
// Padrão: Essa funcao é padrão: Acionada pelo displayFields para colocar mostrar a descrição dos dias na atividade
//=========================================================================================================================
function fnDiasNaAtividade(atividade) {
  var dif = 0;
  var descricao = "";
  
  var dataIniAtiv = document.getElementById("vDataIniAtiv_" + atividade).value;
  var dataFimAtiv = document.getElementById("vDataFimAtiv_" + atividade).value;
  var diasAtiv    = document.getElementById("vDiasAtiv_"    + atividade).value;
  
  if (dataIniAtiv != "") {
    dataIniAtiv = dataIniAtiv.split("/");
    var diaIni = dataIniAtiv[0];
    var mesIni = dataIniAtiv[1] - 1;
    var anoIni = dataIniAtiv[2];
    var dataIni = new Date(anoIni, mesIni, diaIni);
    if (dataFimAtiv != "") {
      dataFimAtiv = dataFimAtiv.split("/");
      var diaFim = dataFimAtiv[0];
      var mesFim = dataFimAtiv[1] - 1;
      var anoFim = dataFimAtiv[2];
      var dataFim1 = new Date(anoFim, mesFim, diaFim);
      dif = parseInt((dataFim1 - dataIni) / (1000 * 60 * 60 * 24));
    } else {
      var dataFim2 = new Date();
      dif = parseInt((dataFim2 - dataIni) / (1000 * 60 * 60 * 24));
    }
    
    if (atividade == getWKNumState()) {
      if (diasAtiv != "" && parseInt(diasAtiv) != 0) { dif = dif + parseInt(diasAtiv); }
      descricao = dif.toString() + ' dia(s) nesta atividade&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    } else { descricao = diasAtiv + ' dia(s) nesta atividade&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';  }           
    document.getElementById("span_num_dias_ativ_" + atividade).innerHTML = descricao;
  }
}


//=========================================================================================================================
// Padrão: Essa funcao é padrão: Acionada no displayFields especifica para ativiade inicial e mostra dias total
//=========================================================================================================================
function fnDiasAberturaProjeto() {
  var dif = 0;
  var descricao = "";
  dataSolicitacao = document.getElementById("dtAberturaSolic").value;
  dtFimSolic      = document.getElementById("dtFimSolic").value;

  dataSolicitacao = dataSolicitacao.split("/");
  var diaIni = dataSolicitacao[0];
  var mesIni = dataSolicitacao[1] - 1;
  var anoIni = dataSolicitacao[2];
  var dataIni = new Date(anoIni, mesIni, diaIni);
  
  if (dtFimSolic != "") {
    dtFimSolic = dtFimSolic.split("/"); 
    var diaFim = dtFimSolic[0];
    var mesFim = dtFimSolic[1] - 1;
    var anoFim = dtFimSolic[2];
    var dataFim1 = new Date(anoFim, mesFim, diaFim);  
    dif = parseInt((dataFim1 - dataIni) / (1000 * 60 * 60 * 24));
    descricao = "Projeto ficou aberto por " + dif.toString() + " dia(s)&nbsp;&nbsp;&nbsp;&nbsp;"; 
  } else {
    var dataFim2 = new Date();
    dif = parseInt((dataFim2 - dataIni) / (1000 * 60 * 60 * 24));
    descricao = "Projeto aberto há " + dif.toString() + " dia(s)&nbsp;&nbsp;&nbsp;&nbsp;";
  }
  document.getElementById("span_num_dias_projeto_aberto").innerHTML = descricao;
}


//=========================================================================================================================
// Padrão: Essa funcao é padrão:
//=========================================================================================================================
function fnValidarCampo(obj) {
  //==========================================================================
  //Verifica preenchimento obrigatorio do campo tipo input
  //Deixa em vermelho o input sinalizando campo obrigatório
  //==========================================================================
  //Se nao foi preenchido nada
  if($(obj).val() == null || $(obj).val().trim() == '') {
    objParent = $(obj); 
    objParent.removeClass();
    objParent.addClass('form-control alert alert-danger');
  }else {
    objParent = $(obj); 
    objParent.removeClass();
    objParent.addClass('form-control');
  }
}

//=========================================================================================================================
// Padrão: Essa funcao é padrão: Acionada no displayFields aplica cor no painel default da atividade
//=========================================================================================================================
function alteraCorPanel(panel,corPanel){
  $(panel).removeClass();
  $(panel).addClass(corPanel);
}

//=========================================================================================================================
// Padrão: Essa funcao é padrão: Acionada no displayFields troca a cor nas mensagens que estão no painel destacado
//=========================================================================================================================
function trocaBackground(idCampo, corCampo){
  $(idCampo).css("background-color",corCampo);
}

//=========================================================================================================================
// Padrão: Essa funcao é padrão: Retorna o link do servidor atual
//=========================================================================================================================
function serverURL() {
  try {
    return parent.WCMAPI.serverURL;
  }catch(e) {
    return "";
  }
}

//=========================================================================================================================
// Padrão: Essa funcao é padrão: Retorna se está no mobile ou nao
//=========================================================================================================================
function isMobile() {
  try {
    return parent.WCMAPI._isMobile();
  }catch(e) {
    return false;
  }
}

//==============================================================
// formatacao Somente numeros
//==============================================================
    function formataNumeros(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormatanumeros()", 1);
    }

    function executarFormatanumeros(v){
      l_valor = g_obj_data.value;

      l_valor = l_valor.replace(/[^0-9]/g,"");   

        g_obj_data.value = l_valor;
    }
//==============================================================
// formatacao Somente letras
//==============================================================
    function formataLetras(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataletras()", 1);
    }

    function executarFormataletras(v){
      l_valor = g_obj_data.value;

      l_valor = l_valor.replace(/[^a-z]/g,"");  

        g_obj_data.value = l_valor;
    }

//==============================================================
// formatacao do Especiais
//==============================================================
    function formataEspeciais(p_elemento){
      g_obj_data = p_elemento;
      setTimeout("executarFormataEspeciais()", 1);
    }

    function executarFormataEspeciais(v){
      l_valor = g_obj_data.value;
      l_valor = l_valor.replace(/[^a-z0-9]/g,"");         
      g_obj_data.value = l_valor;
    }

//================================================================
//adiciona 'n' zeros à esquerda da string 'x' recebida
//chamada: var h = addZero(d.getHours(), 2);
//================================================================
function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

function fnTransferSolicUser() {
  
  var dataJSON = ''; 
    dataJSON = dataJSON + '{ "userTo":"' + $('#loginEmNome').val() + '"';
    dataJSON = dataJSON + ', "userFrom":"' + $('#loginUserAberturaSolic').val() + '"';
    dataJSON = dataJSON + ', "transferActiveDocuments": false'
    dataJSON = dataJSON + ', "transferMyDocumentsInApproval": false'
    dataJSON = dataJSON + ', "transferPendingWorkflow": true'
    dataJSON = dataJSON + ', "transferOpenWorkflow": true'
    dataJSON = dataJSON + ', "transferApprovers": false'
    dataJSON = dataJSON + ', "transferApprovals": false'
    dataJSON = dataJSON + ', "transferDocumentSecurity": false'
    dataJSON = dataJSON + ', "instanceIdInitial":' + $('#nrSolic').val()
    dataJSON = dataJSON + ', "instanceIdFinal": ' + $('#nrSolic').val()
    dataJSON = dataJSON + ', "documentIdInitial": 0, "documentIdFinal": 0 }';
  
  console.log('fnTransferSolicUser');
  console.log(dataJSON);

  var value = $.ajax({ 
        async : true,
        type : "POST",
        url : '/api/public/2.0/tasks/transfer',
        contentType: "application/json",
      data: dataJSON,
        error: function(retorno) {
          console.log('error');
          console.log(retorno);
          $('#h_jsonInAPITransfer').val(retorno);
          $('#h_retornoAPITransfer').val("NOK");
        },
      success: function(retorno) {
        
        //Exemplo do Retorno:
        // {"content":"=== Verificando Transferência de Tarefas Workflow Pendentes ===\n 
        // [WARN] Nenhum registro encontrado.\n
        // ================================================================================\n
        // === Verificando Transferência de Workflow Abertos ===\n 
        // [INFO] Solicitação workflow (WF-0001 - Solicitação: 392217) Iniciando transferência para colaborador osny-ba.\n
        // [WARN] Solicitação workflow (WF-0001 - Solicitação: 392217) que seria transferida para o colaborador osny-ba não teve histórico de pendência encontrado.\n
        // ================================================================================\n",
        // "message":{"message":"OK","detail":"OK","type":"INFO","errorCode":null}}

          retornoOBJ = JSON.parse(retorno);

          $('#h_retornoAPITransfer').val(retornoOBJ.message.message);
          $('#h_jsonInAPITransfer').val(retorno);
        }
    });  
}

function fnModalEmNome() {
  //Verifica se está abrindo a solicitação em nome de outra pessoa
  //Essa funcao é chamada após ter selecionado o campo Em Nome de
  if ($('#loginUserAberturaSolic').val() != $('#loginEmNome').val()) {
    //mensagem  = "Essa solicitação será enviada para " + $('#txtEmNome').val() + " para aprovação.<br>";
    mensagem = $('#txtEmNome').val() + " assumirá todas as funções desse processo como Solicitante.<br>";
//    mensagem += "Se aprovada, " + $('#txtEmNome').val() + " assumirá todas as funções desse processo como Solicitante.<br>";
//    mensagem += "Caso contrário, a solicitação será finalizada.";
    
    var myModal = FLUIGC.modal({
        title: 'Aviso',
        content: mensagem,
        id: 'fluig-modal',
        size: 'large',
        actions: [{
            'label': 'Ok, Entendi',
            'bind': 'data-modal-emnome-sim',
            'autoClose': true
        }]
    }, function(err, data) {
        if(err) {
            fnAlerta("Falha na transferência de funções, favor contatar o analista responsável. Erro: " + err);
        }
    });
    
    $("button[data-modal-emnome-sim]").click(function(){
      $('#h_escolhaAPITransfer').val('S')
    })
  }else {
    $('#h_escolhaAPITransfer').val('N')
  }
}

