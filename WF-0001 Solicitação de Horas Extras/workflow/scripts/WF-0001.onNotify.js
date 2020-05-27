function onNotify(subject, receivers, template, params){
/*
	var nrAtividade   = getValue("WKNumState");
	var nrSolic       = getValue("WKNumProces");
	var proxAtiv      = getValue("WKNextState");
	var nrAtividadeAtual = getValue('WKCurrentState');

	log.info("==================================");
	log.info("evento: onNotify");
	log.info("==================================");
	log.info("WKDef: " 			+ getValue("WKDef"));
	log.info("nrAtividade: "    + nrAtividade.toString());
	log.info("proxAtiv: "       + proxAtiv.toString());
	log.info("AtivAtual: "      + nrAtividadeAtual.toString());
	log.info("nrSolic: "        + nrSolic);

	log.info("subject: "    	+ subject);
	log.info("receivers: "    	+ receivers);
	log.info("template: "    	+ template);
	//log.info("params: "    		+ params);

	//Ao notificar o atraso para o responsável dessa atividade a chefia imediata também receberá a notificação.
	if(nrAtividade == 16) { //16-Devolver	

	    //Se o template for qq um sobre atraso de tarefa
	    if (template.match("TPLOVERDUE_TASK_") != null) { 

    	    //Pegar o login da chefia imediata
    	    login = hAPI.getCardValue("loginChefeUserAberturaSolic");
    	    log.info("== notificar login= " + login);

    	    mail = fnBuscarColleague(login,"mail");
    	    log.info("== notificar mail= " + mail);

    	    if (mail != '' && mail != null) {    	    	
    	    	receivers.add(mail);
    	    }
    	}
    }
*/
}