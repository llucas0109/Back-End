const { response } = require("express");
const { request } = require("express");
const uuid = require("uuid");
const express = require("express");
const app = express()
app.use(express.json()) //faz o servidor reconhecer o arquivo json e usar

const pedidos = []
const middlewareTypeUrl = (request,response,next) =>{
  console.log(request.method,request.url)
  next()
}
app.use(middlewareTypeUrl)
const myMiddleware = (request,response,next) => {
  const { id } = request.params
  const index = pedidos.findIndex(us => us.id === id)
  request.userindex = index
  request.userid = id  // request.userid definindo userid como objeto de request
  next()
}
app.use(myMiddleware)
app.get("/users",(request,response) => {
    return response.send(pedidos)
})

app.post("/users",(request,response) =>{
  const {food,name,value} = request.body //ele verifica dentro de request.body tem os mesmos nomes que eles se sim clona os valore e cria uma const para cada Um.
  pedidos.push({id:uuid.v4(),food,name,value,estado:'EmPreparaçao'})
  return response.send()
})

app.put('/users/:id',myMiddleware,(request,response) => {
  const index = request.userindex
  const id = request.userid
  const {name,value,estado} = pedidos[index]
  pedidos[index] = {id,food:'agua',name,value,estado}
  return response.send(pedidos[index]);
})
app.delete('/users/:id',(request,response) => {
  const index = request.userindex
  pedidos.splice(index,1)//splice apaga(posiçao,quantidade'vizinhos')
  return response.send(pedidos)
})
app.get('/users/:id',myMiddleware,(request,response) => {
  const id = request.userid
  const index = request.userindex
  const verPedido = pedidos[index]
  return response.send(pedidos[index])
})
app.patch('/users/:id',myMiddleware,(request,response) => { 
  const id = request.userid
  const index = request.userindex
  const {name,value,food} = pedidos[index]
  pedidos[index] = {id,name,value,food,estado:'Pronto'} 
  return response.send()
})



app.listen(3000)