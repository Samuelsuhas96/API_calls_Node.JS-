const req = require('request');
const app = require('express')();
let data = [];
let userspecific_data={};
let user_id_specific_data = "";

// Getting todos from the external API
app.get('/todos', (request, res) => {
    req.get("https://jsonplaceholder.typicode.com/todos", (error, response, body) => {
    if(error) {
        return console.log(error);
    }
    // console.log(JSON.parse(body));
    // JSON array of objects
    data = JSON.parse(body)

    // deleting userId from 
    for(let i = 0; i < data.length; i++)
    {
        delete data[i].userId;
    }

    });
    // console.log(data[100]);
    res.send(data);
  });


//   Combining a user's information with their todos based on userId
app.get('/todos/users/:userId', (request, res) => {
    let todos=[];
    //extracting the userid from the request parameters
    user_id_specific_data =  request.params.userId;
    let a = parseInt(request.params.userId);
    // console.log(typeof a);

    //extracting the todos containing the given userId
    req.get("https://jsonplaceholder.typicode.com/todos", (error, response, body) => {
        if(error) {
            return console.log(error);
        }
        // console.log(JSON.parse(body));
        data = JSON.parse(body)

        for(let i = 0; i < data.length; i++)
        {
            if (data[i].userId == a){
                    todos.push(data[i]);
            }
        }
    // console.log(todos);
    // res.send(todos);

    });
    req.get("https://jsonplaceholder.typicode.com/users/"+user_id_specific_data, (error, response, body) => {
        if(error) {
            return console.log(error);
        }
        // console.log(JSON.parse(body));
        userspecific_data = JSON.parse(body);
        console.log("user data received");

        // Appending the extracted todos of the given userId,
        // to the user information 
        userspecific_data["todos"] = todos;
        // user_id_specific_data.set("todos",todos);
        res.send(userspecific_data);
    });    
});


// For running the server
app.listen(3000, err => {
if (err) {
    console.log("there was a problem", err);
    return;
}
console.log("listening on port 3000");
});