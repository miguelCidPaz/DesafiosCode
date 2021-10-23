let box = document.getElementsByClassName('dealers-box'); box = box[0];
let presentation = document.getElementsByClassName('presentation'); presentation = presentation[0];
let days = document.getElementsByClassName('day');
let input = document.querySelector('input');
let button = document.getElementById('button');

let user = '';
let ordersInTravel = [];

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

function drawSquares(option = 0) {
    console.log(option)
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
    if (dealer.className == 'hour') {
        order(dealer);
        ordersInTravel.push(user, dealer)
    } else {
        let aux = ordersInTravel.indexOf(dealer);
        if (ordersInTravel.length == 0 || ordersInTravel.includes(user) && ordersInTravel.includes(dealer)) {
            if (ordersInTravel[aux] == dealer && ordersInTravel[aux - 1] == user) {
                ordersInTravel.splice(aux - 1, 2)
                liberate(dealer)
            }
        }
    }
    if (ordersInTravel.length > 15) {
        allReds();
    } else {
        allGreen();
    }
}

function allReds() {
    for (let i = 0; i < box.children.length; i++) {
        for (let j = 0; j < days[i].children.length; j++) {
            days[i].children[j].classList = 'occupied'
        }
    }
}

function allGreen() {
    for (let i = 0; i < box.children.length; i++) {
        for (let j = 0; j < days[i].children.length; j++) {
            if (!ordersInTravel.includes(days[i].children[j])) {
                days[i].children[j].classList = 'hour'
            } else {
                console.log('continue')
                continue;
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