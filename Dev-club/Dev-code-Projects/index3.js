//express é um framework
//Criando Um servidor!.
const { response } = require("express"); 
const { request } = require("express"); //request Extrai dados solicitados
const uuid = require('uuid'); //Importanto a biblioteca uuid
const express = require("express"); 
const port = 3000;
const app = express(); 
//express.json() determina que o padrao de troca de dados sera em json
app.use(express.json()); // 'use' determina o que vai ser usado como padrao de uso no servidor express. 

const users = [] //Nunca se usa um array aqui assim.
/*response e request São Responsaveis Permitir a Comunicaçao entre back-end e front-end onde front-end faz a requst e back-end faz a response */
app.get('/users', (request,response) => { 
  return response.json(users)
})
app.post('/users', (request,response) => { 
  const { name, age } = request.body
  const user = {id:uuid.v4(), name, age }
  users.push(user) //push envia para o final do array o valor de user
  return response.status(201).json(user)
})
// 'const {param1:26, param2:35}' Quando Somente um objeto sozinho,Chamamos cada Propriedade separadamente com seus valores sabendo que seram const.   
app.put('/users/:id', (request,response) => { // :id é metodo param
  const { id } = request.params // 'params' acessa os dados que as rotas possuiem
  const { name,age } = request.body //O body Seria o corpo A area json por exemplo
  const updateUsers = {id, name , age }

  const index = users.findIndex( us => us.id === id )  //findIndex Dá a posiçao no arry que esta o item
  //quando ele nao encontra informaçao ele manda -1
  console.log(index)
  if(index < 0) {
    return response.status(404).json({mensage:'Id nao encontrado'})
  }
  users[index] = updateUsers
  return response.json(updateUsers) //vai escrever no body
})
app.delete('/users/:id', (request,response) => { 
  const { id } = request.params
  const index = users.findIndex(us => us.id === id) //findIndex funciona igualao map e filter o valor do array vai ára variavel dentro dos parenteses  e temos que devolver um teste logico de true ou false se false ele continua ate acaba se true ele para, e determinamos o valor do index.
  users.splice(index,1); // users.splice(Index do array, Numero de itens a ser deletado)
  return response.status(204).json()
})











app.listen(port, () => {
  console.log(`🚀 Server started ${port}`)
})
