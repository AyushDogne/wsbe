var express = require('express');
var app = express();
const bodyParser = require("body-parser")
const cors = require("cors");
const db = require ("./Config/Db");
// const addUser = require('./Controlar');
const {addUser,getUserData,updateData,deleteData} = require('./Controlar');



var server = app.listen(8081, function () {
    var port = server.address().port
    console.log("hello , the node server is listening to http://localhost:%s", port);
})

db()

app.use(cors());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.get("/getUserData", async function(request,response)
    {
        let getData = await getUserData()
        response. status(200).json({
            message:"Success",
            data:getData
        })
    })

app.post('/addUserRegistar', async function (req, res) 
{
  const {name,number,email,password}=req.body

  if (!name || !number || !email || !password)
    {
        $response = {
            'success': "false",
            'message': "Please check the request and params!",
        };
        res.status(400).json($response);
        console.log("if part 1"); 
    }
    else if(name.trim()==="" || number.trim()==="" || email.trim()==="" || password.trim()==="")
    {
        $response = {
            'success': false,
            'message': "Please check the request and params!"
    };
        res.status(400).json($response);
        console.log("if esle  part 2");

    }
    else if(name&& number && email && password)
    {
            let UserData = await addUser(
                {
                    name:name,
                    email:email,
                    number:number,
                    password:password,
                })
        $response =
        {
            'success': true,
            'message': "Successfully added the userData details!",
            data:UserData
        }
        res.status(200).json($response);
        console.log("if esle  part 3");
    }  

    else {
        $response = {
            'success': false,
            'message': "Server issue occurred, please try again sometime later!"

        };
        res.status(500).json($response);
        console.log("if esle  part 2");

    }
    console.log(req.body);
    
})


app.post('/userLogin', async function (req, res) 
{
  const {email,password}=req.body

  if ( !email || !password)
    {
        $response = {
            'success': "false",
            'message': "Please check the request and params!",
        };
        res.status(400).json($response);
        console.log("if part 1"); 
    }
    else if(email.trim()==="" || password.trim()==="")
    {
        $response = {
            'success': false,
            'message': "Please check the request and params!"
    };
        res.status(400).json($response);
        console.log("if esle  part 2");

    }
    else if(email && password)
    {
            let UserData = await addUser(
                {
                   
                    email:email,
                    password:password,
                })
        $response =
        {
            'success': true,
            'message': "Successfully added the userData details!",
            data:UserData
        }
        res.status(200).json($response);
        console.log("if esle  part 3");
    }  

    else {
        $response = {
            'success': false,
            'message': "Server issue occurred, please try again sometime later!"

        };
        res.status(500).json($response);
        console.log("if esle  part 2");

    }
    console.log(req.body);
    
})


// ==================Journal APIs


app.post('/addJournal', async function (req, res) 
{
  const {title,content,mood,date}=req.body

  if (!title || !content || !mood ||!date)
    {
        $response = {
            'success': "false",
            'message': "Please check the request and params!",
        };
        res.status(400).json($response);
        console.log("if part 1"); 
    }
    else if(title.trim()==="" || content.trim()==="" || mood.trim()==="" || date.trim()==="")
    {
        $response = {
            'success': false,
            'message': "Please check the request and params!"
    };
        res.status(400).json($response);
        console.log("if esle  part 2");

    }
    else if(title && content && mood && date)
    {
            let UserJoural = await addUser(
                {
                    title:title,
                    content:content,
                    mood:mood,
                    date:date
                })
        $response =
        {
            'success': true,
            'message': "Successfully added the userData details!",
             data:UserJoural
        }
        res.status(200).json($response);
        console.log("if esle  part 3");
    }  

    else {
        $response = {
            'success': false,
            'message': "Server issue occurred, please try again sometime later!"

        };
        res.status(500).json($response);
        console.log("if esle  part 2");
    }
    console.log(req.body);
})


app.put("/editSauda", async (req, res) => {
    try {    
        const { id, title, content, mood, date } = req.query;
        let getData = await getUserData(id);
        console.log("getData",getData.id);


        if (!id || !title || !content || !mood) {
            return res.status(400).json({
                success: false,
                message: "Please check the request and params!"
            });
        }

        if (getData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No sauda exists in the list!"
            });
        }

        const dataIndex = getData.findIndex(_id => _id._id.toString() === id.trim());

        if (dataIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Sauda ID not found!"
            });
        }

        const updatedData = {
            title: title.trim(),
            content: content.trim(),
            mood: mood.trim(),
            date: new Date().toLocaleString()
        };

        const updatedSauda = await updateData(id, updatedData);

        return res.status(200).json({
            success: true,
            message: "Successfully updated the Sauda details!",
            data: updatedSauda
        });
    } catch (error) {
        console.error("Error updating sauda:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
});


app.delete('/deleteCustomer/:id', async (req,res)=>{
   
    const JournalID= req.params.id
    const JournalIdex = getData.findIndex(item => item._id.toString() === JournalID);

    if(customerIndex !== -1)
    {
        getData.splice(JournalIdex,1)
        res.status(200).json
        ({success:true,
        message:"Successfully deleted customer!"})
    }
    else{
        res.status(400).json
        ({success:false,
        message:"Please check the request and params"})
    }
    }
)


// app.delete('/deleteCustomer', async (req, res) => {
//     try {
        

//         // Fetch data by ID to check if it exists
//         let getData = await getUserData(); // Assuming this fetches all data
//         console.log("Customer data:", getData);

//         // Check if customer with this ID exists
//         const customerIndex = getData.findIndex(item => item._id.toString() == req.params.id);
//         console.log("req.params.id : ", req.params.id);
//         console.log(getData.data.id);
        
        
        

//         if (customerIndex === -1) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Customer not found!"
//             });
//         }

//         // Delete customer from MongoDB
//         await deleteData(id); // Assuming deleteData function handles deletion by ID in the database

//         res.status(200).json({
//             success: true,
//             message: "Successfully deleted customer!"
//         });
//     } catch (error) {
//         console.error("Error deleting customer:", error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error!"
//         });
//     }
// });





module.exports = app;
