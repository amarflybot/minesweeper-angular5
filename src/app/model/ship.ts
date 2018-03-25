import {Cell} from './cell';

export class Ship {

  _cells: Cell[];

  constructor() {
    this._cells = [];
  }


  getCells(): Cell[] {
    return this._cells;
  }

  setCells(value: Cell[]) {
    this._cells = value;
  }

  addCell(val: Cell) {
    this._cells.push(val);
  }

  isHit(cell: Cell) : boolean {
    let res:boolean = false;
    this._cells.forEach(cell1 => {
      if (cell1.i == cell.i && cell1.j == cell.j) {
        res = true;
      }
    });
    return res;
  }
}
