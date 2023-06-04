// Create an express app
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())
app.listen(8000);

// Connect to the sqlite database
var sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database("/db/Northwind.db");

// Functions for each API endpoints are below.

app.get("/sample", (req, res) => {
    courseData = {
       message: "Just Some Sample Data",
       semester: "Spring 2022",
       classList: [
         {
           class: "COMP 256",
           time: "MWF 8:30",
           instructor: "Professor Braught"
         },
         {
           class: "COMP 492",
           time: "TF 1:30",
           instructor: "Professor Braught"
         }
       ]
    };

    res.json(courseData);
});

app.get("/customers/bycountry", (req, res) => {
    var country = req.query.country;
    var city = req.query.city;

    var sql = "SELECT CompanyName " +
              "FROM Customers " +
              "WHERE Country='" + country + "' AND city='" + city + "';";

    db.all(sql, [], (err, rows) => {
      if (err != null) {
        console.log("ERROR: " + err);
      }
      else {
        customerData = {
          name: "Customers by Country",
          country: country,
          city: city,
          count: rows.length,
          data: rows
        }

        res.json(customerData);
      }
    });
});

app.get("/orders/bycustomer", (req, res) => {
  var orderID = req.query.orderID;

  var sql = "SELECT Orders.OrderID " +
            "FROM Orders JOIN Customers " +
            "WHERE Customers.CompanyName='" + company + "';";

  db.all(sql, [], (err, rows) => {
    if (err != null) {
      console.log("ERROR: " + err);
    }
    else {
      orderData = {
        name: "Orders:",
        orderID: orderID,
        count: rows.length,
        data: rows
      }

      res.json(orderData);
    }
  });
});


// Default response for any endpoint other than those handled above.
app.use(function(req, res){
    res.status(404);  // Not Found.
});
