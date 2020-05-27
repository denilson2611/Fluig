function afterProcessCreate(processId){
	
	var nrAtividade  = getValue("WKNumState");
	var nrSolic      = processId.toString();
	var matUsuario   = getValue("WKUser");

	log.info("==================================");
	log.info("evento: afterProcessCreate");
	log.info("==================================");
	log.info("WKDef: " + getValue("WKDef"));
	log.info("processId: "      + processId.toString());
	//log.info("nrAtividade: "    + nrAtividade.toString());
	log.info("nrSolic: "        + nrSolic);

	//=============================================================================================
	// Rotina padrão: 
	//=============================================================================================
	hAPI.setCardValue("nrSolic", nrSolic);	
    var aux = fnBuscarDataHora('data'); //retorna dd/mm/aaaa
    aux = aux.split('/');
	hAPI.setCardValue("dtAberturaSolic", fnBuscarDataHora('data')); //grava dd/mm/aaaa
	hAPI.setCardValue("dtAberturaSolic_EN", aux[2] + '-' + aux[1] + '-' + aux[0]); //grava aaaa-mm-dd
	hAPI.setCardValue("hrAberturaSolic", fnBuscarDataHora("hora"));
	hAPI.setCardValue("situacaoSolic"  , "Aberto");

}