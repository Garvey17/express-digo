import express from 'express'

const app = express()


const port = 3000

app.use(express.json())

let teaData = []
let nextId = 1

// crud operations

//add a new tea
app.post('/teas', (req, res) => {
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

// get a single tea
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
       return res.status(404).send( `tea Not found`)
    }
    res.status(200).send(tea)

})

//update tea

app.put('/tea/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    
    if (!tea) {
        return res.status(404).send('Tea not found');
    }
    
    const { name, price } = req.body;
    
    // Update only the fields that were provided in the request
    if (name !== undefined) {
        tea.name = name;
    }
    if (price !== undefined) {
        tea.price = price;
    }
    
    res.status(200).send(tea);
});

//delete tea

app.delete('/tea/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('tea not found')
    }
    teaData.splice(index, 1)
    res.status(200).send('deleted')
})

// app.get("/", (req, res) => {
//     res.send("hello from ade!")
// })
// app.get("/ice-tea", (req, res) => {
//     res.send("what ice tea would you prefer?")
// })
// app.get("/twitter", (req, res) => {
//     res.send("@officialmade_")
// })


app.listen(port, () => {
    console.log(`server is listenign at port ${port}`);
    
})