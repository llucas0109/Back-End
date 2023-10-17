//express é um framework
//Criando Um servidor!.
const { response } = require("express"); //responde
const { request } = require("express"); //faz a requiziçao
const express = require("express"); //riquere("express") faz uma requiziçao da biblioteca express
const port = 3000;
//http://localhost:3000/users?name=Lucas&age=20 > ?name=Lucas&age=20 é uma requisiçao feita pelo front end.
const app = express(); //express é uma funçao deve se usado ()

/*
  GET           => BUSCAR INFORMACOES NO BACK-END
  POST          => CRIAR INFORMACOES NO BACK-END
  PUT / PATCH   => ALTERAR OU ATUALIZAR INFORMACOES NO BACK-END
  DELETE        => DELETAR INFORMAÇOES DO BACK END
*/
//app.get('Nome da rota',Uma funcao())
app.get('/users/:id', (request,response) => { // express tem um param :id que Permite colocar dados Diferentes de ':id' na rota.

  const { id } = request.params
  console.log(id)
  
  /*
  const name = request.query.name // 'request.query.name' é a uma requisicao de envio ou seja ele envia dados.
  const age = request.query.age // query é os dados. ?name=Lucas&age=20
  */

  const { name,age } = request.query //Atribui valor as variaveis dentro das chaves caso encontre os mesmos nomes em query.
  //json faz a comunicacao entre front e back back front
  return response.json({ name, age })//traduzimos a response para ser lida como um arquivo json
  //Quando o nome da propridade de um objeto e o valor sao o mesmo entao podemos abrevear colocando um nome sem valor e sem os :.
})

app.listen(port, () => { //listen Determina qual porta vai ser usada
  console.log(`🚀 Server started ${port}`)
})
