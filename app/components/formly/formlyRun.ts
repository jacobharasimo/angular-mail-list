export default class FormlyRun {
    static $inject = [
        'formlyConfig',
        'formlyValidationMessages'
    ];

    constructor(formlyConfig,formlyValidationMessages) {
        formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
        formlyValidationMessages.addTemplateOptionValueMessage('email', 'emailValidationMessage', '', '', 'Invalid email address');
        formlyValidationMessages.addTemplateOptionValueMessage('required', 'requiredValidationMessage', '', '', 'This field is required');
    }
}
