// get elements

const form = document.getElementById("input-form")
const input = document.getElementById("input-value")
const feedback = document.querySelector(".feedback")
const listItems = document.querySelector(".list-items")
const clearBtn = document.querySelector(".clearBtn")

//=> *** event listeners

// form
form.addEventListener("submit", function(e) {
	e.preventDefault()

	const value = input.value

	if (value === "") {
		showFeedback(feedback, "Can not add empty value", "alert-danger")
	} else {
		// add item to list
		addItem(value)

		// add to localStorage
		addStorage(value)
	}
})

// clear btn event listener
clearBtn.addEventListener("click", function() {
	while (listItems.children.length > 0) {
		listItems.removeChild(listItems.children[0])

		// clear local storage
		clearStorage()
	}
})

// delete one item
listItems.addEventListener("click", function(e) {
	if (e.target.parentElement.classList.contains("remove-icon")) {
		let parent = e.target.parentElement.parentElement
		listItems.removeChild(parent)
		let text =
			e.target.parentElement.previousElementSibling.textContent

		clearSingle(text)
	}
})

// DOM content loaded
document.addEventListener("DOMContentLoaded", function() {
	loadItems()
})

//=> *** functions

// show feedback
function showFeedback(element, text, result) {
	element.classList.add("showItem", `${result}`)
	element.innerHTML = `${text}`
	setTimeout(function() {
		element.classList.remove("showItem", `${result}`)
	}, 1500)
}

// add item
function addItem(item) {
	// create a div
	const div = document.createElement("div")
	// add class
	div.classList.add(
		"item",
		"my-3",
		"d-flex",
		"justify-content-between",
		"p-2"
	)
	// insert html
	div.innerHTML = `
       <h5 class="item-title text-capitalize">${item}</h5>
       <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>
    `
	// add div to listItems
	listItems.appendChild(div)

	// make input empty
	input.value = ""

	// show feedback
	showFeedback(feedback, "item added to the list", "alert-success")
}

// add to localStorage
function addStorage(value) {
	let items
	if (localStorage.getItem("grocery-list")) {
		items = JSON.parse(localStorage.getItem("grocery-list"))
	} else {
		items = []
	}
	items.push(value)
	localStorage.setItem("grocery-list", JSON.stringify(items))
}

// clear local storage
function clearStorage() {
	localStorage.removeItem("grocery-list")
}

// clear single item in the local storage
function clearSingle(value) {
	const tempItems = JSON.parse(localStorage.getItem("grocery-list"))

	const items = tempItems.filter(function(item) {
		if (item !== value) {
			return item
		}
	})
	localStorage.removeItem("grocery-list")
	localStorage.setItem("grocery-list", JSON.stringify(items))
}

// load items
function loadItems() {
	if (localStorage.getItem("grocery-list")) {
		const items = JSON.parse(localStorage.getItem("grocery-list"))
		items.forEach(function(item) {
			// addItem(item) sans le feedback dont le text correspond à du addItem
			// create a div
			const div = document.createElement("div")
			// add class
			div.classList.add(
				"item",
				"my-3",
				"d-flex",
				"justify-content-between",
				"p-2"
			)
			// insert html
			div.innerHTML = `
       <h5 class="item-title text-capitalize">${item}</h5>
       <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>
    `
			// add div to listItems
			listItems.appendChild(div)

			// make input empty
			input.value = ""
		})
	}
}
