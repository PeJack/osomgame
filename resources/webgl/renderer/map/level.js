export class Level {
    constructor(ambient,floorTiles,wallTiles,tileDim,roomDim,roomMinSize) {
      this.ambient = ambient;
      this.floorTiles = floorTiles;
      this.wallTiles = wallTiles;  
      this.tileDim = tileDim;
      this.roomDim = roomDim;
      this.roomMinSize = roomMinSize;
    }
} 