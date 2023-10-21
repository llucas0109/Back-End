
class person { //forma
    constructor(name,age){ //executa automaticamente o codigo dentro dele toda vez que person for declarada(instanciada).
        console.log('instanciado',name,age)
        this.name = name; 
        this.age = age;
    }
tal() { //tal é um methodo da classe
    console.log(this.name,this.age) //this para algo fora do metodo mas dentro de uma classe ou funcao ou objeto...
}}
// declaramos os parametros do contructor na class. e usamos this para definir os parametros do contructor em relacao ao da class
const bolo = new person('Lucas',18) //  new person() Cria uma nova class identica e armazena em bolo(e declaramos ela). 
bolo.tal()
/*
bolo.name = "Londres"
bolo.age = 18
bolo.tal() 
*/