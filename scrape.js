const request = require('request');
const cheerio = require('cheerio');



var listOptions = {
	method: 'POST',
	uri: 'http://www.paperandpeople.com/cerca/cerca.php',
	form: {
	// Like <input type="text" name="name">
		nome: '',
		tipo: '-1',
		colore: '-1',
		gramm: '-1',
		busta_cor: 'N',
		stampa_laser: 'N',
		stampa_ink: 'N',
		cerca_hidden: '1'
	},
	headers: {
	/* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
	}
};

const papers = [];


request(listOptions, (error, response, html)=>{
	if(!error && response.statusCode == 200){
		const $ = cheerio.load(html);

	    $('#myTable tr').each(function(index, element){
	    	const el = $(element);
	    	const id = el.attr('id');

	    	if(id != undefined){
	    		//perform GET call
	    		papers.push(getPaper(id));
	    	}
	    });
	    //console.log(papers);
	}
});


function getPaper($id){
	var options = {
		method: 'GET',
		uri: 'http://www.paperandpeople.com/cerca/dett_carta.php?id='+$id,
	
	}
	request(options, (error, response, html)=>{
		if(!error && response.statusCode == 200){
			const table = cheerio.load(html);
			
			const cartiera = table('#primo > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)')
			const nome_carta = table('#primo > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)');
			const codice = table('#primo > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)');
			const colore = table('#primo > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(5) > td:nth-child(2)');
			const colore_effettivo = table('#primo > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(6) > td:nth-child(2)');
			const grammatura = table('#primo > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(7) > td:nth-child(2)');
			const min_ordinable = table('#primo > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(8) > td:nth-child(2)');
			const caratteristica1 = table('#primo > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(9) > td:nth-child(2)');
			const caratteristica2 = table('#primo > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(10) > td:nth-child(2)');
			const formato = table('#primo > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(11) > td:nth-child(2)');

			const paper = {
				"id": $id,
				"cartiera": cartiera.text(),
				"nome_carta": nome_carta.text(),
				"codice": codice.text(),
				"colore": colore.text(),
				"colore_effettivo": colore_effettivo.text(),
				"grammatura": grammatura.text(),
				"min_ordinable": min_ordinable.text(),
				"caratteristica1": caratteristica1.text(),
				"caratteristica2": caratteristica2.text(),
				"formato": formato.text()
			}
			
			console.log(paper);
		} else {
			console.log(error);
		}
	});
}