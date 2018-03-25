import {Ship} from './ship';
import {Cell} from './cell';

export class Player {

  private _name: string;
  private _ships: Ship[];
  private power: number;

  constructor(name: string) {
    this._name = name;
    this._ships = [];
    this.power = 0;
  }


  getShips(): Ship[] {
    return this._ships;
  }

  setShips(value: Ship[]) {
    this._ships = value;
  }

  addShip(value: Ship) {
    this._ships.push(value);
  }


  getName(): string {
    return this._name;
  }

  processHit(cell: Cell) {
    this._ships.forEach( ship => {
      ship.getCells().forEach(cell1 => {
        if (cell1.i == cell.i && cell1.j == cell.j) {
          this.power--;
        }
      })
    })
  }

  isPlayerDefeated() :boolean{
    if (this.power == 0) {
      return true;
    } else {
      return false;
    }
  }

  calculatePower() {
    this._ships.forEach( ship => {
      ship.getCells().forEach( cell => {
        this.power++;
      })
    })
  }
}
