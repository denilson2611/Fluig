function afterProcessFinish(processId){
	
	var nrAtividade  = getValue("WKNumState");
	var nrSolic      = getValue("WKNumProces");
	
	log.info("==================================");
	log.info("evento: afterProcessFinish");
	log.info("==================================");
	log.info("WKDef: " + getValue("WKDef"));
	log.info("processId: "      + processId.toString());
	log.info("nrAtividade: "    + nrAtividade.toString());
	log.info("nrSolic: "        + nrSolic);

	//=============================================================================================
	// Rotina padrão: 
	//=============================================================================================
    var aux = fnBuscarDataHora('data'); //retorna dd/mm/aaaa
    aux = aux.split('/');
	hAPI.setCardValue("dtFimSolic"	, fnBuscarDataHora('data')); //grava dd/mm/aaaa
	hAPI.setCardValue("dtFimSolic_EN"	, aux[2] + '-' + aux[1] + '-' + aux[0]); //grava aaaa-mm-dd
	hAPI.setCardValue("hrFimSolic"  , fnBuscarDataHora("hora"));
	hAPI.setCardValue("situacaoSolic"    , "Finalizado");
}