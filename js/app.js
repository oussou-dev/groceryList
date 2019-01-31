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
	}
})

// clear btn event listener
clearBtn.addEventListener("click", function() {
	while (listItems.children.length > 0) {
		listItems.removeChild(listItems.children[0])
	}
})

// delete one item
listItems.addEventListener("click", function(e) {
	if (e.target.parentElement.classList.contains("remove-icon")) {
		let parent = e.target.parentElement.parentElement
		listItems.removeChild(parent)
	}
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
