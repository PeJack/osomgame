export class MainApp {
    public dataModifer: string = 'works';

    constructor(data: string) {
        this.dataModifer += data;
    }

    showData(data = this.dataModifer): string {
        let newData = this.dataModifer.toUpperCase();
        return newData;
    }
}