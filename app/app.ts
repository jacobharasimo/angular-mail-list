/*app entry*/
import * as angular from 'angular';

/* App Styles */
import './styles/main.scss';

/* Internal Modules*/
import Components from './components';

const app = angular.module('app', [
    'ngAnimate',
    'ngResource',
    'ngAria',
    'ngMessages',
    'ui.router',
    'ui.bootstrap',
    'formly',
    'formlyBootstrap'
]);

Components(app);
