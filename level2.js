let player = document.querySelector(".player")
let playervalues = createObject(0,0,47,80)
let speed = 5
function createObject(x, y, width, height) {
	let obj = {
		x: x,
		y: y,
		width: width,
		height: height
	}
	return obj
}











function update(){
	player.style.left = playervalues["x"] + "px";
	player.style.top = playervalues["y"]  + "px";
}




function movement(key, coordinate, side, currentSpeed, location){
	if(event.code == key && location){
		let canMove = true
		playervalues[coordinate] -= currentSpeed
	}	
	update()
}

document.addEventListener('keydown' , function(event) {
	movement("KeyW" , "y" , "up" , speed , playervalues["y"] > 0)
	movement("KeyA" , "x" , "left" , speed , playervalues["x"] > 0)
	movement("KeyD" , "x" , "right" , -speed , playervalues["x"] + playervalues["width"] < 1382)
	movement("KeyS" , "y" , "down" , -speed , playervalues["y"] + playervalues["height"] < 630)	
})
