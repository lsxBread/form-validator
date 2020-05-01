const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success"
}

const showError = (input, errorMessage) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error"
  const small = formControl.querySelector('small')
  small.innerText = errorMessage;
}

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less then ${max} characters`)
  } else {
    showSuccess(input)
  }
}

const checkRequired = (inputArr) => {
  inputArr.forEach(input => {
    if (input.value.trim() === "") {
      // show error msg
      showError(input, `${getFieldName(input)} is required`)
    } else {
      // show success
      showSuccess(input)
    }
  })
}

const checkEmail = (email) => {
   const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (regex.test(email.value.trim())) {
     showSuccess(email)
   } else {
     showError(email, 'Email is not valid')
   }
}

const checkPasswordMatch = (password, password2) => {
  if (password.value !== password2.value) {
    showError(password2, 'Passwords do not match')
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 25)
  checkEmail(email)
  checkPasswordMatch(password, password2)
})


