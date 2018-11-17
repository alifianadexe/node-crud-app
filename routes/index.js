module.exports = {
	getHomePage:(req, res) => {
		let query = "SELECT * FROM tbl_players ORDER BY id ASC";
	
		//execute query
		db.query(query,(err,result) =>{
			
			if(err){
				res.redirect('/');
			}

			res.render('index.ejs',{
				title:"Welcome to Adexe | View Players",
				players:result
			});
			
		});
	}
};