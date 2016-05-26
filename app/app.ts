require('file?name=../[name].[ext]!./index.html');
/*app entry*/
import * as angular from 'angular';

/* App Styles */
import './styles/main.scss';

/* Internal Modules*/
import Router from './router';
import Components from './components';

const app = angular.module('app', [
    'ngAnimate',
    'ngResource',
    'ngAria',
    'ngMessages',
    'ui.router',
    'ui.bootstrap',
    'formly',
    'formlyBootstrap',
    'angular-ladda'
]);

Router(app);
Components(app);
