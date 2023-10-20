//express é um framework
//Criando Um servidor!.
const { response } = require("express"); 
const { request } = require("express"); 
const uuid = require('uuid');
const express = require("express"); 
const port = 3000;
const app = express(); 
app.use(express.json()); 
//   MIDDLEWARE    => INTERCEPTADOR    => TEM O PODER DE PARAR OU ALTERAR DADOS DE UMA REQUISICAO
// MIDDLEWARE é uma funçao com tres parametros (requests, response, next)
const users = [] 
const checkUserId = (request,response,next) =>{
  const { id } = request.params //esta pegando do put e do delete
  const index = users.findIndex(us => us.id === id)
 
  if(index < 0){
    console.log(`Posiçao nao encontrada ${index}`)
  }
  /*POdemos criar objetos (camin) e valores de request*/
  request.userIndex = index;
  request.userId = id
  next() // Pula para fora dessa funçao termina de ler todo codigo a baixo de onde foi declado o 'use' e depois volta para esta funcao e termina de ler ela. 
}
/*const myFirstMiddleware = (request,response,next) =>{
  console.log('Fui Chamado')
  next() //Faz continuar a aplicaçao primeiro depois continua o codigo de baixo dessa funcao.
  console.log('aplicaçao finalizada')
} */
app.use(checkUserId)

app.get('/users', (request,response) => { 
  console.log('A rota foi chamada')
  return response.json(users)
})
app.post('/users', (request,response) => { 
  const { name, age } = request.body
  try{ //Ele tenta try mas se nao der ele pula para o catch() SEM travar o servidor!!
    if(age < 18) throw new Error("A mensagem que vai aparecer e essa") // throw new Error Faz Acontecer um erro propositalmente Fazendo Executar o 'catch' em seguida
  const user = {id:uuid.v4(), name, age }
  users.push(user) 
  return response.status(201).json(user)
  //500 erro do serve
  } catch(err) {  // catch(err) json(err.message) Exibe mensagem de erro que aparece. err "armazena" esse erro
    return response.status(500).json(err.message) // catch(err) json(err.message) Exibe mensagem de erro que aparece.
  }finally{ //finally é executado sempre que catchou try termina
    console.log('finaly')
  }
})
  
app.put('/users/:id', checkUserId , (request,response) => { 
  const { name,age } = request.body 
  const index = request.userIndex
  const id = request.userId
  const updateUsers = {id, name , age }
  users[index] = updateUsers
  return response.json(updateUsers) 
})
app.delete('/users/:id', checkUserId, (request,response) => { //Podemos pegar configuracoes de outras funçoes que estao como parametro dessa funcao e enviar 
  const index = request.userIndex
  users.splice(index,1); //apilce(posiçao,1=elemina so ele 2 ou mais elimina o do lado)
  return response.status(204).json()
})











app.listen(port, () => {
  console.log(`🚀 Server started ${port}`)
})
