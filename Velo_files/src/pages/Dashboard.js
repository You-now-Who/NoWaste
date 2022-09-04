// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction


import { currentMember } from 'wix-members'
import wixData from 'wix-data';

let user_point_profile = "";

let user = currentMember;
let id = ""
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

$w("#progressBar1").targetValue = 10000;
$w.onReady(function () {

	// $w('#text20').text = id;
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
			$w('#text20').text = id;
			$w('#text20').text = "0 points";
			$w("#progressBar1").value = 0;
			console.log("Made new")
			
		}
		else{
			currPoints = results.items[0].points
			$w("#text20").text = results.items[0].points.toString().concat(" points")
			$w("#text20").text = results.items[0].points.toString()
			$w("#progressBar1").value = currPoints;
			console.log("Got old")
		}

		console.log(results.items);
		console.log(results.items[0].points);
		$w("#text20").text = results.items[0].points.toString().concat(" points");
		$w("#progressBar1").value = currPoints;
	} );

});