import {CellState} from './cell-state.enum';

export class Cell {

  i: number;
  j: number;
  _state: CellState;

  constructor(i:number,
              j:number,
              state?: CellState) {
    this.i = i;
    this.j = j;
    if (state) {
      this._state = state;
    } else {
      this._state = CellState.DEFAULT;
    }
  }

  setState(value: CellState) {
    this._state = value;
  }


  getState(): CellState {
    return this._state;
  }
}
