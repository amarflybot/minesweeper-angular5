import {Component, OnInit} from '@angular/core';
import {Board} from '../model/board';
import {Cell} from '../model/cell';
import {GameService} from '../services/game.service';
import {BoardState} from '../model/board-state.enum';
import {CellState} from '../model/cell-state.enum';
import {Player} from '../model/player';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent implements OnInit {

  size:number;
  board: Board;
  selectedCells: Cell[];

  constructor(private gameService: GameService) {
    this.size = 10;
  }

  ngOnInit() {
    this.board = this.gameService.createBoard(this.size);
    this.selectedCells = [];
  }

  cellClicked(cell: Cell) {
    console.log("Cell Clicked: ["+ cell.i + " " + cell.j+ "]");
    if (this.board.getState() == BoardState.SET) {
      cell.setState(CellState.SELECTED);
      this.selectedCells.push(cell);
    } else if (this.board.getState() == BoardState.START){
      cell.setState(CellState.BOMBED);
      this.gameService.process(cell);
    } else {
      console.log("Winner is: " + this.currentPlayer());
    }
  }

  playGame() {
    this.gameService.playGame();
    this.board = this.gameService.getBoard();
  }

  createShip() {
    this.gameService.createPlayerShip(this.selectedCells);
    this.gameService.createComputerShip();
    this.board = this.gameService.getBoard();

  }

  getStyleByState(_state: BoardState | CellState) {
    switch (_state) {
      case CellState.DEFAULT:
        return 'fas fa-dot-circle';
      case CellState.SELECTED:
        return 'fas fa-check-circle';
      case CellState.HAS_SHIP:
        return 'fas fa-ship';
      case CellState.BOMBED:
        return 'fas fa-bomb';
    }
  }

  getValueByCell(cell: Cell): string {
    return this.gameService.findCellStateByPlayer(cell);
  }

  currentPlayer() : Player{
    return this.gameService.getCurrentPlayer();
  }
}
