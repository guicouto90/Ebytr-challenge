# Ebytr-challenge

## Sobre o projeto:
O projeto é um todolist, onde é possível adicionar uma nova tarefa, editar o status dela, e deletar uma tarefa espefica. O projeto tem duas pastas, uma que é referente ao Frontend e outra referente ao Backend.

### Como utilizar:
Bastar clonar o repositório e instalar suas dependencias com o comando NPM INSTALL.

### Tecnologias utilizadas:
- React;
- NodeJs;
- Express Framework;
- MongoDB;

### Backend:
No backend temos as seguintes rotas com os seguintes métodos HTTP:
- GET('/tasks'): Nessa rota é possível listar todas as tarefas cadastradas com os seu status e também com a data que foi criada;
- POST('/tasks'): Nessa rota é para criar novas tarefas, e segue o seguinte modelo:
```json
  {
    task: string, e é obrigatória,
    status: string, é obrigatória, e tem que ter os nomes 'em andamento', 'pendente' ou 'terminado',
    created: string com data, porém no backend não é obrigatoria, pois esse dado já vem automatico do frontend,
   }
```
- PUT('/tasks/:id'): Nessa rota é possivel alterar somente o status da tarefa, e esse campo segue o mesmo padrão de quando se cria uma tarefa. É necessario passar o id da tarefa para altera-la.
- DELETE('/tasks/:id'): Nessa rota é possivel deletar uma tarefa, passando o seu id como parametro.

### Frontend:
O frontend é bem básico, onde possui apenas um input de texto, com um botao de adicionar. Assim que uma nova tarefa é adicionada, ela vem com um select para alterar o tipo de status, e tambem um botao para deletar a tarefa.

### Proximos passos:
Frontend: CSS para estilizar melhor a página, aumentar a cobertura de testes, ordenar as tarefas por nome da tarefa, data ou status. Fazer o deploy do projeto e componentizar melhor o projeto.
Backend: Melhorar a cobertura de testes com testes unitários, melhorar um pouco as regras de negocio e utilizar socket.io. Fazer o deploy do projeto.
