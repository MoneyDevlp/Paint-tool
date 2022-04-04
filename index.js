var btn_color = document.querySelector('#btn_color');
var btn_pen = document.querySelector('#btn_pen');
var btn_erase = document.querySelector('#btn_eraser');
var btn_size = document.querySelector('#btn_size');
var btn_minus = document.querySelector('#btn_minus');
var btn_plus = document.querySelector('#btn_plus');
var btn_save = document.querySelector('#btn_save');
var btn_close = document.querySelector('#btn_close');
var canvas =  document.querySelector('canvas');

var ctx = canvas.getContext("2d");
var isDraw = false;
var color = 'black';
var size = 5;
btn_size.innerText = size;

// Vị trí ban đầu

var currentPosBefore = {
    x : 0,
    y : 0
}

// Vị trí sau khi vẽ

var currentPosAfter = {
    x : 0,
    y : 0
}

// Sự kiện khi bắt đầu click chuột xuống

document.addEventListener('mousedown', function (ev) {
    currentPosBefore = {
        x : ev.offsetX,
        y : ev.offsetY
    }
    isDraw = true;
})

// Sự kiện khi di chuột vẽ

document.addEventListener('mousemove', function (ev) {
    if(isDraw) {
        currentPosAfter = {
            x : ev.offsetX,
            y : ev.offsetY
        }

        ctx.beginPath();
        ctx.arc(currentPosBefore.x, currentPosBefore.y, size, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(currentPosBefore.x, currentPosBefore.y);
        ctx.lineTo(currentPosAfter.x, currentPosAfter.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = size * 2;
        ctx.stroke();

        currentPosBefore.x = currentPosAfter.x;
        currentPosBefore.y = currentPosAfter.y;
    }
})

// Sự kiện khi nhả chuột ra

document.addEventListener('mouseup', function () {
    isDraw = false;
})

// Sự kiện đổi màu vẽ

btn_color.addEventListener('change', function (ev) {
    color = ev.target.value;
})

// Sự kiện vẽ

btn_pen.addEventListener('click', function () {
    color = 'black';
})

// Sự kiện cho nút tẩy

btn_erase.addEventListener('click', function () {
    color = 'white';
})

// Sự kiện giảm size pain

btn_minus.addEventListener('click', function () {
    if(size > 5) {
        size -= 5;
        btn_size.innerText = size;
    }
    else {
        alert('Min size is 5');
        size = 5;
    }
})

// Sự kiện tăng size pain

btn_plus.addEventListener('click', function () {
    if(size < 30) {
        size += 5;
        btn_size.innerText = size;
    }
    else {
        alert('Max size is 30');
        size = 30;
    }
})

// Sự kiện close

btn_close.addEventListener('click', function () {
    var canvasClientRect = canvas.getClientRects()[0];
    ctx.clearRect(0,0,canvasClientRect.width, canvasClientRect.height);
})

// Sự kiện lưu canvas -> ảnh

btn_save.addEventListener('click', function () {
    var ouput = canvas.toDataURL("image/png");
    btn_save.setAttribute('download', 'canvas.png');
    btn_save.setAttribute('href', ouput);
})