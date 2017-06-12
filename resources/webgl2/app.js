import {Game} from './game';
import {canvas} from './utils';

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame	   ||
		 window.webkitRequestAnimationFrame ||
		 window.mozRequestAnimationFrame	||
		 function(callback) { window.setTimeout(callback, 1000 / 60); };
})();

loadGame();

function loadGame() {
	if(!canvas) {
		window.setTimeout(loadGame, 100);
		return;
	}
	new Game();
}