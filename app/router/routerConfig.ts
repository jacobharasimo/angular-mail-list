export default class RouteConfig{
    static $inject=[
        '$uiViewScrollProvider',
        '$logProvider',
        '$urlRouterProvider',
        '$stateProvider'
    ];
    constructor($uiViewScrollProvider,$logProvider,$urlRouterProvider,$stateProvider){
        $uiViewScrollProvider.useAnchorScroll();
        $logProvider.debugEnabled(true);
        $urlRouterProvider.otherwise('/register');
        $stateProvider
            .state('app',{
                abstract:true,
                url:'',
                resolve:{},
                views:{

                }
            })
            .state('app.register',{
                url:'/register',
                resolve:{},
                views:{
                    'content@':{
                        template: require('../components/register/register.html'),
                        resolve:{},
                        controller:'registerCtrl',
                        controllerAs:'register'

                    }
                }
            })
            .state('app.success',{
                url:'/register',
                resolve:{},
                views:{}
            })
        ;
    }
}
