window.game = window.game || {};

window.game.helpers = {
    componentToHex: function(c) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },

    rgbToHex: function(r, g, b) {
        if(r < 0) r = 0;
        if(g < 0) g = 0;
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    },  

    polarToCartesian: function(len, dir) {
        return {
            x: len * Math.cos(dir),
            y: len * Math.sin(dir)
        }
    },

   // Convert radians to degrees (1 radian = 57.3 degrees => PI * radian = 180 degrees)
	radToDeg: function(radians) {
		return radians * (180 / Math.PI);
	},
    
	// Convert degrees to radians
	degToRad: function(degrees) {
		return degrees * Math.PI / 180;
	},
};
