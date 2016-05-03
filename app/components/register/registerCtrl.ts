export interface ISubscriber{
    firstName: string;
    lastName: string;
    email: string;
}
export interface IFormly {
    model:ISubscriber;
    fields:AngularFormly.IFieldArray;
    form?:any;
    options?:Object;
    onSubmit(form:IFormly):void;
}


export default class RegisterCtrl {
    formly:IFormly;
    tryAgain:boolean=false;
    isLoading:boolean = false;
    static $inject = [
        '$q',
        '$http',
        '$state',
        'registerService'
    ];

    constructor($q, $http,$state, private registerService) {
        let formlyModel:ISubscriber = {
            firstName: '',
            lastName: '',
            email: ''
        };

        this.formly = {
            model: formlyModel,
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
            onSubmit: (postForm)=> {
                let deferred = $q.defer();
                if (postForm.form.$valid) {
                    this.isLoading = registerService.isLoading;
                    this.tryAgain = registerService.hasError;
                    this.registerService.register(postForm.model).then(
                        (suc)=>{
                            console.log(suc);

                            //$state.go('app.success');
                        },
                        (err)=>{
                            console.log(err);
                        }
                    );

                }
                else {
                    this.tryAgain = true;
                    deferred.resolve(false);
                }

                return deferred.promise;
            }
        };

    }
}
