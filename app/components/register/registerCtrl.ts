export interface IFormly {
    model:Object;
    fields:AngularFormly.IFieldArray;
    form:any;
    options:Object;
    onSubmit(form:IFormly):void;
}


export default class RegisterCtrl {
    formly:IFormly;
    static $inject = [
        '$q'
    ];

    constructor($q) {
        
        this.formly = {
            model: {
                firstName: '',
                lastName: '',
                email: ''
            },
            fields: [
                {
                    key: 'firstName',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'First name',
                        required: true,
                        requiredValidationMessage: 'First Name required'
                    }
                },
                {
                    key: 'lastName',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Last Name',
                        required: true,
                        requiredValidationMessage: 'Last Name required'
                    }
                },
                {
                    key: 'email',
                    type: 'input',
                    templateOptions: {
                        type: 'email',
                        label: 'Email Address',
                        required: true,
                        requiredValidationMessage: 'Email Address required'
                    }
                }
            ],
            form: {},
            options: {},
            onSubmit: (postForm)=> {
                postForm.form.$setSubmitted();
                let deferred = $q.defer();
                if (postForm.form.$valid) {
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
                return deferred.promise;
            }
        };
    }
}
