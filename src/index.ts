import {MainApp} from './app/app';

class IndexApp{
    public newString: string = '';

    constructor(app: MainApp){
        this.newString = app.showData();
        console.log(this.newString)
    }
}

new IndexApp(new MainApp('ts'));