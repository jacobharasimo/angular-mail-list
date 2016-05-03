export default class SuccessCtrl {
    static $inject = [
        '$state'
    ];

    constructor($state) {
        $state.go('app.register');
    }

}
