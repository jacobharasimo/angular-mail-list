import FormlyConfig from './formlyConfig';
import FormlyRun from './formlyRun';

export default (app)=>{
    app.config(FormlyConfig);
    app.run(FormlyRun);
}

