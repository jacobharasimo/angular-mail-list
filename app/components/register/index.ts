import RegisterCtrl from './registerCtrl';
import RegisterService from './registerService';
export default (app) => {
    app.controller('registerCtrl', RegisterCtrl);
    app.service('registerService', RegisterService);
}
