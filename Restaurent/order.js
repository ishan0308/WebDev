const gst = 15;
const adds = document.querySelectorAll('#add');
const pluss = document.querySelectorAll('#plus');
const minuss = document.querySelectorAll('#minus');
const order = document.querySelector('#order');
const orderLine = document.querySelector('#order #line');
const amt = document.querySelector('#amt');
const noItem = document.querySelector('#noItem');
const totalItems = document.querySelector('#totalItems');
const finalize = document.querySelector('#finalize');
const subtotalCost = document.querySelector("#subtotalCost");
const tax = document.querySelector("#tax");
const totalCost = document.querySelector("#totalCost");
const arrow = document.querySelector('#total svg');

totalItems.innerText = '0';

const amountPayable = () => {
    const As = document.querySelectorAll('#A');
    let sum = 0;
    for (let A of As) {
        const cost = A.firstElementChild.nextElementSibling.innerText;
        sum += parseFloat(cost.slice(1));
    }
    subtotalCost.innerText = sum;
    tax.innerText = ((sum * gst) / 100).toFixed(2);
    totalCost.innerText = (sum * (1 + (gst / 100))).toFixed(2);
}

const yourOrder = (name, cost) => {
    const A = document.createElement('div');
    A.id = 'A';
    const B = document.createElement('div');
    B.id = name;
    B.innerText = `${name} x 1`;
    const C = document.createElement('div');
    C.id = name;
    C.innerText = cost;
    A.append(B);
    A.append(C);
    order.insertBefore(A, finalize);
}

for (let add of adds) {
    add.addEventListener('click', function () {
        add.nextElementSibling.style.display = 'flex';
        add.style.display = 'none';
        const span = document.createElement('span');
        const dish = add.parentElement.previousElementSibling;
        const name = dish.firstElementChild;
        const cost = name.nextElementSibling;
        totalItems.innerText = parseInt(totalItems.innerText) + 1;
        if (totalItems.innerText !== '0') {
            noItem.style.display = 'none';
            finalize.style.display = 'block';
        }
        yourOrder(name.innerText, cost.innerText);
        amountPayable();

    })
}

const updateItem = (amount, n, x) => {
    const dish = amount.parentElement.previousElementSibling;
    const name = dish.firstElementChild;
    const cost = name.nextElementSibling;
    const food = document.querySelectorAll(`#order [id="${name.innerText}"]`);
    food[1].innerText = '$' + parseInt(cost.innerText.slice(1)) * n;
    food[0].innerText = `${name.innerText} x ${n}`;
    totalItems.innerText = parseInt(totalItems.innerText) + x;
}

const removeItem = (amount) => {
    const dish = amount.parentElement.previousElementSibling;
    const name = dish.firstElementChild;
    const food = document.querySelectorAll(`#order [id="${name.innerText}"]`);
    const del = food[0].parentElement;
    del.remove();
    totalItems.innerText = parseInt(totalItems.innerText) - 1;
    if (totalItems.innerText === '0') {
        noItem.style.display = 'block';
        finalize.style.display = 'none';

    }
}


for (let plus of pluss) {
    plus.addEventListener('click', function () {
        let val = plus.previousElementSibling.innerText;
        plus.previousElementSibling.innerText = parseInt(val) + 1;
        updateItem(plus.parentElement, parseInt(val) + 1, 1);
        amountPayable();
    })
}

for (let minus of minuss) {
    minus.addEventListener('click', function () {
        let val = minus.nextElementSibling.innerText;
        const add = minus.parentElement.previousElementSibling;
        if (val === '1') {
            add.style.display = 'flex';
            add.style.justifyContent = 'center';
            minus.parentElement.style.display = 'none';
            removeItem(minus.parentElement);
            amountPayable();
        }
        else {
            minus.nextElementSibling.innerText = parseInt(val) - 1;
            updateItem(minus.parentElement, parseInt(val) - 1, -1);
            amountPayable();
        }
    })
}


arrow.addEventListener('click', function () {
    if (order.style.display === 'block')
        order.style.display = 'none';
    else
        order.style.display = 'block';
})


const downArrows = document.querySelectorAll('h3 svg');

for (let downArrow of downArrows) {
    downArrow.addEventListener('click', () => {
        const outer = downArrow.parentElement.nextElementSibling; if (outer.style.display === 'block') {
            outer.style.display = 'none';
        }
        else
            outer.style.display = 'block';
    })
}