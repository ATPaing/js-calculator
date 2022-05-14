const numberInputEl = document.getElementById("number-input-el")
const numberBtnEl = document.querySelectorAll(".number-btn")
const operatorBtnEl = document.querySelectorAll(".operator-btn")
const lastNumEl = document.querySelector('.last-num')
const operatorShow = document.querySelector('.operator-show')
const clearBtnEl = document.querySelector(".clear-btn")
const assignBtnEl = document.querySelector(".assign-btn")
const deleteBtnEl = document.querySelector(".delete-btn")

let numbers = []

let clicked = false
let plusClicked = false
let minusClicked = false
let divideClicked = false
let multiplyClicked = false
let deleted = false
let restarted = false

window.addEventListener('load', () => {
  numberInputEl.value = ''
})

numberBtnEl.forEach(n => {
  n.addEventListener('click', () => {

    if(clicked || deleted || restarted){
      calculateResult()
      numberInputEl.value = n.textContent
    }else{
      numberInputEl.value += n.textContent
    }
    clicked = false
    deleted = false
    restarted = false
  })
})

operatorBtnEl.forEach((op,i) => {
  op.addEventListener('click',() => {

    operatorShow.textContent = op.textContent
    if(!clicked){
      numbers.push(parseFloat(numberInputEl.value))
      lastNumEl.textContent = numberInputEl.value
      operatorShow.textContent = op.textContent
      numberInputEl.value = ''
      calculateResult()
    }

    deleted = false
    restarted = false
    clicked = true

    
    if(i === 0){
      divideClicked = true
      multiplyClicked = false
      plusClicked = false
      minusClicked = false
     }else if(i === 1){
      multiplyClicked = true
      divideClicked = false
      plusClicked = false
      minusClicked = false
     }else if(i === 2){
      minusClicked = true
      plusClicked = false
      divideClicked = false
      multiplyClicked = false
     }else if(i === 3){
      plusClicked = true
      minusClicked = false
      divideClicked = false
      multiplyClicked = false
     }
  })
})

deleteBtnEl.addEventListener('click',() => {
  deleted = true
  numberInputEl.value = 0
})

clearBtnEl.addEventListener('click',() => {
  numbers = []

  clicked = false
  plusClicked = false
  minusClicked = false
  divideClicked = false
  multiplyClicked = false
  deleted = false
  restarted = true

  numberInputEl.value = 0
  lastNumEl.textContent = ''
  operatorShow.textContent = ''
})

assignBtnEl.addEventListener('click', () => {

  clicked = true
  deleted = false
  restarted = false
  numbers.push(parseFloat(numberInputEl.value))
  calculateResult()
})

function calculateResult(){
  if(numbers.length > 1){
    const result =  numbers.reduce((prev,next) => {
      if(divideClicked){
         return prev / next
       }else if(multiplyClicked){
         return prev * next
       }else if(minusClicked){
         return prev - next
       }else if(plusClicked){
         return prev + next
       }
     })
     numberInputEl.value = result
     lastNumEl.textContent = result
       
     numbers = []
     numbers.push(result)
   }
}
