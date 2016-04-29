export default class FormlyConfig{
    static $inject=[
        'formlyConfigProvider'
    ];
    constructor(formlyConfigProvider){
        formlyConfigProvider.setWrapper({
            name: 'bootstrapHasError',
            template: require('./validation.html'),
            overwriteOk:true
        });
    }
}
