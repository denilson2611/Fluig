function validateForm(form){

	var WKNumState = getValue("WKNumState");
    var acaoUsuario = getValue("WKCompletTask"); //'true' = clicou em enviar  'false' clicou em salvar

	log.info('============================');
	log.info('=== validateForm-form_wf0016');
	log.info('============================');
	log.info(acaoUsuario);


	//Não valida se o usuário apenas Salvar
    if (acaoUsuario == 'false') { return;}

	sinal    = '<span style="color:red;" class="fluigicon fluigicon-remove fluigicon-xs"></span> ';
	mensagem = '';


	//===================================================
	//Campos da Atividade 4-inicio
	//===================================================
	if (WKNumState == 4 ) {
	
		if (form.getValue("txtDataRealizacao") == "") 	{ 
			mensagem += sinal + 'Informe o campo Data Realização.<br>';  
		}
		if (form.getValue("horaPrevIni") == "") 		{ mensagem += sinal + 'Informe a hora inicial.<br>';  }
		if (form.getValue("horaPrevFim") == "") 		{ mensagem += sinal + 'Informe a hora final.<br>';  }
		
		if (form.getValue("horaPrevIni") >= form.getValue("horaPrevFim") )	{ 
			mensagem += sinal + 'A Hora Final deve ser maior do que a Hora Inicial.<br>';  
		}

		if (form.getValue("txtDataRealizacaoDom") != 'S') 	{ 
			//Se a data de realização for domingo nao precisa validar
			if (form.getValue("txtDataCompensacao") == "") 	{ mensagem += sinal + 'Informe o campo Data Compensação.<br>';  }
		}

		if (form.getValue("txtReferencia") == "") 		{ mensagem += sinal + 'Informe o campo Referência.<br>';  }
		if (form.getValue("txtJustificativa") == "") 	{ mensagem += sinal + 'Informe o campo Justificativa.<br>';  }

		if (form.getValue("loginChefeUserEmNome") == "") { 
			mensagem += sinal + 'Não foi encontrado o chefe imediato do usuário Em Nome de ' + form.getValue("txtEmNome") + '.<br>';  
		}

	}

	//===================================================
	//campos da atividade 5-avaliar solicitação
	//===================================================
	if (WKNumState == 5 ) {
		if (form.getValue("h_rsDecisaoAvaliacao") == "")	{ mensagem += sinal + 'Informe o campo Decisão<br>'; }

		if (form.getValue("h_rsDecisaoAvaliacao") == "Reprovada") {
			if (form.getValue("cod_motivo") == "") { mensagem += sinal + 'Selecione o motivo.<br>';  }	
		}

		if (form.getValue("edObsDir") == "")   { mensagem += sinal + 'Informe o campo Observações<br>';  }
	}

	//===========================================
	//campos da atividade 9-executar
	//===========================================
	if (WKNumState == 9 ) {
		if (form.getValue("h_rsExecutado") == "")	{ mensagem += sinal + 'Informe o campo Decisão<br>'; }

		if (form.getValue("h_rsExecutado") == "Sim")	{ 
			if (form.getValue("txtDataExecucao") == "") { mensagem += sinal + 'Informe o campo Data Execução.<br>';  }
			if (form.getValue("horaRealIni") == "") 	{ mensagem += sinal + 'Informe a hora inicial.<br>';  }
			if (form.getValue("horaRealFim") == "") 	{ mensagem += sinal + 'Informe a hora final.<br>';  }

			if (form.getValue("horaRealIni") >= form.getValue("horaRealFim") )	{ 
				mensagem += sinal + 'A Hora Final deve ser maior do que a Hora Inicial.<br>';  
			}

		}

		if (form.getValue("edObsExecutado") == "")   { mensagem += sinal + 'Informe o campo Observações<br>';  }
	}

	//===================================================
	//campos da atividade 17-notificar
	//===================================================

	//Sem campos para validar

	if (mensagem != '') {
		throw "<b>Atenção!!</b><br><br>" + mensagem + "<br><br>";
	}

}