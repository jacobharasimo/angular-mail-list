
import RegisterPage from './register';
import SuccessPage from './success';
import FormlyConfig from './formly';

export default(app) =>{
    RegisterPage(app);
    SuccessPage(app);
    FormlyConfig(app);
};
