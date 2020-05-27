function gravaHistorico(form, atividade, histNovo, acao){
	
	//Limpa caracteres que podem dar problema.
	histNovo = replaceAll(histNovo,'#','');
	histNovo = replaceAll(histNovo,'"','');
	histNovo = replaceAll(histNovo,"'","");
	histNovo = replaceAll(histNovo,'>','');
	histNovo = replaceAll(histNovo,'<','');

	nome = fnBuscarColleague(getValue("WKUser"),"colleagueName");
	hist = fnBuscarDataHora('data') + " - " + fnBuscarDataHora('hora') + " - " + nome;

	//Inclui o resultado da acao, se for o caso
	if (acao != null && acao != ""){
		hist = hist + " - Situação: " + acao;
	}

	//Inclui o novo historico
	if (hist != null && hist != ""){
	    hist = hist + ' - ' + histNovo;
	}

	//Inclui nova linha
    hist = hist + '<br>';

    //Pega o historico anterior para adicionar se for o caso
	var histAnt = form.getValue("histAtiv_" + atividade);
	if (histAnt != null && hist != ""){
	    histNovo = hist + histAnt;
	}
	
	form.setValue("histAtiv_" + atividade, histNovo);	

	//======================================================================================
	//Rotina padrão para pegar o historico da atividade atual e atualizar no historico geral
	//======================================================================================
	descricao = '*** Atividade não mapeada ***';
	if(atividade == 4)  { descricao = '1-Início'; }
	if(atividade == 5)  { descricao = '2-Avaliar Solicitação'; }
	if(atividade == 9)  { descricao = '3-Executar'; }
	if(atividade == 17) { descricao = '4-Notificar'; }

	// A variavel hist guarda o seguinte registro:
	// 05/12/2018 - 13:22 - Denilson da Silva - Situação: Reprovado - Motivo: 10-Documento inexistente - Observação: obs1<br>
	// O objetivo é colocar, apos a data, a descrição da atividade

	aux = hist.replace(' - ','§<b>Atividade ' + descricao + ' : </b>§') + '§2';

	// Vai ficar assim:
	// 05/12/2018§<b>Atividade: 2-Liberar Pedido</b>§13:22 - Denilson da Silva - Situação: Reprovado - Motivo: 10-Documento inexistente - Observação: obs1<br>§

	form.setValue("histGeral", aux + form.getValue("histGeral"));
}

function replaceAll(texto, arg1, arg2 ) {
	while (texto.indexOf(arg1) != -1) {
		texto = texto.replace(arg1, arg2);
	}
	return texto;
}