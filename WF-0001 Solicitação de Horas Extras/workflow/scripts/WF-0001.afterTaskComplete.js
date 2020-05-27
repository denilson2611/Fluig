function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var nrAtividade  = getValue("WKNumState");
	var nrSolic      = getValue("WKNumProces");
	
	log.info("==================================");
	log.info("evento: afterTaskComplete");
	log.info("==================================");
	log.info("WKDef: " + getValue("WKDef"));
	log.info("colleagueId: "    + colleagueId);
	log.info("nextSequenceId: " + nextSequenceId.toString());
	log.info("userList: "       + userList);
	log.info("nrAtividade: "    + nrAtividade.toString());
	log.info("nrSolic: "        + nrSolic);
	
	//===========================================================================
	// Guardar o login do usuario, data e hora que finalizou a atividade
	//===========================================================================
	if(nrAtividade == 4)  { fnGuardaUsuario(nrAtividade); }
	if(nrAtividade == 5)  { fnGuardaUsuario(nrAtividade); }
	if(nrAtividade == 9)  { fnGuardaUsuario(nrAtividade); }
	if(nrAtividade == 17) { fnGuardaUsuario(nrAtividade); }

	//=========================================================================
	// Calcular os dias da atividade e guardar nos campos ocultos - inicia na 2
	//=========================================================================
	if(nrAtividade == 5)  { calculaDiasAtividade(nrAtividade); }
	if(nrAtividade == 9)  { calculaDiasAtividade(nrAtividade); }
	if(nrAtividade == 17) { calculaDiasAtividade(nrAtividade); }


	function fnGuardaUsuario(nrAtividade) {
		//===========================================================================
		// Guardar o login do usuario, data e hora que finalizou a atividade
		//===========================================================================
		aux = fnBuscarDataHora('data'); //retornar dd/mm/aaaa
		aux = aux.split('/');
		aux = aux[2] + "-" + aux[1] + "-" + aux[0] + " " + fnBuscarDataHora('hora');
		hAPI.setCardValue('vUserSpan_' + nrAtividade.toString(), colleagueId);  
		hAPI.setCardValue('vDateSpan_' + nrAtividade.toString(), aux);  //guarda no formato aaaa-mm-dd:hh:mm		
	}

}