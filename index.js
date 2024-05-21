const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

// const jwtVerify = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   // console.log(authorization)
//   if (!authorization) {
//     return res.status(401).send({ error: true, message: "Unauthorized " });
//   }

//   const token = authorization.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
//     if (err)
//       return res.status(403).send({ error: true, message: "Unauthorized" });
//     req.decoded = decoded;
//     next();
//   });
// };

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ub65wqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
   client.connect();

    const allCourse = client.db("summerCampDB").collection("classes");
    const allInstructors = client.db("summerCampDB").collection("instructor");

    // app.post("/jwt", (req, res) => {
    //   const user = req.body;
    //   const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
    //     expiresIn: "1d",
    //   });
    //   res.send(token);
    // });
    app.get("/courses", async (req, res) => {
      const result = await allCourse.find().toArray();
      res.send(result);
    });
    app.get("/courses/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const resutl = await allCourse.findOne(query);
      res.send(resutl);
    });
    app.get("/instructor", async (req, res) => {
      const result = await allInstructors.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Summer School Server is running");
});

app.listen(port, () =>
  console.log(`Summer School server is running on Port: ${port}`)
);
