// get elements

const form = document.getElementById("input-form")
const input = document.getElementById("input-value")
const feedback = document.querySelector(".feedback")
const listItems = document.querySelector(".list-items")
const clearBtn = document.querySelector(".clearBtn")

// add event listeners

form.addEventListener("submit", function(e) {
	e.preventDefault()
	console.log("hello")

	const value = input.value

	if (value === "") {
		showFeedback(feedback, "Can not add empty value", "alert-danger")
	}
})

// show feedback

function showFeedback(element, text, result) {
	element.classList.add("showItem", `${result}`)
	element.innerHTML = `${text}`
	setTimeout(function() {
		element.classList.remove("showItem", `${result}`)
	}, 1500)
}
