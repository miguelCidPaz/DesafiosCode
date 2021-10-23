let box = document.getElementsByClassName('dealers-box'); box = box[0];
let presentation = document.getElementsByClassName('presentation'); presentation = presentation[0];
let days = document.getElementsByClassName('day');
let input = document.querySelector('input');
let button = document.getElementById('button');

let user = '';
let ordersInTravel = [];
let orderGo = [];

button.addEventListener('click', function (e) {
    user = input.value;
    drawSquares()
    clearPresentation()
    input.value = '';
})

input.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        user = input.value;
        drawSquares()
        clearPresentation()
        input.value = '';
    }
})

function drawSquares() {
    let date1 = '8'
    let date2 = '00';

    for (let days = 0; days < 7; days++) {
        let day = document.createElement('div');
        day.classList = 'day';

        for (let hours = 0; hours < 25; hours++) {
            let hour = document.createElement('div');
            hour.classList = 'hour';
            hour.innerHTML = `${date1}:${date2}`;
            hour.setAttribute('onclick', 'takeDealer(this)');
            day.appendChild(hour);

            if (date2 == '30') {
                date1 = parseInt(date1) + 1
                date1 = date1.toString();
                date2 = '00';
                continue;
            } else if (date2 == '00') {
                date1 = date1.toString();
                date2 = '30';
                continue;
            }
        }

        date1 = '8'
        date2 = '00';
        box.appendChild(day);
    }


}

function takeDealer(dealer) {
    let dealers = document.getElementsByClassName('hour');
    let takes = document.getElementsByClassName('order-in-progress')
    let arr = [...dealers, ...takes];

    if (dealer.className == 'hour') {
        order(dealer);
        ordersInTravel.push(user, dealer)
    } else {
        if (ordersInTravel.length == 0 || ordersInTravel.includes(user) && ordersInTravel.includes(dealer)) {
            if (ordersInTravel[ordersInTravel.indexOf(user) + 1] === dealer) {
                ordersInTravel.splice(ordersInTravel.indexOf(user), 1)
                liberate(dealer)
            }
        }
    }
}

function order(order) {
    let dealers = document.getElementsByClassName('dealer')
    let find = 0;

    for (let i = 0; i < dealers.length; i++) {
        if (dealers[i].className == 'dealer') {
            dealers[i].classList = 'order-in-progress';
            find++;
            order.classList = 'occupied'
            break;
        }
    }

    if (find == 0) {
        console.log('Todos ocupados')
    }

}

function liberate(order) {
    let orders = document.getElementsByClassName('order-in-progress')
    let find = 0;

    for (let i = orders.length - 1; i >= 0; i--) {
        if (orders[i].className == 'order-in-progress') {
            orders[i].classList = 'dealer';
            order.classList = 'hour'
            find++;
            break;
        }

        if (find == 0) {
            console.log('Todos libres')
        }
    }
}

function clearPresentation() {
    presentation.style.display = 'none';
}

let names = document.getElementById('name');

names.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        user = names.value;
        names.value = '';
    }
})