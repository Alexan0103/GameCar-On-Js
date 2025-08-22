function cancelAnimation(animationId) {
  cancelAnimationFrame(animationId)

  cancelAnimationFrame(carInfo.move.top);
  cancelAnimationFrame(carInfo.move.bottom);
  cancelAnimationFrame(carInfo.move.left);
  cancelAnimationFrame(carInfo.move.right);
}

function elementAnimation(element, elementInfo, elementInitialYCord, speed) {
  let newYCord = elementInfo.cords.y + speed;
  let newXCord = elementInfo.cords.x;

  if (newYCord > window.innerHeight) {
    newYCord = elementInitialYCord;

    const direction =parseInt(Math.random() * 2) ;
    const maxXCord = parseInt(roadWidth + 1 - elementInfo.width)
    const RandomXCord = parseInt(Math.random() * maxXCord);


    if (!elementInfo.ignoreApperance) {
      element.style.display = 'initial';
      elementInfo.visible = true;
    }


    newXCord = direction === 0
      ? -RandomXCord
      : RandomXCord;


  }
  elementInfo.cords.y = newYCord;
  elementInfo.cords.x = newXCord;
  element.style.transform = `translate(${newXCord}px, ${newYCord}px)`;

}


const trees = document.querySelectorAll('.tree');
const treesCords = [];
for (let i = 0; i < trees.length; i++) {
  const tree = trees[i];
  const cordTree = getCords(tree);

  treesCords.push(cordTree)
}
function treesAnimation(speed) {
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const cords = treesCords[i];
    let newYCord = cords.y + speed;

    if (newYCord > window.innerHeight) {
      newYCord = -310;
    }
    treesCords[i].y = newYCord;
    tree.style.transform = `translate(${cords.x}px, ${newYCord}px)`;

  }
}
