function afterCancelProcess(colleagueId,processId){
		
	log.info("==================================");
	log.info("evento: afterCancelProcess");
	log.info("==================================");
	log.info("WKDef: " + getValue("WKDef"));
	log.info("colleagueId: " + colleagueId);
	log.info("processId: "   + processId.toString());
	
	try{
		loading.setMessage("Cancelando solicitação...");
	} catch(e) {
		log.info("========= Erro ao executar LOADING ===========");
	}

	//=============================================================================================
	// Rotina padrão: Necessário gravar data fim para mostrar mensagem no formulário
	//=============================================================================================
    var aux = fnBuscarDataHora('data'); //retorna dd/mm/aaaa
    aux = aux.split('/');
	hAPI.setCardValue("dtFimSolic"	, fnBuscarDataHora('data')); //grava dd/mm/aaaa
	hAPI.setCardValue("dtFimSolic_EN"	, aux[2] + '-' + aux[1] + '-' + aux[0]); //grava aaaa-mm-dd
	hAPI.setCardValue("hrFimSolic"  , fnBuscarDataHora("hora"));
	hAPI.setCardValue("situacaoSolic"    , "Cancelado");

}