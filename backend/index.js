const express = require('express');
const cors = require('cors');
const app = express();
require('./db/config')
const Tranc = require('./db/Tranc')

app.use(express.json());
app.use(cors());

const port = '5000';
app.get('/',(req,res)=>{
    res.status(200).send("This is here")
})

//creating api here ref = https://drive.google.com/file/d/1EWIwgu3PktuSixKcturVMF3Wi-T_j7ou/view
const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";



app.post("/add-data", async (req, res) => {
    let data = await fetch(url);
    data = await data.json();
    
    var retrive_Data = [];
    Tranc.find()
    .then((result)=>{
        // if we add more data to backend suppose 60 more entry we got 120 next time data has 60 length and 60 not equal to 120 
        // we have to update that logic
        retrive_Data = result;
      for(let i = 0;i<data.length;i++)
        {
            data[i].page = Math.floor(data[i].id/10)+1;
        }

        if(retrive_Data.length===0)
            {
                Tranc.create(data)
              .then((result) => {
                 res.status(201).send(result)
                     })
                   .catch((err) => {
                              res.status(500).send(err);
                    })
            }
            else{
                res.send("data exist")
            }
 

    })
    .catch((err)=>{
        console.log(err);
    })
})



app.get('/getByMonth',async (req,res)=>{
    if(!req.body) {
        res.status(500).send("req error");
    }
   const stMonth = new Date(req.body.year,req.body.month,1);
   const edMonth = new Date(req.body.year,req.body.month+1,1);

    var data =await Tranc.find({"dateOfSale": {"$gte":stMonth, "$lte": edMonth}})
    try {
        if(data.length!=0)
            {
                res.status(200).send(data);
            }else res.status(201).send("No transaction available")
    } catch (error) {
        res.status(500).send("server error");
    }
    
})
app.get('/getByPage',async (req,res)=>{
    if(!req.body) {
        res.status(500).send("req error");
    }
    var data =await Tranc.find({page:req.body.page})
    try {
        if(data.length!=0)
            {
                res.status(200).send(data);
            }else res.status(201).send("No transaction available")
    } catch (error) {
        res.status(500).send("server error");
    }
})


app.get('/stat',async (req,res)=>{
    if(!req.body) {
        res.status(500).send("req error");
    }
   const stMonth = new Date(req.body.year,req.body.month,1);
   const edMonth = new Date(req.body.year,req.body.month+1,1);

    var data =await Tranc.find({"dateOfSale": {"$gte":stMonth, "$lte": edMonth}})


    try {
        if(data.length!=0)
            {
                  var total_amount = 0;
                  var total_sold = 0;
                  var total_unSold = 0;
                  for(let i = 0;i<data.length;i++)
                    {
                        if(data[i].sold)
                            {
                                total_sold = total_sold+1;
                                total_amount += data[i].price;
                            }else{
                                total_unSold = total_unSold+1;
                            }
                    }

                res.status(200).send({total_amount:total_amount,total_sold:total_sold,total_unSold:total_unSold});
            }else res.status(201).send("No transaction available")
    } catch (error) {
        res.status(500).send("server error");
    }
    
})



app.get('/bar',async (req,res)=>{
    if(!req.body)
        {
        res.status(500).send("req error");
        }

        const stMonth = new Date(req.body.year,req.body.month,1);
   const edMonth = new Date(req.body.year,req.body.month+1,1);

    var data =await Tranc.find({"dateOfSale": {"$gte":stMonth, "$lte": edMonth}});

    try {
        var result = [0,0,0,0,0,0,0,0,0,0]
        if(data.length!=0)
            {
                for(let i = 0;i<data.length;i++)
                    {
                        let prc = data[i].price;
                        if(prc>=0 && prc<= 100)
                            {
                                let prev = result[0];
                                result[0] = prev+1;
                            }
                         else if(prc>=101 && prc<= 200)
                            {
                                let prev = result[1];
                                result[1] = prev+1;
                            }
                            else if(prc>=201 && prc<= 300)
                                {
                                    let prev = result[2];
                                    result[2] = prev+1;
                                }else if(prc>=301 && prc<= 400)
                                    {
                                        let prev = result[3];
                                        result[3] = prev+1;
                                    }
                                    else if(prc>=401 && prc<= 500)
                                        {
                                            let prev = result[4];
                                            result[4] = prev+1;
                                        }
                                        else if(prc>=501 && prc<= 600)
                                            {
                                                let prev = result[5];
                                                result[5] = prev+1;
                                            }
                                            else if(prc>=601 && prc<= 700)
                                                {
                                                    let prev = result[6];
                                                    result[6] = prev+1;
                                                } 
                                                else if(prc>=701 && prc<= 800)
                                                    {
                                                        let prev = result[7];
                                                        result[7] = prev+1;
                                                    }
                                                    else if(prc>=801 && prc<= 900)
                                                        {
                                                            let prev = result[8];
                                                            result[8] = prev+1;
                                                        }
                                                        else
                                                            {
                                                                let prev = result[9];
                                                                result[9] = prev+1;
                                                            }

                                                            
                    }
                    res.status(200).send({result:result});

            }else{
                    res.status(201).send({result:result});
            }
        
    } catch (error) {
        res.status(500).send("server error");
        
    }
})





app.get('/pie',async(req,res)=>{

    if(!req.body)
        { 
            res.status(500).send("req error");
        }
        
        const stMonth = new Date(2018,req.body.month,1);
   const edMonth = new Date(2030,req.body.month+1,1);

    var data =await Tranc.find({"dateOfSale": {"$gte":stMonth, "$lte": edMonth}});
       
      
    try {
        if(data.length!=0)
            {
                var categ = {}; 
                  
                for(let i = 0;i<data.length;i++)
                    {
                           if(categ[data[i].category]){
                            categ[data[i].category]++;
                           }else{
                            categ[data[i].category] = 1;
                           }
                    }
                    
                    res.status(200).send({categ:categ});

            }else{
                res.status(200).send("no transaction available")
            }
        
    } catch (error) {
        res.status(500).send("server error");
        
    }

    
})









app.listen(port, (req, res) => {
    console.log("server is running");
})