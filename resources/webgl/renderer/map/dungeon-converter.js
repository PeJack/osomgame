import {Dungeon} from './dungeon';

export class DungeonConverter {
    constructor(level) {
        this.level = level;
        this.cubes = [];
		this.upstairs = [0,0,0];
		this.downstairs = [0,0,0];
		this.tileDim = level.tileDim;
		this.roomDim = level.roomDim;
		this.roomMinSize = level.roomMinSize;
		this.dungeon = new Dungeon(this.tileDim, this.roomDim, this.roomMinSize);

		for (var z = 0; z<2; z++) {
			this.cubes[z] = [];
			for (var y = 0; y < this.dungeon.tileDim[1]; y++) {
				this.cubes[z][y] = [];
				for (var x = 0; x < this.dungeon.tileDim[0]; x++) {
					switch(this.dungeon.tiles[x][y]) {
					case this.dungeon.tileVals.empty:
						this.cubes[z][y][x] = 0; break;
					case this.dungeon.tileVals.wall:
						this.cubes[z][y][x] = this.getWall(z); break;
					case this.dungeon.tileVals.floor:
						this.cubes[z][y][x] = this.getFloor(z); break;
					case this.dungeon.tileVals.up:
						this.cubes[z][y][x] = this.getUp(z); 
						this.upstairs = [x,y,1.2];
						break;
					case this.dungeon.tileVals.down:
						this.cubes[z][y][x] = this.getDown(z); 
						this.downstairs = [x,y,1.2];
						break;
					}
				}
			}
		}

    } 
    
    randFromArray(arr) {
		return arr[Math.floor(Math.random()*arr.length)];
	}

	getWall(z) {
		if (z == 0)
			return 0;
		return this.randFromArray(this.level.wallTiles);
	}

	getFloor(z) {
		if (z > 0)
			return 0;
		return this.randFromArray(this.level.floorTiles);
	}

	getUp(z) {
		if (z > 0)
			return 0;
		return 212;
	}

	getDown(z) {
		if (z > 0)
			return 0;
		return 211;
	}   
}