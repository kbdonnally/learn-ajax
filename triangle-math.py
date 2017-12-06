# cx, cy - center of square coordinates
# x, y - coordinates of a corner point of the square
# theta is the angle of rotation

# translate point to origin

def rotateSquare(x,y,deg):
	import math
	theta = math.radians(deg)
	rotatedX = x * math.cos(theta) - y * math.sin(theta)
	rotatedY = x * math.sin(theta) + y * math.cos(theta)

	diffX = rotatedX  - x
	diffY = rotatedY  - y

	print(2 - diffY)

	return "({0},{1})".format(diffX, diffY)

print(rotateSquare(-2,2,15)) # translate to edge, y coord = where it touches edge