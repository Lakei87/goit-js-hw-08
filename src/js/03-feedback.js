import throttle from "lodash.throttle"

const formRef = document.querySelector(".feedback-form")
const formData = new FormData(formRef)
const FEEDBACK_FORM_KEY = "feedback-form-state"

updateForm()

formRef.addEventListener("input", throttle(saveFormDataToLocalStorage, 500))
formRef.addEventListener("submit", showFormDataAndResetForm)

function updateForm() {
    if (localStorage.getItem(FEEDBACK_FORM_KEY)) {
        try {
            const parsedData = JSON.parse(localStorage.getItem(FEEDBACK_FORM_KEY))
            const dataKeys = Object.keys(parsedData)
            for (const key of dataKeys) {
                const findedTagByName = document.querySelector(`.feedback-form [name='${key}']`)
                findedTagByName.value = parsedData[key]
            }
        } catch (error) {
            console.log(error.message)
        }
    } 
}

function saveFormDataToLocalStorage() {
    new FormData(formRef).forEach((value, name) => {
        formData[name] = value
        localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(formData))
    })
}

function showFormDataAndResetForm(event) {
    event.preventDefault()

    console.log(formData)
    localStorage.removeItem(FEEDBACK_FORM_KEY)
    formRef.reset()
}