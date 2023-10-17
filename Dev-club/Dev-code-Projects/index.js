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

const users = [] 
const checkUserId = (request,response,next) =>{
  const { id } = Request.params
  const index = users.findIndex(us => us.id === id)
  if(index < 0) {
    return response.status(404).json({mensage:'Id nao encontrado'})
  }
  if(index < 0){
    console.log(`Posiçao nao encontrada ${index}`)
  }
  next() 
}
/*const myFirstMiddleware = (request,response,next) =>{
  console.log('Fui Chamado')
  next() //Faz continuar a aplicaçao primeiro depois continua o codigo de baixo dessa funcao.
  console.log('aplicaçao finalizada')
} */
app.use(myFirstMiddleware)

app.get('/users', (request,response) => { 
  console.log('A rota foi chamada')
  return response.json(users)
})
app.post('/users', (request,response) => { 
  const { name, age } = request.body
  const user = {id:uuid.v4(), name, age }
  users.push(user) 
  return response.status(201).json(user)
})
  
app.put('/users/:id', (request,response) => { 
  const { id } = request.params 
  const { name,age } = request.body 
  const updateUsers = {id, name , age }

  const index = users.findIndex( us => us.id === id )  
  console.log(index)
  if(index < 0) {
    return response.status(404).json({mensage:'Id nao encontrado'})
  }
  users[index] = updateUsers
  return response.json(updateUsers) 
})
app.delete('/users/:id', (request,response) => { 
  const { id } = request.params
  const index = users.findIndex(us => us.id === id) 
  users.splice(index,1); 
  return response.status(204).json()
})











app.listen(port, () => {
  console.log(`🚀 Server started ${port}`)
})
