const fs = require('fs');

module.exports = {
	addPlayerPage: (req, res) =>{
		console.log(req);
		console.log(res);
		res.render('add-player.ejs',{
			title: "Welcome to Adexe | Add new player",
			message: ""
		});
	},
	addPlayer:(req, res) => {
		if(!req.files){
			return res.status(400).send("No Files Uploaded");
		}

		let message = '';
		let first_name = req.body.first_name;
		let last_name = req.body.last_name;
		let position = req.body.position;
		let number = req.body.number;
		let username = req.body.username;
		
		// file image
		let uploadedFile = req.files.image;
		let image_name = uploadedFile.name;
		let fileExtension = uploadedFile.mimetype.split('/')[1];
		image_name = username + '.' + 	fileExtension;

		let usernameQuery = "SELECT * FROM tbl_players WHERE user_name = '" + username +"'";

		db.query(usernameQuery, (err,result) =>{
			
			if(err){
				return res.status(500).send(err);
			}

			// checking username already exist
			if(result.length > 0){
				
				message = 'Username already exist';
				res.render('add-player.ejs',{
					message,
					title:'Welcome to Adexe | Add new player'
				});

			}else{
				// checking filetype
				if(uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif' || uploadedFile.mimetype === 'image/jpg'){
					// uploading file
					let location = 'public/assets/images/'+image_name;

					uploadedFile.mv(location,(err) => {

						if(err){
							return res.status(500).send(err);
						}

						// add player
						let query = "INSERT INTO tbl_players (first_name, last_name, position, number, image, user_name) VALUES ('" + 
						first_name + "', '" + last_name + "','" + position +"','" + number + "','" + image_name + "','" + username+"')";

						db.query(query, (err,result) => {
							if(err){
								return res.status(500).send(err);
							}
						});

						res.redirect('/');

					});

				}else{
					message	 = "Invalid file format .Only 'gif' , 'png' ,'jpeg', 'jpg'";
					res.render('add-player.ejs',{
						message,
						title: "Welcome to Adexe | Add new Player"
					});
				}

			}
		});
	},

	editPlayerPage: (req,res) => {
		let playerId = req.params.id;
		let query = "SELECT * FROM tbl_players WHERE id = '" + playerId + "'";
		db.query(query, (err,result) => {
			
			if(err){
				return res.status(500).send(err);
			}

			res.render('edit-player.ejs',{
				title:"Edit Player",
				player: result[0],
				message: ''
			});
		});
	},
	editPlayer: (req,res) => {
		let playerId = req.params.id;
		let first_name = req.body.first_name;
		let last_name = req.body.last_name;
		let position = req.body.position;
		let number = req.body.number;

		let query = "UPDATE tbl_players SET first_name = '" + first_name + "', last_name = '"+ last_name +"', position = '"+ position +"', number = '"+ number +"' WHERE id =  " + playerId+ "";
		db.query(query, (err,result) => {
			
			if(err){
				return res.status(500).send(err);
			}

			res.redirect('/');

		});	


	},
	deletePlayer: (req,res) => {
		let playerId = req.params.id;
		let getImageQuery = "SELECT image FROM tbl_players WHERE id = '" + playersId + "' ";
		let deleteUserQuery = "DELETE FROM tbl_players WHERE id = '" + playersId + "'";

		db.query(getImageQuery, (err,result) => {
			
			if(err){
				return res.status(500).send(err);
			}

			let image = 'public/assets/images/' + result[0].image;

			fs.unlink(image, (err) => {
				
				if(err){
					return res.status(500).send(err);
				}
				
				db.query(deleteUserQuery, (err) => {
					
					if(err){
						return res.status(500).send(err);
					}

					res.redirect('/');
				});

			});


		});
	}


}
