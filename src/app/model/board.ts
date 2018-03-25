import {Cell} from "./cell";
import {BoardState} from './board-state.enum';

export class Board {

  cells: Cell[][];
  _state: BoardState;
  size: number;

  constructor(size:number) {
    this.size = size;
    this.cells = [];
    for (var i: number =0 ; i< size; i++){
      let row:Cell[] = [];
      for (var j: number=0; j<size; j++){
        row.push(new Cell(i,j));
      }
      this.cells.push(row);
    }
    this._state= BoardState.SET;
  }


  setState(value: BoardState) {
    this._state = value;
  }


  getState(): BoardState {
    return this._state;
  }

  updateCell(cell: Cell) {
    for (var i: number =0 ; i< this.size; i++){
      for (var j: number=0; j< this.size; j++){
        if (cell.i == i && cell.j == j) {
          this.cells[i][j] = cell;
        }
      }
    }
  }

  hideShips() {
    for (var i: number =0 ; i< this.size; i++){
      for (var j: number=0; j< this.size; j++){
          this.cells[i][j] = new Cell(i,j);
        }
      }
    }
}
