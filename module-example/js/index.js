import { sum } from './modules/operations.js';

const inputNumberOne = document.querySelector('#number-one');
const inputNumberTwo = document.querySelector('#number-two');
const buttonElem = document.querySelector('button');

buttonElem.addEventListener('click', () => {
    const firstNumber = parseInt(inputNumberOne.value);
    const secondNumber = parseInt(inputNumberTwo.value);

    console.log(firstNumber);
    console.log(secondNumber);
    const result = sum(firstNumber, secondNumber);
    console.log('Summan blev: ' + result);
});