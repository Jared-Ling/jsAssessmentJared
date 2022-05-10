const prompt = require('prompt-sync')({sigint: true});
const clear = require ('clear-screen');
clear();

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.y = 0;
    this.x = 0;
    this.end = false;
  }

  print() {
    for (let i=0; i<this.field.length; i++) {
      console.log(this.field[i].join(''));
    }
  }

  runGame() {
    this.print();
  while (!this.end) {
    let direction = prompt('Which way?');
    direction = direction.toLowerCase();
    switch (direction) {
      case 'w':
      this.x -= 1;
      this.updateGame();
      break;
      case 's':
      this.x += 1;
      this.updateGame();
      break;
      case 'd':
      this.y += 1;
      this.updateGame();
      break;
      case 'a':
      this.y -= 1;
      this.updateGame();
      break;
      default:
      console.log('Use these keys to move (w, a, s, d)');
      break;
    }
  }
}
updateGame() {
  if (this.notOut()) {
    if (this.isHole()) {
      console.log('Oops! You fell into the hole!');
      this.end = true;
    } else if (this.isHat()) {
      console.log('Congratulations, you have found the hat!');
      this.end = true;
    } else {
    this.field[this.x][this.y] = pathCharacter;
    myField.print();
    }
    } else {
            console.log('Oops! You are out of bounds!');
            this.end = true;
    }
}
notOut() {
  return (this.x < this.field.length && this.x >= 0 && this.y < this.field[this.x].length && this.y >= 0);
}

isHole() {
  return (this.field[this.x][this.y] === hole);
}
isHat() {
  return (this.field[this.x][this.y] === hat);
}
static generateField(height, width, percentage = 10) {
  if (percentage >= 0 && percentage <= 100) {
  let field = [];
  
    for (let i=0; i < height; i++) {
      field.push([]);
      for (let i2=0; i2 < width;i2++) {
        if (i === 0 && i2 === 0) {
        field[i].push(pathCharacter); 
        } else {
          let isHole = Math.floor(Math.random() * percentage);
          let isField = Math.floor(Math.random() * (100 - percentage));
        if (isHole >= isField) {
          field[i].push(hole);
        } else {
          field[i].push(fieldCharacter);
        }
        }
        } 
      } 
    const hatX = Math.floor(Math.random() * height);
    const hatY = Math.floor(Math.random() * width);
    while (hatX === 0 && hatY === 0) {
      hatX = Math.floor(Math.random() * height);
      hatY = Math.floor(Math.random() * width);
    } 
    field[hatX][hatY] = hat;
    return field;
    }
    else {}
}

isSolvable() {
  const allEmpty = [];
  const locHat = [];
  let outOfMoves = false;
  for (let i=0; i<this.field.length; i++) {
    for (let i2=0; i2<this.field[i].length; i2++) {
      if (this.field[i][i2] === fieldCharacter) {
        allEmpty.push('x' + i + 'y' +i2);
      } else if (this.field[i][i2] === hat) {
        locHat.push(i, i2);
      }
    }
  }
  let x = locHat[0];
  let y = locHat[1];
  let i3 = 0;
  let marks = [];
  while (!outOfMoves && i3 < 5){
    if (allEmpty.includes('x' + (x-1) + 'y' +y) && !marks.includes('x' + (x-1) + 'y' +y + i3)) {
      x--;
      marks.push('x' + x + 'y' +y + i3)
    } else if (allEmpty.includes('x' + (x+1) + 'y' +y) && !marks.includes('x' + (x+1) + 'y' + y + i3)) {
      x++;
      marks.push('x' + x + 'y' +y + i3)
    } else if (allEmpty.includes('x' + x + 'y' +(y-1)) && !marks.includes('x' + x + 'y' +(y-1) +i3)) {
      y--;
      marks.push('x' + x + 'y' +y + i3)
    } else if (allEmpty.includes('x' + x + 'y' +(y+1)) && !marks.includes('x' + x + 'y' +(y+1) + i3)) {
      y++;
      marks.push('x' + x + 'y' +y + i3)
    } else if (i3 < 5){
      i3++;
    } else {
      outOfMoves = true;
    }
  }
if (x === 0 & y === 1) {
  return true;
} else if (y === 0 & x == 1) {
return true;
} else {
return false;
}
}
}
let myField = new Field(Field.generateField(10, 10, 40));
while (!myField.isSolvable()) {
  myField = new Field(Field.generateField(10, 10, 40));
}
myField.runGame();