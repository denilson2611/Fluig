//==================================================================================
// Objetivo: Gravar a data fim da atividade e calcular o numero total de dias
//==================================================================================
function calculaDiasAtividade(atividade){
	
	log.info("=== calculaDiasAtividade");

	var dif = 0;		
	var dataIniAtiv = hAPI.getCardValue("vDataIniAtiv_" + atividade);
	var dataFimAtiv = fnBuscarDataHora('data');
	var diasAtiv    = hAPI.getCardValue("vDiasAtiv_" + atividade);

log.info(dataIniAtiv);
log.info(dataFimAtiv);
log.info(diasAtiv);

	dataIniAtiv = dataIniAtiv.split("/");	
	var diaIni = dataIniAtiv[0];
	var mesIni = dataIniAtiv[1] - 1;
	var anoIni = dataIniAtiv[2];
	var dataIni = new Date(anoIni, mesIni, diaIni);

log.info(dataIni);
	
	dataFimAtiv = dataFimAtiv.split("/");	
	var diaFim = dataFimAtiv[0];
	var mesFim = dataFimAtiv[1] - 1;
	var anoFim = dataFimAtiv[2];
	var dataFim1 = new Date(anoFim, mesFim, diaFim);

log.info(dataFim1);
	
	dif = parseInt((dataFim1 - dataIni) / (1000 * 60 * 60 * 24));
	
log.info("=== calculaDiasAtividade dif: " + dif);
	
	if (diasAtiv != "") { dif = dif + parseInt(diasAtiv); }
	
log.info("=== calculaDiasAtividade dif: " + dif.toString());
	
	hAPI.setCardValue("vDiasAtiv_" + atividade, dif.toString());
	hAPI.setCardValue("vDataFimAtiv_" + atividade, fnBuscarDataHora('data'));	
}
