const rp = require('request-promise');
const potusParse = require('./parser');
const cheerio = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';


console.log(getPapersList());

function getPaper (ID){

  var paperOptions = {
      method: 'GET',
      uri: 'http://www.paperandpeople.com/cerca/dett_carta.php',
      form: {
          // Like <input type="text" name="name">
          id: ID
      },
      headers: {
          /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
      }
  };

  rp(paperOptions, (error, response, html)=>{
    //const $ = cheerio.load(html);

  // console.log($('#primo > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1)').html());

  });

}

function getPapersList(){

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

  rp(listOptions, (error, response, html)=>{
    const $ = cheerio.load(html);
    const carte = [];

    

    $('#myTable tr').each(function(index, element){
      const $element = $(element);
      const $id = $element.attr('id');
      const $linkRow = $element.find('td a');

      //CARTIERA
      const $cartiera = $linkRow.eq(0).text();
      //NOME
      const $nome = $linkRow.eq(1).text();
      //URL
      const $url = $linkRow.eq(1).attr('href');

      const $resp = getPaper($id);

      const paper = {

        id : $id,
        cartiera: $cartiera,
        nome: $nome,
        url: $url,
        resp: $resp

      };

      
      carte.push(paper);

      
    });

    return carte;
  });

}


  /*
  <tr valign="middle" style="text-align:center;" class="lista_1" id="1256">
    <td style="text-align:left;">
      <a href="cart/arjo wiggins.html">Arjo wiggins</a>
    </td>
    <td style="text-align:left;">
      <a href="dett_carta.php?id=1256">Curious skin</a>
    </td>
    <td>
      <a href="cerca_busta.php" target="_blank" title="Questa carta ha buste" alt="Questa carta ha buste">
        <img src="paper_files/busta.gif" border="0">
      </a>
    </td>
    <td>Viola</td>
    <td>270</td>
    <td>100</td>
    <td>Effetti speciali</td>
    <td style="text-align:center">Tatto morbido</td>
  </tr>
  */