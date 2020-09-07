const express = require("express");
const app = express();
const axios = require("axios");

app.set("view engine", "ejs");

app.get("/",(req, res)=>{
	res.render("search");
});

app.get("/results", (req,res)=>{
	var query = req.query.search;
	console.log("Someone made a search for " + query + " movie.");
	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
	(async ()=>{
		try{
			const response = await axios.get(url);
			var data = response.data;
			res.render("results", {data : data});
		}
		catch(error){
			console.log(error);
		}
	})();
});

app.listen(3000,()=>{
	console.log("Movie Search App server has started.");
});