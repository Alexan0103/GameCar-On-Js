
game()

function game() {
  let isPause = false;
  let IsFinish = false;
  let animationId = null;

  let speed = 3;
  let Score = 0

  const gameScore = document.querySelector('.game-score')
  const backdrop = document.querySelector('.backdrop')


  document.addEventListener('keydown', (event) => {
    if (isPause || IsFinish) {
      return;
    }
    const code = event.code
    if (code === 'ArrowUp' && carInfo.move.top === null) {
      if (carInfo.move.bottom) {
        return;
      }
      carInfo.move.top = requestAnimationFrame(carMoveTop(car, carInfo))

    } else if (code === 'ArrowDown' && carInfo.move.bottom === null) {
      if (carInfo.move.top) {
        return;
      }
      carInfo.move.bottom = requestAnimationFrame(carMoveBottom(car, carInfo ))

    } else if (code === 'ArrowLeft' && carInfo.move.left === null) {
      if (carInfo.move.right) {
        return;
      }
      carInfo.move.left = requestAnimationFrame(carMoveLeft(car, carInfo ))

    } else if (code === 'ArrowRight' && carInfo.move.right === null) {
      if (carInfo.move.left) {
        return;
      }
      carInfo.move.right = requestAnimationFrame(carMoveRight(car, carInfo))

    }
  })
  document.addEventListener('keyup', (event) => {
    const code = event.code
    if (code === 'ArrowUp') {
      cancelAnimationFrame(carInfo.move.top);
      carInfo.move.top = null;
    } else if (code === 'ArrowDown') {
      cancelAnimationFrame(carInfo.move.bottom);
      carInfo.move.bottom = null;

    } else if (code === 'ArrowLeft') {
      cancelAnimationFrame(carInfo.move.left);
      carInfo.move.left = null;

    } else if (code === 'ArrowRight') {
      cancelAnimationFrame(carInfo.move.right);
      carInfo.move.right = null;

    }
  })

  document.addEventListener("touchstart", (event) => {
    if (isPause || IsFinish) {
      return;
    }
    const target = event.target;
    if (target.closest(".game-button") || target.closest(".restart-button")) {
      return; // не двигаем машину
    }

    const touch = event.touches[0]; // первый палец
    const screenWidth = window.innerWidth;

    const x = touch.clientX;

    if (x < screenWidth / 2 )  {
      // левая половина
      if (carInfo.move.left === null) {
        carInfo.move.left = requestAnimationFrame(carMoveLeft(car, carInfo));
      }
    } else {
      // правая половина
      if (carInfo.move.right === null) {
        carInfo.move.right = requestAnimationFrame(carMoveRight(car, carInfo));
      }
    }


  });
  document.addEventListener("touchend", () => {
    cancelAnimationFrame(carInfo.move.left);
    cancelAnimationFrame(carInfo.move.right);
    cancelAnimationFrame(carInfo.move.top);
    cancelAnimationFrame(carInfo.move.bottom);

    carInfo.move.left = null;
    carInfo.move.right = null;
    carInfo.move.top = null;
    carInfo.move.bottom = null;
  });


  // отмена двойного нажатия по экрану, из-за которого срабатывает приближение на мобильных устройствах
  let lastTouchEnd = 0;
  document.addEventListener("touchend", function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault(); // блокируем двойной тап-зум
    }
    lastTouchEnd = now;
  }, false);



  animationId = requestAnimationFrame(startGame)
  function startGame() {
    elementAnimation(danger, dangerInfo, -250, speed);
    if(dangerInfo.visible && hasCollision(carInfo, dangerInfo)){
       return finisGame();

    }

    treesAnimation(speed);

    elementAnimation(coin, coinInfo, -100, speed);
    if(coinInfo.visible && hasCollision(carInfo,coinInfo)){

      Score++;
      gameScore.innerText = Score
      coin.style.display = 'none';
      coinInfo.visible = false;
      if (Score % 3 === 0 && speed < 10){

        speed++;
      }
    }

    elementAnimation(arrow, arrowInfo, -600, speed);
    if(arrowInfo.visible && hasCollision(carInfo,arrowInfo)){

      arrow.style.display = 'none';
      arrowInfo.visible = false;
      arrowInfo.ignoreApperance = true;

      danger.style.opacity = '0.2';
      dangerInfo.visible = false;
      dangerInfo.ignoreApperance = true;
      if (speed < 10){ // если скорость не большая, то при наезде на стрелку скорость увеличивается на 6 и уменьшается на 5
        speed += 7
      }else{ // иначе увеличивается на 3 и уменьшается на 5 после наезда на стрелку
        speed += 3
      }

      setTimeout(() =>{
        danger.style.opacity = '1';

        speed -= 5
        setTimeout(() => {
          dangerInfo.visible = true;
          arrowInfo.ignoreApperance = false;
          dangerInfo.ignoreApperance = false;
        }, 500)
      }, 1000);
    }
    animationId = requestAnimationFrame(startGame)
  }


  function finisGame() {
    IsFinish = !IsFinish
    cancelAnimation(animationId)

    const buttons = document.querySelector('.buttons');
    buttons.style.display = 'none';

    backdrop.style.display = 'flex';
    const scoreText = backdrop.querySelector('.finish-text-score');
    scoreText.innerText = Score;
  }
  const gameButton = document.querySelector('.game-button')
  gameButton.addEventListener('click', () => {
    isPause = !isPause
    if (isPause) {

      cancelAnimation(animationId)
      gameButton.children[0].style.display = 'none'
      gameButton.children[1].style.display = 'initial'
    } else {
      animationId = requestAnimationFrame(startGame)
      gameButton.children[0].style.display = 'initial'
      gameButton.children[1].style.display = 'none'

    }


  });

  const restartButton = document.querySelector('.restart-button')

  restartButton.addEventListener('click', () => {
    window.location.reload()

  } )

}

