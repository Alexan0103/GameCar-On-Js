
  function carMove(car, x, y) {
    car.style.transform = `translate(${x}px, ${y}px)`;
  }

  function carMoveTop(car, carInfo) {
    return () =>{
      const newY = carInfo.cords.y - 5;
      if (newY < 0) {
        return;
      }
      carInfo.cords.y = newY;
      carMove(car, carInfo.cords.x, newY)
      carInfo.move.top = requestAnimationFrame(carMoveTop(car, carInfo, ));
    }

  }

  function carMoveBottom(car, carInfo ) {
    return () =>{
      const newY = carInfo.cords.y + 5;
      if (newY + carInfo.height > roadHeight) {
        return;
      }
      carInfo.cords.y = newY;
      carMove(car, carInfo.cords.x, newY)
      carInfo.move.bottom = requestAnimationFrame(carMoveBottom(car, carInfo ));
    }

  }

  function carMoveLeft(car, carInfo ) {
    return () =>{
      const newX = carInfo.cords.x - 5;

      if (newX < -roadWidth + carInfo.width) {
        return
      }
      carInfo.cords.x = newX;
      carMove(car, newX, carInfo.cords.y)
      carInfo.move.left = requestAnimationFrame(carMoveLeft(car, carInfo ))
    }

  }

  function carMoveRight(car, carInfo, ) {
    return () => {
      const newX = carInfo.cords.x + 5;
      if (newX > roadWidth - carInfo.width) {
        return
      }
      carInfo.cords.x = newX;
      carMove(car, newX, carInfo.cords.y)
      carInfo.move.right = requestAnimationFrame(carMoveRight(car, carInfo ))
    }

  }

