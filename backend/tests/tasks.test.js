const chai = require('chai');
const sinon = require('sinon');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const { expect } = chai;
const { MongoClient } = require('mongodb');
const server = require('../index');

const { getConnection } = require('./connectionMock');

describe('POST /tasks', () => {
  let connectionMock;

  before(async() => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When a new task is registered', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/tasks')
        .send({
          task: "Make tests for project",
          status: "pendente",
          created: "16/02/2022"
        })
    });

    it('Return status 201', () => {
      expect(response).to.have.status(201);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return properties "_id", "task", "status", "created" in the body ', () => {
      expect(response.body).to.have.property('_id')
      expect(response.body).to.have.property('task')
      expect(response.body).to.have.property('status')
      expect(response.body).to.have.property('created')
    })
  });

  describe('When a there is no task property ', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/tasks')
        .send({
          status: "pendente",
          created: "16/02/2022"
        })
    });

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"task\" is required"', () => {
      expect(response.body.message).to.be.equals("\"task\" is required");
    });
  })

  describe('When task property is not a string type', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/tasks')
        .send({
          task: 1,
          status: "pendente",
          created: "16/02/2022"
        })
    });

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"task\" must be a string"', () => {
      expect(response.body.message).to.be.equals("\"task\" must be a string");
    });
  })

  describe('When a there is no status property ', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/tasks')
        .send({
          task: "Make tests for project",
          created: "16/02/2022"
        })
    });

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"status\" is required"', () => {
      expect(response.body.message).to.be.equals("\"status\" is required");
    });
  })

  describe('When status property is not a string type', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .post('/tasks')
        .send({
          task: "Make tests for project",
          status: 1,
          created: "16/02/2022"
        })
    });

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"status\" must be a string"', () => {
      expect(response.body.message).to.be.equals("\"status\" must be a string");
    });
  })
});

describe('GET /tasks', () => {
  let connectionMock;

  before(async() => {
  connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Get all taks registered', () => {
    let response;
    before(async ()=> {
      const tasksCollection = connectionMock.db('Ebytr').collection('tasks');
      await tasksCollection.insertOne({
        _id: "620d3cabf74b5a6c412a30ea",
        task: "Make tests for project",
        status: "pendente",
        created: "16/02/2022"
      });
      response = await chai.request(server)
        .get('/tasks')
    });

    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return an array in the body', () => {
      expect(response.body).to.be.an('array');
    });

    it('return properties "_id", "task", "status" and "created" in the body', () => {
      console.log(response.body);
      expect(response.body[1]).to.have.property('_id')
      expect(response.body[1]).to.have.property('task')
      expect(response.body[1]).to.have.property('status')
      expect(response.body[1]).to.have.property('created')
    });
  });
});

describe('PUT /tasks/:id', () => {
  let connectionMock;
  let id;
  before(async() => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When status property is updated', () => {
    let response;
    before(async () => {
      const tasksCollection = connectionMock.db('Ebtyr').collection('tasks');
      const { insertedId } = await tasksCollection.insertOne({
        task: "Code review on my React app",
        status: "pendente",
        created: "16/02/2020"
      })
      response = await chai.request(server)
        .put(`/tasks/${insertedId}`)
        .send({
          status: "em andamento",
        })
        id = insertedId;
    });

    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message"', () => {
      expect(response.body).to.have.property('message')
    });

    it('return a property "message" in the body, with the content: "Task with ${id} sucessfully updated', () => {
      expect(response.body.message).to.be.equals(`Task with ${id} sucessfully updated`);
    })
  });

  describe('When a there is no status property ', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .put(`/tasks/${id}`)
        .send({
        })
    });

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"status\" is required"', () => {
      expect(response.body.message).to.be.equals("\"status\" is required");
    });
  })

  describe('When status property is not a string type', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
        .put(`/tasks/${id}`)
        .send({
          status: 1232,
        })
    });

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"status\" must be a string"', () => {
      expect(response.body.message).to.be.equals("\"status\" must be a string");
    });
  })

  describe('When status property is different of "em andamento", "pendente" or "terminado" ', () => {
    let response;
    before(async () => {
      response = await chai.request(server)
      .put(`/tasks/${id}`)
        .send({
          status: "em andamentooo"
        })
    });

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"status\" must be equal to \"pendente\", \"em andamento\" or \"terminado\""', () => {
      expect(response.body.message).to.be.equals("\"status\" must be equal to \"pendente\", \"em andamento\" or \"terminado\"");
    });
  })
});

describe('DELETE /tasks/:id', () => {
  let connectionMock;
  let id;
  before(async() => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('When a task is deleted', () => {
    let response;
    before(async () => {
      const tasksCollection = connectionMock.db('Ebtyr').collection('tasks');
      const { insertedId } = await tasksCollection.insertOne({
        task: "Get better on React",
        status: "pendente",
        created: "16/02/2020"
      })
      response = await chai.request(server)
        .delete(`/tasks/${insertedId}`)
        id = insertedId;
    });

    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message"', () => {
      expect(response.body).to.have.property('message')
    });

    it('return a property "message" in the body, with the content: "Task with ${id} sucessfully updated', () => {
      expect(response.body.message).to.be.equals(`Task with ${id} sucessfully deleted`);
    })
  });
})