import {Component, HostListener, OnInit} from '@angular/core';
import {Item} from '../../models/item';
import {GameService} from '../../services/game.service';

const colorMap: {[k: number]: string} = {
  2: '#8A33FF',
  4: '#ACFF33',
  8: '#FFBB33',
  16: '#33CAFF',
  32: '#FF8033',
  64: '#C70039',
  128: '#518853',
  256: '#ff606f',
  512: '#334FFF',
  1024: '#CFD2D2',
  2048: '#FF33B2'
};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  keyEventCodeMap: {[type: string]: string} = {
    ArrowRight: 'right',
    ArrowLeft: 'left',
    ArrowUp: 'up',
    ArrowDown: 'down'
  };

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
  }

  getStyles(item: Item): {[p: string]: string} {
    const top = (item.row * 110 - 100) + 'px';
    const left = (item.col * 110 - 100) + 'px';
    return {
      top,
      left,
      'background-color': colorMap[item.value] || 'black',
      'font-size': item.value >= 10000 ? '30px' : '50px'
    };
  }

  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent) {
    if (this.keyEventCodeMap[event.code]) {
      this.gameService[this.keyEventCodeMap[event.code]]();
    }
  }
}
