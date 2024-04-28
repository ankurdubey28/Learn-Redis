import {client} from "./client";
import axios from "axios";
import express from 'express'

const app=express()




app.get('/todo',async (req,res)=>{


    const cached=await client.get('todos')
    if(cached) return res.json(JSON.parse(cached))

    const {data}=await axios.get('https://jsonplaceholder.typicode.com/todos')
    await client.set('todos',JSON.stringify(data))
    await client.expire('todos',15)
    console.log(data)
    res.json(data)
})

app.listen(3001)