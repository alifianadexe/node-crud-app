const fs = require();

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

	}

}