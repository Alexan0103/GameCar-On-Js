
const road = document.querySelector('.road')
const roadHeight = road.clientHeight;
const roadWidth = road.clientWidth / 2;


const car = document.querySelector('.car')
const carInfo = {
  ...createElementInfo(car),
  move: {
    top: null,
    bottom: null,
    right: null,
    left: null,
  },
}

const coin = document.querySelector('.coin')
const coinInfo = createElementInfo(coin)

const danger = document.querySelector('.danger')
const dangerInfo = createElementInfo(danger)

const arrow = document.querySelector('.arrow')
const arrowInfo = createElementInfo(arrow)