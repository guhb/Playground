index = (list, target) ->
	[low, high] = [0, list.length]
	while low < high
		mid = (low + high) >> 1
		val = list[mid]
		return mid if val is target
		if val < target then low = mid + 1 else high = mid
	return -1

list = [
	1, 2, 3
	4, 5, 6
	7, 8, 9
]

console.log index list, 3