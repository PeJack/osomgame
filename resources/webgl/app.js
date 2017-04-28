import {Game} from './game';
import {canvas} from './utils/canvas';

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame	   ||
		 window.webkitRequestAnimationFrame ||
		 window.mozRequestAnimationFrame	||
		 function(callback) { window.setTimeout(callback, 1000 / 60); };
})();

Number.prototype.clamp = function(min, max) {
	return (this < min ? min : (this > max ? max : this));
};

loadGame();

function loadGame() {
	if(!canvas) {
		window.setTimeout(loadGame, 100);
		return;
	}
	new Game();
}