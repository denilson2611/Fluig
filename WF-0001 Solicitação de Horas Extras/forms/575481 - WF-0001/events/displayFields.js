function displayFields(form,customHTML){ 

	//===========================================
	//Gravação nos campos ocultos
	//===========================================
	form.setValue('nrSolicDemanda'	  ,'403489'); 		//Colocar o numero da solicitação da demanda
    form.setValue('idDoctoAjuda'  	  ,'1186953');    	//Colocar o id do documento da MIF Final (Manual do usuário)

	//============================================================
	//Colocar a descrição do processo e a estrutura do subprocesso
	//============================================================
    txtDescWorkflow    = 'WF-0001 Solicitação de Horas Extras';  
    txtDescSubProcesso = 'DA- Administrativa / REH - Recursos Humanos / FOP - Folha de Pagamento / 001 - Cálculo da folha / <b>005 - Registro do ponto</b>';
    
    customHTML.append("<script>document.getElementById('txtDescWorkflow').innerHTML='" +  txtDescWorkflow + "';</script>");	
    customHTML.append("<script>document.getElementById('txtDescSubProcesso').innerHTML='" +  txtDescSubProcesso + "';</script>");	

	//===================================================
	// Variáveis padrões
	//===================================================
	var WKUser    	= getValue("WKUser");
	var WKCompany 	= getValue("WKCompany");	
	var WKNumState  = parseInt(getValue("WKNumState"));
	var WKNumProces = parseInt(getValue( "WKNumProces"));
	var WKDef 		= getValue( "WKDef");

	//=======================================
	// Coloca as funções no html
	//=======================================	
	form.setHidePrintLink(true);
	form.setShowDisabledFields(true);

	//=======================================
	// Log para debugar o código
	//=======================================
	log.info('=== displayFields');
	log.info('=== Processo: ' + WKDef);
	log.info(WKNumState); //quando não existir WKNumState retorna NaN
	log.info(WKNumProces);   //quando não existir solicitação retorna NaN
	log.info(form.getMobile());
	log.info(form.getFormMode());
	
	//=======================================
	// Coloca as funções no html
	//=======================================
	
	var funcoesGet = "<script>";
	funcoesGet += "function getNumProces(){ return " 		+ WKNumProces + "; } ";
	funcoesGet += "function getWKNumState(){ return " 		+ WKNumState + "; } ";
	funcoesGet += "function getFormMode(){ return '" 		+ form.getFormMode() + "'; } ";
	funcoesGet += "function getUser(){ return '" 			+ WKUser + "'; } ";
	funcoesGet += "function getWKReplacement(){ return " 	+ getValue("WKReplacement") + "; } ";
	funcoesGet += "function getFichario(){ return " 		+ form.getCardIndex() + "; } ";
	funcoesGet += "function getFicha(){ return " 			+ form.getDocumentId() + "; } ";
	funcoesGet += "function getVersaoFicha(){ return " 		+ form.getVersion() + "; } ";
	funcoesGet += "function getCompany(){ return " 			+ WKCompany + "; } ";
	funcoesGet += "function getMobile(){ return " 			+ form.getMobile() + "; } ";
	funcoesGet += "function getWKDef(){ return '" 			+ getValue("WKDef") + "'; } ";
	funcoesGet += "</script>";
	customHTML.append(funcoesGet);
	
	//=====================
	// Desabilita os campos
	//=====================
	fnDesabilitaCampos();

	//========================================
	// Mostra o historico conforme a atividade
	//========================================
	listaAux = ['4','5','9','17']; //coloque aqui todas as atividades que guardam historico
	for (i=0; i < listaAux.length; i++){
		fnMostraHistorico(listaAux[i]);
	}

	//===========================================
	// Mostra o usuario que finalizou a atividade
	//===========================================
	listaAux = ['4','5','9','17']; //coloque aqui todas as atividades que devem mostrar o usuário
	for (i=0; i < listaAux.length; i++){
		fnMostraUsuario(listaAux[i]);
	}

	//====================================================
	// Calcula o numero de dias na atividade - inicia na 2
	//====================================================
	listaAux = ['5','9','17']; //coloque aqui todas as atividades exceto a primeira
	for (i=0; i < listaAux.length; i++){
		fnDiasNaAtividade(listaAux[i]);
	}
	
	//=========================================================
	// fecha todos os paineis, depois abre conforme a atividade
	//=========================================================
	listaAux = ['4','5','9','17'];
	for (i=0; i < listaAux.length; i++){
		esconderCollapse("#painelA_ativ_" + listaAux[i]);
	}

	//=========================================================================
	// Se for mobile deve fazer alguns tratamentos
	//=========================================================================
	verificaMobile();

	//=============================================================
	// Calcula e mostra o numero de dias do projeto
	//=============================================================
	customHTML.append("<script>fnDiasAberturaProjeto();</script>");	

	//=============================================================
	// Define quais opções serão mostradas no menu  do formulário
	//=============================================================
	//esconder('#id_op_principal');	
	//esconder('#id_op_historico');	
	esconder('#id_op_cancela');	
	//esconder('#id_ajuda'); //nao aparece se for mobile - ver a funcao verificaMobile()
	//esconder('#id_sobre');	


	//=========================================================================
	// Especifica para esse WF - Mostra ou oculta campos e divs do formulário cfe informações armazenadas
	//=========================================================================
	customHTML.append("<script>fnDisplayCampos();</script>");	

	//=========================================================================
	// Mostrar os campos relacionados a estrutura do processo
	//=========================================================================
    if(WKNumState != 0 || form.getFormMode() == 'VIEW') {
    	esconder('#div_idDiretoria');
    	esconder('#div_idArea');
    	esconder('#div_idMacroProcesso');
    	esconder('#div_idProcesso');
    	esconder('#div_idSubProcesso');
    }

    if(WKNumState == 0) {
    	esconder('#div_btDetSolic');
		mostrar('#div_DetSolic');
	    form.setValue('nrSolic','0');
	    var aux = fnBuscarDataHora('data');                      //retorna dd/mm/aaaa
		form.setValue('dtAberturaSolic',aux);                    //grava dd/mm/aaaa
		form.setValue('dtAberturaSolic_EN', fnInverteData(aux)); //grava aaaa-mm-dd
		form.setValue('hrAberturaSolic'			,fnBuscarDataHora('hora'));
		form.setValue('situacaoSolic'			,'Em abertura');
		form.setValue('loginUserAberturaSolic'	,WKUser);
		form.setValue('nmUserAberturaSolic'		,fnBuscarColleague(WKUser,"colleagueName"));
		form.setValue('loginEmNome'				,WKUser);
		form.setValue('txtEmNome'				,fnBuscarColleague(WKUser,"colleagueName"));

		//=====================================================================
		//Para testes - forçar que o solicitante é alguem cadastrado no Datasul
		//=====================================================================
		//if(getValue('WKUser') == "t-denilson") {
		//	form.setValue("loginUserAberturaSolic", "osny-ba");
		//	form.setValue("nmUserAberturaSolic", "Osny");
		//}

		//Padrao: Buscar os dados do usuário no Datasul para completar os campos nos campos do Solicitante e EmNomede
		customHTML.append("<script>fnBuscaInfSolicitante();</script>");	
	}

	if (WKNumState == 0 || WKNumState == 4) {
		//Muda a cor do painel evidenciando atividade atual - atenção para o nome do painel ("painel_ativ_999")
		alteraCorPanel(4);
		//Muda a cor da listaProcesso para acompanhar a cor do painel senao fica em cinza
		customHTML.append('<script>trocaBackground("#listaProcesso", "#d9edf7");</script>');

    	mostrarCollapse("#painelA_ativ_4");

		form.setEnabled("txtEmNome"				, true);
		form.setEnabled("idDiretoria"			, true);
		form.setEnabled("idArea"			    , true);
		form.setEnabled("idMacroProcesso"		, true);
		form.setEnabled("idProcesso"			, true);
		form.setEnabled("idSubProcesso"			, true);

		//Campos da atividade		
		form.setEnabled("txtDataRealizacao"		, true);
		form.setEnabled("horaPrevIni"			, true);
		form.setEnabled("horaPrevFim"			, true);
		form.setEnabled("txtDataCompensacao"	, true);
		form.setEnabled("txtReferencia"			, true);
		form.setEnabled("txtJustificativa"		, true);

		mostrar('#span_txtDataRealizacao');
		mostrar('#span_txtDataCompensacao');

	}

	if (WKNumState == 4) { // 4-inicio

    	mostrarCollapse("#painelA_ativ_" + WKNumState.toString());

		//Posiciona no painel da atividade x para melhor visualizar o painel corrente - geralmente é da atividade anterior
		//posicionaPainel("#pontoPainel_1");

		//Muda a cor do painel evidenciando atividade atual - atenção para o nome do painel ("painel_ativ_999")
		alteraCorPanel(WKNumState);

		//Grava nos campos o login, nome do responsável e a data atual
		gravaRespData(WKNumState);
	}

	/*
	if (WKNumState == 24) { // 24-Aprovar Em Nome de
    	mostrarCollapse("#painelA_ativ_4");

		//Posiciona no painel da atividade x para melhor visualizar o painel corrente - geralmente é da atividade anterior
		//posicionaPainel("#pontoPainel_1");

		//Muda a cor do painel evidenciando atividade atual - atenção para o nome do painel ("painel_ativ_999")
		alteraCorPanel(4);

		//Grava nos campos o login, nome do responsável e a data atual
		gravaRespData(24);

		mostrar('#aprv_EmNome');

		//Campos da atividade		
		form.setEnabled("radAprovaEmNome"	, true);
		form.setEnabled("txtObsAprovaEmNome", true);

		//Limpa os campos no caso de já ter passado por essa atividade
		form.setValue("radAprovaEmNome"	 	, '');	
		form.setValue("txtObsAprovaEmNome"	, '');
	}
	*/

	if (WKNumState == 5) { // 5-Avaliar Solicitação

		form.setValue('h_retornoAPITransfer','');
		if (form.getValue('h_escolhaAPITransfer') == 'S') {
			customHTML.append("<script>fnTransferSolicUser();</script>");	
			form.setValue('h_escolhaAPITransfer','N');
		}

    	mostrarCollapse("#painelA_ativ_" + WKNumState.toString());

		//Posiciona no painel da atividade x para melhor visualizar o painel corrente - geralmente é da atividade anterior
		posicionaPainel("#pontoPainel_4");

		//Muda a cor do painel evidenciando atividade atual - atenção para o nome do painel ("painel_ativ_999")
		alteraCorPanel(WKNumState);

		//Grava nos campos o login, nome do responsável e a data atual
		gravaRespData(WKNumState);

		//Campos da atividade		
		form.setEnabled("rsDecisaoAvaliacao"	, true);
		form.setEnabled("cod_des_motivo"		, true);
		form.setEnabled("edObsAvaliar"			, true);

		//Limpa os campos no caso de já ter passado por essa atividade
		form.setValue("rsDecisaoAvaliacao"	 	, '');	
		form.setValue("h_rsDecisaoAvaliacao"	, '');	
		form.setValue("cod_des_motivo"		 	, '');
		form.setValue("cod_motivo"	 	    	, '');
		form.setValue("edObsAvaliar"		 	, '');


		//=========================================================================
		// Mostra ou oculta campos e divs do formulário cfe informações armazenadas
		//=========================================================================
		customHTML.append("<script>fnDisplayCampos();</script>");	
	}

	if (WKNumState == 9) { // 9-Executar
    	
    	mostrarCollapse("#painelA_ativ_" + WKNumState.toString());

		//Posiciona no painel da atividade x para melhor visualizar o painel corrente - geralmente é da atividade anterior
		posicionaPainel("#pontoPainel_5");

		//Muda a cor do painel evidenciando atividade atual - atenção para o nome do painel ("painel_ativ_999")
		alteraCorPanel(WKNumState);

		//Grava nos campos o login, nome do responsável e a data atual
		gravaRespData(WKNumState);

		//Campos da atividade		
		form.setEnabled("rsExecutado"			, true);
		form.setEnabled("txtDataExecucao"       , true);
		form.setEnabled("horaRealIni"			, true);
		form.setEnabled("horaRealFim"			, true);
		form.setEnabled("edObsExecutado"        , true);
		mostrar('#span_txtDataExecucao');

		//Limpar os campos
		form.setValue("rsExecutado"				,'');
		form.setValue("h_rsExecutado"   		,'');
		form.setValue("horaRealIni"  			,'');
		form.setValue("horaRealFim"  			,'');
		form.setValue("edObsExecutado"  		,'');
	}

	if (WKNumState == 17) { //17-notificar

    	mostrarCollapse("#painelA_ativ_" + WKNumState.toString());

		//Posiciona no painel da atividade x para melhor visualizar o painel corrente - geralmente é da atividade anterior
		posicionaPainel("#pontoPainel_9");

		//Muda a cor do painel evidenciando atividade atual - atenção para o nome do painel ("painel_ativ_999")
		alteraCorPanel(WKNumState);

		//Grava nos campos o login, nome do responsável e a data atual
		gravaRespData(WKNumState);

		//Campos da atividade		

		//=========================================================================
		// Mostra ou oculta campos e divs do formulário cfe informações armazenadas
		//=========================================================================
		customHTML.append("<script>fnDisplayCampos();</script>");	
	}

    //função para esconder campos (usar #), classe (usar .) , div, etc
    //chamada: esconder(".escondeColuna"); - esconder("#tabelaDespesas");
    function esconder(seletorCampo){
        customHTML.append("<script>$('" + seletorCampo + "').hide();</script>");
    }

    function esconderCollapse(seletorCampo){
        customHTML.append("<script>$('" + seletorCampo + "').collapse('hide');</script>");
    }

    function mostrar(seletorCampo){
        customHTML.append("<script>$('"+seletorCampo+"').show();</script>");        
    }

    function mostrarCollapse(seletorCampo){
        customHTML.append("<script>$('"+seletorCampo+"').collapse('show');</script>");        
    }
 
    function alteraCorPanel(nrAtividade){
        customHTML.append('<script>alteraCorPanel("#painel_ativ_' + nrAtividade.toString() + '","panel panel-info");</script>');
    }

    function fnPosicionaAba(idAba,nomeAba){
        customHTML.append('<script>fnPosicionaAba("' + idAba + '","' + nomeAba+'");</script>');
    }

    //Habilita ou Desabilita campos filho
    //var campos = ["cbMotivo","cbTipoConta","valorHonorarios"];
    //fnCamposFilho("nome da tabela",campos,true ou false);
    function fnCamposFilho(tableName, campos, acao){
        var indexes = form.getChildrenIndexes(tableName);
        for (var i = 0; i < indexes.length; i++) {
            for (var j = 0; j < campos.length; j++) {
                form.setEnabled(campos[j] + "___" + indexes[i], acao);
            }
        }
    }

	function fnMostraHistorico(nrAtividade) {
		nrAtividade = nrAtividade.toString();
		mensagem = form.getValue('histAtiv_' + nrAtividade);

		//Verifica se tem historico na atividade
		if(mensagem != '') {

			fnGeraLog('mensagem.split("<br>");');

			qtde = mensagem.split("<br>");
			qtde = qtde.length;
			//Coloca o contador									
			customHTML.append('<script>document.getElementById("span_cont_histAtiv_' + nrAtividade +  '").innerHTML = "' + qtde.toString() + '";</script>');

			//Coloca a mensagem
			customHTML.append('<script>document.getElementById("div_histAtiv_' + nrAtividade +  '").innerHTML = "' + mensagem + '";</script>');

			//Mostra todo o historico
			mostrar('#span_histAtiv_' + nrAtividade);

//			mensagem = '<b>Histórico</b><br>';
//			mensagem += form.getValue('histAtiv_' + nrAtividade.toString());
//			customHTML.append('<script>document.getElementById("span_histAtiv_' + nrAtividade.toString() +  '").innerHTML = "' + mensagem + '";</script>');
		}
	}

	function fnMostraHistGeral() {
		//Mostra o historico Geral
		if(form.getValue('histGeral') != '') {
			mensagem = form.getValue('histGeral');
			customHTML.append('<script>document.getElementById("span_histGeral").innerHTML = "' + mensagem + '";</script>');
		}
	}

	function gravaRespData(nrAtividade) {
		nrAtividade = nrAtividade.toString();
		form.setValue("loginRespAtiv_" + nrAtividade, getValue("WKUser"));
		form.setValue("nmRespAtiv_"    + nrAtividade, fnBuscarColleague(WKUser,"colleagueName"));
		
	    var aux = fnBuscarDataHora('data');                            //retorna dd/mm/aaaa
		form.setValue('dtAtiv_'    + nrAtividade,aux);                 //grava dd/mm/aaaa
		form.setValue('dtAtiv_EN_' + nrAtividade, fnInverteData(aux)); //grava aaaa-mm-dd
	}

	function fnMostraUsuario(nrAtividade) {
		fnGeraLog('===fnMostraUsuario');

		//===================================================
		// Pega os dados dos campos ocultos, formata e mostra
		//===================================================
		vUserSpan = form.getValue('vUserSpan_' + nrAtividade.toString()); //Pega o login do usuario
		vDateSpan = form.getValue('vDateSpan_' + nrAtividade.toString()); //Pega no formato aaaa-mm-dd hh:mm
		
		//log.info('=== fnMostraUsuario');
		//log.info(vDateSpan);
		
		if(vUserSpan != '' && vDateSpan != null) { //Se tiver conteudo indica que já concluiu a atividade
			vUserSpan = fnBuscarColleague(vUserSpan,"colleagueName");
			dt = vDateSpan.substring(0,10);
			hr = vDateSpan.substring(11,16);

			fnGeraLog("dt = dt.split('-')");
			
			dt = dt.split('-');			
			mensagem = vUserSpan + " em " + dt[2] + "/" + dt[1] + "/" + dt[0] + " " + hr;
			customHTML.append('<script>document.getElementById("span_' + nrAtividade.toString() +  '").innerHTML = "' + mensagem + '";</script>');
		}
	}

	function fnDiasNaAtividade(nrAtividade) {
		nrAtividade = nrAtividade.toString();
		//Corrige campo se ocorrer problema no calculo do campo
		if(form.getValue('vDiasAtiv_' + nrAtividade) == 'NaN') {  form.setValue('vDiasAtiv_'+nrAtividade,'0');	}
		
		customHTML.append('<script>fnDiasNaAtividade("' + nrAtividade + '");</script>');			
	}

	//=========================================================================
	// Posiciona no painel
	//=========================================================================
    function posicionaPainel(nomePainel){
    	//Somente se o modo for Edição, pois caso contrário ocorre um probleminha após ter enviado a solicitação!
    	if(form.getFormMode() == 'MOD') {
		    customHTML.append("<script>");
		    customHTML.append('setTimeout(function(){');
		    customHTML.append('location.href = "' + nomePainel + '";');
		    customHTML.append('}, 500);');
		    customHTML.append("</script>");    		
    	}
    }

	//=========================================================================
	// Se for mobile deve esconder alguns componentes devido ao tamanho da tela
	//=========================================================================
	function verificaMobile() {
		if(form.getMobile() == true) {
			
			esconder('#id_ajuda');

			//Atividade 1
			esconder('#listaProcesso');					//Lista do processo da atividade 1
			esconder('#span_num_dias_projeto_aberto');  //Projeto aberto há xx dias da atividade 1		

			//Demais Atividades
			listaAux = ['5','9','17'];
			for (i=0; i < listaAux.length; i++){
				esconder('#span_num_dias_ativ_' + listaAux[i]);			//xx dias nesta atividade
				esconder('#span_' + listaAux[i]);						//usuario, data, hora que concluiu a atividade
			}
		}
	}

	function fnDesabilitaCampos() {
		//===================================================
		//Campos padrões
		//===================================================
		form.setEnabled("txtEmNome"				, false);
		form.setEnabled("idDiretoria"			, false);
		form.setEnabled("idArea"			    , false);
		form.setEnabled("idMacroProcesso"		, false);
		form.setEnabled("idProcesso"			, false);
		form.setEnabled("idSubProcesso"			, false);

		//===================================================
		//Campos da Atividade 4-inicio
		//===================================================
		form.setEnabled("txtDataRealizacao"		, false);
		form.setEnabled("horaPrevIni"			, false);
		form.setEnabled("horaPrevFim"			, false);
		form.setEnabled("txtDataCompensacao"	, false);
		form.setEnabled("txtReferencia"			, false);
		form.setEnabled("txtJustificativa"		, false);
		esconder('#span_txtDataRealizacao');
		esconder('#span_txtDataCompensacao');

		//===================================================
		//campos da atividade 5-avaliar solicitação
		//===================================================
		form.setEnabled("rsDecisaoAvaliacao"	, false);
		form.setEnabled("cod_des_motivo"		, false);
		form.setEnabled("edObsAvaliar"			, false);

		//===========================================
		//campos da atividade 9-executar
		//===========================================
		form.setEnabled("rsExecutado"			, false);
		form.setEnabled("txtDataExecucao"       , false);
		form.setEnabled("horaRealIni"			, false);
		form.setEnabled("horaRealFim"			, false);
		form.setEnabled("edObsExecutado"        , false);
		esconder('#span_txtDataExecucao');

		//===================================================
		//campos da atividade 17-notificar
		//===================================================
	}

	function fnGeraLog(msg) {
		log.info(msg);
	}

}