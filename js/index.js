// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input');
const maxWeight = document.querySelector('.maxweight__input');
const againArr = document.querySelector('.again');

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

let againFruits = [...fruits];

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  fruitsList.innerHTML = '';

  for (let i = 0; i < fruits.length; i++) {
    const li = document.createElement('li');
    li.className = 'fruit__item';

    const color = fruits[i].color;
    
    if(color === 'фиолетовый'){
      li.className += ' fruit_violet';
    }else if(color === 'зеленый'){
      li.className += ' fruit_green';
    }else if(color === 'розово-красный'){
      li.className += ' fruit_carmazin';
    }else if(color === 'желтый'){
      li.className += ' fruit_yellow';
    }else if(color === 'светло-коричневый'){
      li.className += ' fruit_lightbrown';
    }else{
      li.className += ' fruit_new';
    }

    li.innerHTML = `<div class="fruit__info"><div>index: ${i}</div><div>kind: ${fruits[i].kind}</div><div>color: ${fruits[i].color}</div><div>weight (кг): ${fruits[i].weight}</div></div>`;
    fruitsList.appendChild(li);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let arr = [...fruits];
  let result = [];

  while (fruits.length > 0) {
    
    let i = getRandomInt(0, fruits.length - 1);
    let elem = fruits.splice(i, 1)[0];

    result.push(elem);
  }
  if(JSON.stringify(arr) === JSON.stringify(result)){
    alert('Порядок не изменился');
  }else{
    fruits = result;
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  const filters =  fruits.filter((item) => {
    const weight = item.weight;
    return weight >= parseFloat(minWeight.value) && weight <= parseFloat(maxWeight.value);
  }).map(el => el);
  fruits = filters;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  const priority = ['светло-коричневый', 'розово-красный', 'желтый', 'зеленый', 'фиолетовый']
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  return priority1 < priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
    for(i = 0; i < n - 1; i++){
      for(j = 0; j < n - 1 - i; j++){
        if(comparation(arr[j], arr[j+1])){
          [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
        }
      }
    }
  },

  quickSort(arr, comparation) {
    
  },
  
  
  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';

  sortKindLabel.textContent = sortKind;  
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  sortTimeLabel.textContent = sortTime;
  display();
});

/*** ДОБАВИТЬ ФРУКТ ***/
addActionButton.addEventListener('click', () => {
  const kindValue = kindInput.value, colorValue = colorInput.value, weightValue = weightInput.value;
  if(kindValue === '' || colorValue === '' || weightValue === ''){
    alert('Не все значения были введены!')
  }else{
    fruits.push({
      'kind': kindValue,
      'color': colorValue,
      'weight': weightValue
    });
  }
  
  display();
});

againArr.addEventListener('click', () => {
  fruits = againFruits;
  display();
});
