const bot = document.getElementById('botao')
const select = document.getElementById('select')
//fetch acessa o local e pega seu dados.  
//async function
  async function click () { 
  //await faz o java script esperar  a resposta vir.
  const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(response => response.json()) //.then(response => response.json()) Assim que os dados recebidos ele converte tudo para um arquvo json. depois é armazenado na variavel que criamos 'data'.
  let dolar = data.USDBRL.high
  let euro = data.EURBRL.high
    const inumber = document.getElementById('inumber').value //.value para pegar somente o valor
    const Devalor = document.getElementById('De-valor')
    const Paravalor = document.getElementById('Para-valor')
    Devalor.innerHTML = inumber
    const moeda = document.getElementById('select').value //pega o valor do input
    if(moeda == 'Dolar Americano'){
    Paravalor.innerHTML = inumber / Number(dolar)
    }
    if(moeda == 'Euro'){
      Paravalor.innerHTML = inumber / Number(euro)
    }
}
bot.addEventListener("click",click)