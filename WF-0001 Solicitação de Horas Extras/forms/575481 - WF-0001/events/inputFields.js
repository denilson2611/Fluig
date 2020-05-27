function inputFields(form){

	//===================================================
	// Variáveis padrões
	//===================================================
	var WKUser    	= getValue("WKUser");
	var WKCompany 	= getValue("WKCompany");	
	var WKNumState  = parseInt(getValue("WKNumState"));
	var WKNumProces = parseInt(getValue( "WKNumProces"));
	var WKDef 		= getValue( "WKDef");

	//=======================================
	// Log para debugar o código
	//=======================================
	log.info('===inputFields');
	log.info('===Processo: ' + WKDef);
	log.info(WKNumState); //quando não existir WKNumState retorna NaN
	log.info(WKNumProces);   //quando não existir solicitação retorna NaN

	var atividade = WKNumState;
	var usuario   = getValue("WKUser");
	
	if (atividade == 4) { //4-inicio
		acao = ''; 
		hist = '';
		form.setEnabled("txtDataRealizacao"		, true);
		form.setEnabled("horaPrevIni"			, true);
		form.setEnabled("horaPrevFim"			, true);
		form.setEnabled("txtDataCompensacao"	, true);
		form.setEnabled("txtReferencia"			, true);
		form.setEnabled("txtJustificativa"		, true);

		if(form.getValue("h_escolhaAPITransfer") == "S") {
			hist = 'Solicitação aberta em nome de ' + form.getValue("txtEmNome") + " - "; 
		} 

		hist = hist + "Data Realização: " + form.getValue("txtDataRealizacao");
		hist = hist + " de: " + form.getValue("horaPrevIni") + " até: " + form.getValue("horaPrevFim");
		hist = hist + " - Data Compensação: " + form.getValue("txtDataCompensacao");

		gravaHistorico(form, atividade, hist, acao);

		//Especificamente nesse fluxo, a atividade para o usuário "Em Nome de" aprovar, não existirá, entrando diretamente para a proxima atividade
		form.setValue('radAprovaEmNome',"A");
		form.setValue('h_radAprovaEmNome',"A");
		form.setValue('txtObsAprovaEmNome',"Não necessita de aprovação");	
			
	}
	
	//if (atividade == 24) { //24-Aprovar Em Nome de
	//	acao = form.getValue("radAprovaEmNome"); 
	//	hist = '';
	//	hist = 'Análise Em Nome de';
	//	gravaHistorico(form, atividade, hist, acao);
	//}

	if (atividade == 5) { //5-Avaliar solicitação
		acao = form.getValue("rsDecisaoAvaliacao"); 
		hist = '';

		if(acao == 'Reprovada') {  
			hist = 'Motivo: ' + form.getValue("cod_des_motivo") + ' - Observações: ' + form.getValue("edObsAvaliar");			
		}else {
			hist = 'Observações: ' + form.getValue("edObsAvaliar");			
		}

		gravaHistorico(form, atividade, hist, acao);

		// Se nessa atividade estiver OK indica que ocorreu corretamente a transferencia, então gravar o historico na atividade inicial.
		//if(form.getValue('h_retornoAPITransfer') == "OK") {
		//	hist = 'Solicitação aberta Em Nome de: ' + form.getValue('txtEmNome') + " que passa ser o solicitante.";
		//	gravaHistorico(form, 4, hist, '');
		//}
	}
	
	if (atividade == 9) { //9-Executar
		acao = form.getValue("rsExecutado"); 
		hist = ''; 

		if(form.getValue('rsExecutado') == 'Sim') { 
			hist = ' Data Execução: '  + form.getValue('txtDataExecucao');
			hist = hist + " de: " + form.getValue("horaRealIni") + " até: " + form.getValue("horaRealIni");
		}

		hist = hist + ' - Observação: ' + form.getValue('edObsExecutado');

		gravaHistorico(form, atividade, hist, acao);
	}

	if (atividade == 17) { //17-Notificar
		acao = '';
		hist = 'Notificado';

		gravaHistorico(form, atividade, hist, acao);
	}

	//============================================================================================
	// Recebe o campo textarea e troca os caracteres chr(10) e chr(13)
	//============================================================================================
	function fnReplaceNovaLinha(campo) {
		campo = form.getValue(campo);
		
		if (campo == '' || campo == null) { return campo; }

		tamanho = campo.length();
		novo = campo;
		for ( var i=0; i<tamanho; i++ ) {
			x = campo.substring(i,i+1);	
			//log.info(x);

			if (x == String.fromCharCode(10)) { novo = novo.replace( x, ' ' );}
			if (x == String.fromCharCode(13)) { novo = novo.replace( x, '' ); }
		}

		return novo;
	}

}