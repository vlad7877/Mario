function createObject(x, y, width, height) {
	let obj = {
		x: x,
		y: y,
		width: width,
		height: height
	}
	return obj
}
let playervalues = createObject(0,0,47,80)
let obstacle1 = createObject(400,200,250,250)
let obstacle2 = createObject(700,500,130,100)
let obstacle3 = createObject(40,400,130,100)

let speed = 5
let obstacles = [obstacle1, obstacle2, obstacle3]

let diamond1 = createObject(600,400,100,100)
diamond1["object"] = document.querySelector(".diamond1")
let diamondScore = 0

let diamond2 = createObject(50,300,100,100)
diamond2["object"] = document.querySelector(".diamond2")

let diamond3 = createObject(600,50,100,100)
diamond3["object"] = document.querySelector(".diamond3")

let diamonds = [diamond1,diamond2,diamond3]

let coin1 = createObject(100,100,50,50)
coin1["object"] = document.querySelector(".coin1")

let coin2 = createObject(1200,0,50,50)
coin2["object"] = document.querySelector(".coin2")

let coin3 = createObject(1236,600,50,50)
coin3["object"] = document.querySelector(".coin3")

let coinScore = 0

let coins = [coin1,coin2,coin3]

let portaL = createObject(500,500,80,130)


function check_collision(a) {
  return !(
      ((playervalues["y"] + playervalues["height"]) < (a.y)) ||
      (playervalues["y"] > (a.y + a.height)) ||
      ((playervalues.x + playervalues.width) < a.x) ||
      (playervalues.x > (a.x + a.width))
  );
}


function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }

  return arr;
}

let player = document.querySelector(".character")


function check_wall(side , obstacle){
	if(side == "down"){
		if(playervalues["y"] + playervalues["height"] + speed > obstacle["y"] && playervalues["y"] + playervalues["height"] < obstacle["y"] + obstacle["height"]) {
			if(playervalues["x"] + playervalues["width"] > obstacle["x"] && playervalues["x"] + playervalues["width"] < obstacle["x"] + obstacle["width"] ) {
				return false 
			}
			else if (playervalues["x"] > obstacle["x"] && playervalues["x"] < obstacle["x"] + obstacle["width"]){
				return false
			}else{
				return true
			}
			
		}else{
			return true
		}
	} if (side == "up") {
    if (playervalues["y"] - speed < obstacle["y"] + obstacle["height"] && playervalues["y"] > obstacle["y"]) {
      if (playervalues["x"] + playervalues["width"] > obstacle["x"] && 
        playervalues["x"] + playervalues["width"] < obstacle["x"] + obstacle["width"]) {
        return false
      }
      else if (playervalues["x"] > obstacle["x"] && 
        playervalues["x"] < obstacle["x"] + obstacle["width"]) {
        return false
      }
      else {
        return true
      }
    }
    else {
      return true
    }
  }
  if (side == "right"){
	if(playervalues["x"]+playervalues["width"] + speed >obstacle["x"] && playervalues["x"] + playervalues["width"] < obstacle["x"] + obstacle["width"]){
		if(playervalues["y"] + playervalues["height"] > obstacle["y"] && playervalues["y"] < obstacle["y"] + obstacle["height"]){
			return false
		}
		else{
		  return true
		}
	}else{
		return true
	}
  }
  if (side == "left"){
	if(playervalues["x"] - speed < obstacle["x"] + obstacle["width"] && playervalues["x"] > obstacle["x"]){
		if(playervalues["y"] + playervalues["height"] > obstacle["y"] && playervalues["y"] < obstacle["y"] + obstacle["height"]){
			return false
		}else{
			return true
		}
	}else{
		return true
	}
	}
}


function update(){
	player.style.left = playervalues["x"] + "px";
	player.style.top = playervalues["y"]  + "px";
}

function movement(key, coordinate, side, currentSpeed, location){
	if(event.code == key && location){
		let canMove = true
		obstacles.forEach((element) => {
			if(!check_wall(side , element)) {
				canMove = false
			}
		})
		diamonds.forEach((element) => {
			if(check_collision(element)) {
				element["object"].style.display = "none"
				diamondScore += 1
				document.querySelector(".diamondScore").innerHTML = "diamond score: " + diamondScore
				diamonds = removeItemOnce(diamonds, element)
				setTimeout(() => {
					let newX = Math.random() * 1230
					let newY = Math.random() * 530
					let obj = createObject(newX , newY , 100,100)
					let className = "diamond" + parseInt(Math.random() * 1000)
					let newDiamond = document.createElement("img") 
					newDiamond.style.position = "absolute" 
					newDiamond.style.width = "100px" 
					newDiamond.style.height = "100px" 
					newDiamond.style.left = newX + "px"
					newDiamond.style.top = newY + "px"
					newDiamond.src = "https://www.transparentpng.com/thumb/diamond/O3UOts-diamond-best-png.png"
					newDiamond.className = className
					document.querySelector("body").appendChild(newDiamond)
					obj.object = document.querySelector("." + className)
					console.log("diamond created")
					diamonds.push(obj)
  				},4000)
			}
		})

coins.forEach((element) => {
			if(check_collision(element)) {
				element["object"].style.display = "none"
				coinScore += 1
				document.querySelector(".coinScore").innerHTML = "Coins: " + coinScore
				coins = removeItemOnce(coins, element)
				setTimeout(() => {
					let newX = Math.random() * 1230
					let newY = Math.random() * 530
					let obj = createObject(newX , newY , 50,50)
					let className = "coin" + parseInt(Math.random() * 1000)
					let newCoin = document.createElement("img") 
					newCoin.style.position = "absolute" 
					newCoin.style.width = "50px" 
					newCoin.style.height = "50px" 
					newCoin.style.left = newX + "px"
					newCoin.style.top = newY + "px"
					newCoin.src = "https://www.pngall.com/wp-content/uploads/4/Empty-Gold-Coin-Transparent.png"
					newCoin.className = className
					document.querySelector("body").appendChild(newCoin)
					obj.object = document.querySelector("." + className)
					console.log("coin created")
					coins.push(obj)
  				},4000)

  				
			}
		})
		if(diamondScore > 2 && coinScore > 1){
			portal = document.querySelector(".portal")
			portal.style.display = "block"
			if(check_collision(portaL)){
				window.location.href = "level2.html"
			}
		}

		if(canMove) {
			playervalues[coordinate] -= currentSpeed
		}
				update()
	}
}




document.addEventListener('keydown' , function(event) {
	movement("KeyW" , "y" , "up" , speed , playervalues["y"] > 0)
	movement("KeyA" , "x" , "left" , speed , playervalues["x"] > 0)
	movement("KeyD" , "x" , "right" , -speed , playervalues["x"] + playervalues["width"] < 1382)
	movement("KeyS" , "y" , "down" , -speed , playervalues["y"] + playervalues["height"] < 630)	
})





























