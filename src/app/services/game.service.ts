import { Injectable } from '@angular/core';
import {Board} from '../model/board';
import {BoardState} from '../model/board-state.enum';
import {Cell} from '../model/cell';
import {Player} from '../model/player';
import {Ship} from '../model/ship';
import {CellState} from '../model/cell-state.enum';

@Injectable()
export class GameService {

  private _board: Board;

  private players: Player[];

  private currentPlayer:Player;

  constructor() {
    this.players = [new Player("player"), new Player("comp")];
    this.currentPlayer = this.players[0];
  }

  playGame() {
    if (this._board.getState() == BoardState.SET) {
      this._board.setState(BoardState.START);
      this._board.hideShips();
      this.players.forEach( player => {
        player.calculatePower();
      })
    }
  }

  createBoard(size: number) : Board{
    this._board = new Board(size);
    return this._board;
  }

  getBoard(): Board {
    return this._board;
  }

  createPlayerShip(selectedCells: Cell[]) {
    let ship = new Ship;
    selectedCells.forEach(cell => {
      cell.setState(CellState.HAS_SHIP);
    })
    ship.setCells(selectedCells);
    this.players[0].addShip(ship);
  }

  findCellStateByPlayer(cell: Cell): string {
    this.players.forEach(player => {
      player.getShips().forEach(ship => {
        ship.getCells().forEach(cell1 => {
          if (cell.i == cell1.i && cell.j == cell1.j) {
            return player.getName();
          }
        })
      })
    });
    return "A";
  }

  createComputerShip() {
    let ship = new Ship;
    let randomCell = this.getRandomCell();
    ship.setCells(randomCell);
    randomCell.forEach(cell => {
      this._board.updateCell(cell);
    })
    this.players[1].addShip(ship);
  }

  private getRandomCell() : Cell[]{
    let cell = [];
    cell.push(new Cell(this.getRandomInt(0,this._board.size-1),this.getRandomInt(0,this._board.size-1),CellState.HAS_SHIP));
    cell.push(new Cell(this.getRandomInt(0,this._board.size-1),this.getRandomInt(0,this._board.size-1),CellState.HAS_SHIP));
    cell.push(new Cell(this.getRandomInt(0,this._board.size-1),this.getRandomInt(0,this._board.size-1),CellState.HAS_SHIP));
    return cell;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getCurrentPlayer() : Player{
      return this.currentPlayer;
  }

  process(cell: Cell) {
    // find Who is Hitting
    let playingPlayer: Player = null;
    let nonPlayingPlayer: Player = null;
    this.players.forEach( player => {
      if (player.getName() == this.currentPlayer.getName()) {
        playingPlayer = player;
      } else {
        nonPlayingPlayer = player;
      }
    });
    // Find If it is a hit
    let isHit: boolean = false;
    nonPlayingPlayer.getShips().forEach(ship => {
      isHit = ship.isHit(cell);
    });
    if (isHit) {
      nonPlayingPlayer.processHit(cell);
      if (nonPlayingPlayer.isPlayerDefeated()) {
        this._board.setState(BoardState.END);
      }
    } else {
      this.currentPlayer = nonPlayingPlayer;
    }
  }
}
