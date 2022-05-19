(function( $ ) {

//  змейка
$.fn.myGame = function() {
    let scoreBlock;
    let score = 0;

    const config = {
        step: 0,
        maxStep: 6,
        sizeCell: 16,
        sizeBerry: 16 / 4
    }

    const snake = {
        x: 160,
        y: 160,
        dx: config.sizeCell,
        dy: 0,
        tails: [],
        maxTails: 3
    }

    let berry = { // изначально будет появляться одна ягодка
        x: 16,
        y: 16
    } 

    let berries = { // здесь будут храниться координаты других ягодок (не сделано)
        x: 16,
        y: 16
    } 


    let canvas = document.querySelector("#game-canvas"); // получаем область игры 
    let context = canvas.getContext("2d");
    scoreBlock = $(".game-score .score-count"); // получаем область счета
    drawScore(); // отрисовываем счет
    let animation_id; // переменная в которой будет храниться анимация, нужна чтобы ставить на паузу игру

    $('#start-btn').on('click', function(){
        requestAnimationFrame( gameLoop ); // запускаем анимацию по клику
    });

    $('#stop-btn').on('click', function(){
        cancelAnimationFrame(animation_id); // ставим анимацию на паузу

    });

    $('#add-btn').on('click', function(){
        randomPositionBerry(); // запускаем анимацию по клику
    });

    function gameLoop() { // проигрывающаяся анимация

        animation_id = requestAnimationFrame( gameLoop );
        if ( ++config.step < config.maxStep) {
            return;
        }
        config.step = 0;

        context.clearRect(0, 0, canvas.width, canvas.height);

        drawBerry();
        drawSnake();
    }


    function drawSnake() { // отрисовка змеи и ее проверки
        snake.x += snake.dx;
        snake.y += snake.dy;

        collisionBorder();

        snake.tails.unshift( { x: snake.x, y: snake.y } );

        if ( snake.tails.length > snake.maxTails ) {
            snake.tails.pop();
        }

        snake.tails.forEach( function(el, index){
            if (index == 0) {
                context.fillStyle = "#FA0556";
            } else {
                context.fillStyle = "#A00034";
            }
            context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );

            if ( el.x === berry.x && el.y === berry.y ) { // если змея съела ягоду , то увеличивается счет, увеличивается длина и генерируется новая ягода
                snake.maxTails++;
                incScore();
                randomPositionBerry();
            }

            for( let i = index + 1; i < snake.tails.length; i++ ) {
                if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y ) {
                    refreshGame();
                }
            }

        } );
    }

    function collisionBorder() { // при входе змеи в одну стену она перемещается в противоположную
        if (snake.x < 0) {
            snake.x = canvas.width - config.sizeCell;
        } else if ( snake.x >= canvas.width ) {
            snake.x = 0;
        }

        if (snake.y < 0) {
            snake.y = canvas.height - config.sizeCell;
        } else if ( snake.y >= canvas.height ) {
            snake.y = 0;
        }
    }
    function refreshGame() { // обновление игры
        score = 0;
        drawScore();

        snake.x = 160;
        snake.y = 160;
        snake.tails = [];
        snake.maxTails = 3;
        snake.dx = config.sizeCell;
        snake.dy = 0;

        randomPositionBerry();
    }

    function drawBerry() { // отрисовка ягоды
        context.beginPath();
        context.fillStyle = "#A00034";
        context.arc( berry.x + (config.sizeCell / 2 ), berry.y + (config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI );
        context.fill();
    }

    function randomPositionBerry() { // генерация рандомной позиции ягоды
        berry.x = getRandomInt( 0, canvas.width / config.sizeCell ) * config.sizeCell;
        berry.y = getRandomInt( 0, canvas.height / config.sizeCell ) * config.sizeCell;
    }

    function incScore() { // увеличение счета
        score++;
        drawScore();
    }

    function drawScore() { // отрисовка счета
        scoreBlock.innerHTML = score;
    }

    function getRandomInt(min, max) { // получение рандомного значения в диапазоне
        return Math.floor( Math.random() * (max - min) + min );
    }

    // исправила баг с тем, что при смене оси игра перезагружалась из-за того, что змейка съедала себя по логике. + добавила управление стрелочками
    let wIsPressed = false;
    let aIsPressed = false;
    let sIsPressed = false;
    let dIsPressed = false;

    document.addEventListener("keydown", function (e) {
    
        if ( e.code == "KeyW" && !sIsPressed || e.code == "ArrowUp" && !sIsPressed) {
            snake.dy = -config.sizeCell;
            snake.dx = 0;
            wIsPressed = true;
            sIsPressed = false;
            dIsPressed = false;
            aIsPressed = false;
        } else if ( e.code == "KeyA" && !dIsPressed || e.code == "ArrowLeft" && !dIsPressed) {
            snake.dx = -config.sizeCell;
            snake.dy = 0;
            aIsPressed = true;
            dIsPressed = false;
            sIsPressed = false;
            wIsPressed = false;
        } else if ( e.code == "KeyS" && !wIsPressed || e.code == "ArrowDown" && !wIsPressed ) {
            snake.dy = config.sizeCell;
            snake.dx = 0;
            sIsPressed = true;
            wIsPressed = false;
            dIsPressed = false;
            aIsPressed = false;
        } else if ( e.code == "KeyD" && !aIsPressed || e.code == "ArrowRight" && !aIsPressed) {
            snake.dx = config.sizeCell;
            snake.dy = 0;
            dIsPressed = true;
            aIsPressed = false;
            sIsPressed = false;
            wIsPressed = false;
        }
    });
};

})(jQuery);