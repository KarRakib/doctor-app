const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const stripe = require("stripe")('sk_test_51M63ypKYn4DrBUBdyzGgWS4dhzYot6w80dBlceUtQBfacZP3kb0emVD2wwWBA8xkk1RRnjl2W3wdJ6XRi1CUJCGE00GwrNtyGY');
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
// app.use(express.static("public"));
require('dotenv').config()

console.log(process.env.USER_NAME);

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster7.fzzeo8a.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJWT(req, res, next) {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(401).send('unauthorized access');
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
        console.log(err);
          return res.status(403).send({ message: 'forbidden access' })
      }
      req.decoded = decoded;
      next();
  })

}

async function run() {
  try {
    const servicesCollection = client.db('Doctor-app').collection('services')
    const reviewsCollection = client.db("Doctor-app").collection("reviews")
    const appointmentTimeCollection = client.db("Doctor-app").collection("appointment-time")
    const bookingCollection = client.db("Doctor-app").collection('booking')
    const userCollection = client.db("Doctor-app").collection('user')
    const doctorsCollection = client.db("Doctor-app").collection('doctors')


    const verifyAdmin = async (req, res, next) => {
      const decodedEmail = req.decoded.email;
      const query = { email: decodedEmail };
      const user = await userCollection.findOne(query);

      if (user?.role !== 'admin') {
          return res.status(403).send({ message: 'forbidden access' })
      }
      next();
  }
    app.get('/services', async (req, res) => {
      const query = {}
      const cursor = servicesCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    });
    app.get('/reviews', async (req, res) => {
      const query = {}
      const cursor = reviewsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/allusers', async (req, res) => {
      const query = {}
      const result = await userCollection.find(query).toArray()
      res.send(result)
    })
    app.get('/appointments', async (req, res) => {
      const date = req.query.time;
      const query = {}
      const appointments = await appointmentTimeCollection.find(query).toArray()
      const bookedQuery = { time: date };
      const alreadyBooked = await bookingCollection.find(bookedQuery).toArray()
      appointments.forEach(option => {
        const booked = alreadyBooked.filter(book => book.service === option.name)
        const bookedSlots = booked.map(book => book.slot)
        const remainingSlots = option.slots.filter(slot => !bookedSlots.includes(slot))
        option.slots = remainingSlots
      })
      res.send(appointments)
    })
    app.get('/payment/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await bookingCollection.findOne(query)
      res.send(result)
    })
    // app.get('/add-price', async (req, res) => {
    //   const filter = {}
    //   const options = { upsert: true }
    //   const updatedDoc = {
    //     $set: {
    //       price: 99
    //     }
    //   }
    //   const result = await appointmentTimeCollection.updateMany(filter, updatedDoc, options)
    //   res.send(result)
    // })
    app.get('/doctor-specialty', async (req, res) => {
      const query = {}
      const result = await appointmentTimeCollection.find(query).project({ name: 1 }).toArray()
      res.send(result)
    })
    app.get('/users/admin/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email }
      const user = await userCollection.findOne(query);
      res.send({ isAdmin: user?.role === 'admin' });
    })
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user)
      res.send(result)
    })
    app.delete('/users/admin/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await userCollection.deleteOne(query)
      res.send(result)
    })
    app.put('/users/admin/:id', verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) }
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await userCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    });
    app.get('/jwt', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
        return res.send({ accessToken: token });
      }
      res.status(403).send({ accessToken: '' })
    });
    app.get('/booking', verifyJWT, async (req, res) => {
      const email = req.query.email
      const emailDecoded = req.decoded.email
      console.log(email, emailDecoded);
      if (email !== emailDecoded) {
        return res.status(403).send({ message: 'not athoraized' })
      }
      const query = { email: email }
      const result = await bookingCollection.find(query).toArray()
      res.send(result)

    })
    app.post('/booking', async (req, res) => {
      const booking = req.body
      const query = {
        time: booking.time,
        email: booking.email,
        service: booking.service
      }
      const alreadyBooked = await bookingCollection.find(query).toArray()
      if (alreadyBooked.length) {
        const message = ` Your Already Booking this Service ${booking.time}`
        return res.send({ acknowledged: false, message })
      }
      const result = await bookingCollection.insertOne(booking)
      res.send(result)
    })
    app.post('/doctors', verifyJWT, async (req, res) => {
      const doctor = req.body
      const result = await doctorsCollection.insertOne(doctor)
      res.send(result)
    })
    app.delete('/doctors/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await doctorsCollection.deleteOne(query)
      res.send(result)
    })
    app.get('/doctors', verifyJWT, verifyAdmin, async (req, res) => {
      const query = {}
      const result = await doctorsCollection.find(query).toArray()
      res.send(result)
    })

    app.post("/create-payment-intent", async (req, res) => {
      const booking = req.body;
      const price = booking.price
      const amount = price*100
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        "payment_method_types": [
          "card"
        ]

      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
  }
  catch {

  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Doctor App is Running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/**
 *    const bookingQuery = { time: date }
      const alreadyBooked = await bookingCollection.find(bookingQuery).toArray()
      appointments.forEach(appoint => {
        const appointBooked = alreadyBooked.filter(book => book.service === appoint.name)
        const bookedSlots = appointBooked.map(book => book.slot)
        console.log(bookedSlots,'Allah', appointBooked);
      })
 * 
 */