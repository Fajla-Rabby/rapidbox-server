const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId,  } = require('mongodb');
const query = require('express/lib/middleware/query');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware  
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://rapidbox:Ohf1eUsz5SAuD3Hl@cluster0.kccqe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const toolscollection = client.db('rapidbox').collection('tools');
    const orderscollection = client.db('rapidbox').collection('orders');

    app.get('/tools', async (req, res) => {
      const query = {};
      const cursor = toolscollection.find(query);
      const tools = await cursor.toArray();
      res.send(tools);
    });

    app.get('/orders', async (req, res) => {
      const query = {};
      const cursor = orderscollection.find(query);
      const orders = await cursor.toArray();
      res.send(orders);
    });

    app.get('/tools/:id', async(req, res)=>
    {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const tools = await toolscollection.findOne(query);
      res.send(tools);
    });

    //POST
    app.post('/tools', async(req, res) =>
    {
      const newTools = req.body;
      const result = await toolscollection.insertOne(newTools);
      res.send(result);
    })

    //POST
    app.post('/orders', async(req, res) =>
    {
      const orders = req.body;
      const result = await orderscollection.insertOne(orders);
      res.send(result);
    })
  }

  finally {

  }
}

run().catch(console.dir);


run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('running tools server');
})

app.listen(port, () => {
  console.log('listening to port', port);
}
)