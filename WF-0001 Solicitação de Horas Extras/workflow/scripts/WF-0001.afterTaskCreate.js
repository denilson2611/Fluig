function afterTaskCreate(colleagueId){
	
	var nrAtividade   = getValue("WKNumState");
	var nrSolic       = getValue("WKNumProces");
	var proxAtiv      = getValue("WKNextState");
	var nrAtividadeAtual = getValue('WKCurrentState');

	log.info("==================================");
	log.info("evento: afterTaskCreate");
	log.info("==================================");
	log.info("WKDef: " + getValue("WKDef"));
	log.info("colleagueId: "    + colleagueId);
	log.info("nrAtividade: "    + nrAtividade.toString());
	//log.info("proxAtiv: "       + proxAtiv.toString());
	log.info("AtivAtual: "      + nrAtividadeAtual.toString());
	log.info("nrSolic: "        + nrSolic);

	//=================================================================================
	// Rotina Padrão: Guardar o usuario atividade atual
	//=================================================================================	
    hAPI.setCardValue("atividadeAtual", nrAtividade);	 
	if (colleagueId != "System:Auto") { 
		hAPI.setCardValue("loginRespAtual", colleagueId);
	}	
	descricao = 'atividade não identificada';
	if(nrAtividade == 4)   { descricao = 'Início'; }
	if(nrAtividade == 5)   { descricao = 'Avaliar Solicitacao'; }
	if(nrAtividade == 9)   { descricao = 'Executar'; }
	if(nrAtividade == 17)  { descricao = 'Notificar'; }
	if(nrAtividade == 25)  { descricao = 'Fim'; }
	hAPI.setCardValue("descAtividadeAtual", descricao);	 

	if(nrAtividade == 4)  { 
		aux = hAPI.getCardValue("nrSolic");
		hAPI.setCardValue("identificador", aux);	 
	}


	//=================================================================================
	// Rotina Especifica: Calcular a data prazo da atividade
	//=================================================================================	
	if(proxAtiv == 9) { //9-Executar
		dtBase     = hAPI.getCardValue("txtDataCompensacao"); //hAPI.getCardValue("dtEnvioFisico");
		prazoHoras = 8;      // + 1 dia de 8 horas
		horario    = 64800;  // 18horas
		dt = fnSetarPrazo(dtBase,prazoHoras, horario);
	}


	//===============================================================================
	// Calcula prazo da atividade a partir de uma data informada + x horas
	//===============================================================================
	function fnSetarPrazo(dtBase,prazoHoras, horario) {
		//dtBase     = será a data inicial ou a data prazo desejada
		//prazoHoras = será a quantidade de horas a partir da dtBase, se passar 0 o prazo será a dtBase
		//horario    = será a hora desejada para o prazo

		calendario = "Default";
		//horario    = 64800; // 64800 = 18h

		log.info('============');
		log.info('fnSetarPrazo');
		log.info('dtBase..... ' + dtBase);
		log.info('prazoHoras. ' + prazoHoras);
		log.info('horario.... ' + horario);
	
		dia = dtBase.substring(0,2);
		mes = dtBase.substring(3,5);
		ano = dtBase.substring(6,10);

		var dtInicial = new Date();
		//seta o dia, mês (Janeiro é 0) e ano
		dtInicial.setDate(dia);
		dtInicial.setMonth(mes -1);
		dtInicial.setFullYear(ano);
		
		// A partir da data inicial + 40 horas (equivalente a 8horas por dia * 5 dias = 40 horas )
	    var obj      = hAPI.calculateDeadLineHours(dtInicial, 50000, prazoHoras, calendario); // retorna [Ljava.lang.Object;@3710124b
	    var dt       = obj[0]; //retorna Tue Oct 30 12:00:01 BRST 2018
	    //var segundos = obj[1]; //retorna 43201
		
	    log.info(dt);

	    hAPI.setDueDate(getValue("WKNumProces"), 0, colleagueId, dt, horario);	

	    return dt;

	}


}