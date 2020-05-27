function beforeStateEntry(sequenceId){
	
	var nrAtividade  = getValue("WKNumState");
	var nrSolic      = getValue("WKNumProces");
	
	log.info("==================================");
	log.info("evento: beforeStateEntry");
	log.info("==================================");
	log.info("WKDef: " + getValue("WKDef"));
	log.info("sequenceId: "     + sequenceId.toString());
	log.info("nrAtividade: "    + nrAtividade.toString());
	log.info("nrSolic: "        + nrSolic);

	//=========================================================================================
	// Guardar a data de inicio da atividade para o calculo dos dias da atividade - inicia na 2
	//=========================================================================================
	if(nrAtividade == 5)  { fnGuardaDataInicio(nrAtividade); }
	if(nrAtividade == 9)  { fnGuardaDataInicio(nrAtividade); }
	if(nrAtividade == 17) { fnGuardaDataInicio(nrAtividade); }


	function fnGuardaDataInicio(atividade) {
		hAPI.setCardValue("vDataIniAtiv_" + nrAtividade.toString(), fnBuscarDataHora('data'));			
	}

}