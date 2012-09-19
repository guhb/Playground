###
futurists =
	sculptor: "Umberto Boccioni"
	painter:  "Vladimir Burliuk"
	poet:
		name: "F.T. Marinetti"
		address: [
			"via Roma 42R"
			"Bellagio, Italy 22021"
		]

{poet: {name, address: [street, city]}} = futurists
###
#console.log poet?, name?, address?, street?, city?
# result: false true false true true
# means: only variable without preceding ":" is assigned.
###
tag = "<impossible>"
[open, contents..., close] = tag.split ""
console.log open, contents, close
###

class Animal
	constructor: (@name) ->

	move: (meters) ->
		console.log "#{@name} moved #{meters}m."

class Snake extends Animal
	move: ->
		console.log "Slithering..."
		super 5

class Horse extends Animal
	move: ->
		console.log "Galloping..."
		super 45

ancestor = new Animal "Olddy the Ancestor"
sam = new Snake "Sammy the Python"
tom = new Horse "Tommy the Palomino"

ancestor.move 4
sam.move() # functions invoked without parameters must have ()
tom.move()