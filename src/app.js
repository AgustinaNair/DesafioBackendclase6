import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) => res.send('Bienvenidos'))

let products =[]
const {getProduct, addProduct, getProductById} = new ProductManager('./data.txt')

app.get('/products', async(req, res) => {
    const {limit} = req.query
    const result= await getProduct(limit)
    res.send(result)
})
app.get('/products/:pid', async(req, res) => {
    const {pid} = req.params
    const result = await getProductById(pid)
    res.send({status:'success', payload: result})
})

app.post('/products', async(req, res) => {
    const {title, description, price, thumbnail, code, stock} = req.body
    if(!title || !description || !price || !thumbnail || !code || !stock) return res.send({status: 'error', error: 'faltan datos'})
    
    const result = await addProduct(req.body)
    res.send({status: 'seccess', payload: result})
})


app.listen(8080, error =>{
    if(error) console.log(error)
    console.log('server escuchando en el puerto 8080')})


    // {
    //     "title":"producto prueba cambiado",
    //     "description":"Este es un producto cambiado de prueba", 
    //     "price":"222", 
    //     "thumbnail": "Sin imagen",
    //     "code":"abc12345", 
    //     "stock":"2545" 
    //  }