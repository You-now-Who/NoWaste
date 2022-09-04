// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixLocation from 'wix-location';
import { currentMember } from 'wix-members'
import wixData from 'wix-data';

let uploaded = false

let user_point_profile = "";

let user = currentMember;
let id = ""
let db_id = ""
let fullName = ""
let currPoints = 0

currentMember.getMember()
  .then((member) => {
    id = member._id;
    fullName = `${member.contactDetails.firstName} ${member.contactDetails.lastName}`;
    return member;
  })
  .catch((error) => {
    console.error(error);
  });

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}


$w.onReady(function () {

	// Write your Javascript code here using the Velo framework API

	// Print hello world:
	// console.log("Hello world!");

	// Call functions on page elements, e.g.:
	// $w("#button1").label = "Click me!";

	$w("#image2").hide();

	$w("#upload").onClick( (event) => {
		console.log("Uploadede")
		$w("#uploadButtonPizza").uploadFiles()
		.then( (uploadedFiles) => {
			console.log("Uploaded files. URL: ", uploadedFiles[0].fileUrl)
			// $w("#text1").text = "Upload successful";
			$w("#image2").src = uploadedFiles[0].fileUrl;
			$w("#image2").show();
			uploaded = true
		})
	} );

	$w("#recycleButton").onClick( (event) => {
		

	// add the ai part later on
	console.log("pizza")
	if(uploaded){

		wixData.query("Point_system")
	.hasSome("userid", id)
	.find()
	.then( (results) => {
		if (results.items.length === 0)
		{
			let newUser = {
				userid: id,
				points: 0
				};
			
			wixData.insert("Point_system", newUser);
			
		}
		else{
			currPoints = results.items[0].points
			db_id = results.items[0]._id
			
			let newUser = {
				"_id": db_id.toString(),
				"userid": id,
				"points": currPoints + getRndInteger(100, 300)
				};
			
			wixData.update("Point_system", newUser);
			console.log("reached here")
		}

		console.log(results.items[0].points);
	} );

		wixLocation.to("https://zinc0sr.wixsite.com/nowaste/dashboard")
	}
	

	} );

});


