import {gl} from './webgl';

export class TextureAtlas {
    constructor(url,tileSize) {
        this.tileSizePx = tileSize;
		this.imageSizePx = 0;
		this.tileSizeNormalized = 0;
		this.tilesPerRow = 0;
		this.paddingNormalized = 0;
		this.texture = null;

		this.loadTexture(url);
    };

    loadTexture(url) {
		var self = this;
	    self.texture = gl.createTexture();
	    self.texture.image = new Image();

	    self.texture.image.onload = function() { 
            self.handleTexture(self.texture.image, self.texture); 
        };
	    self.texture.image.src = url;
    };

	handleTexture(image, texture) {
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.bindTexture(gl.TEXTURE_2D, null);	
		this.texture = texture;
		this.imageSizePx = image.width; // width must equal height	
		this.tileSizeNormalized = this.tileSizePx/this.imageSizePx;
		this.paddingNormalized = 0.5/this.imageSizePx;
		this.tilesPerRow = Math.floor(this.imageSizePx/this.tileSizePx);
	};

		/** Based on tile number, get the s and t coordinate ranges of the tile.
		returns array of format [s1,t1,s2,t2] */
	getST(tileNum) {
		let stRange = [
			this.tileSizeNormalized * (tileNum % this.tilesPerRow) + this.paddingNormalized,
			this.tileSizeNormalized * Math.floor(tileNum / this.tilesPerRow) + this.paddingNormalized,
		];
		stRange[2] = stRange[0] + this.tileSizeNormalized - this.paddingNormalized*1.5;
		stRange[3] = stRange[1] + this.tileSizeNormalized - this.paddingNormalized*1.5;
		return stRange;
	}
}