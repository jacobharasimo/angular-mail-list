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
        '$state',
        'registerService'
    ];

    constructor($q, $state, private registerService) {
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
            onSubmit: (postForm:IFormly)=> {
                let deferred = $q.defer();
                if (postForm.form.$valid) {
                    this.isLoading = true;
                    this.tryAgain = false;
                    this.registerService.register(postForm.model).then(
                        (suc)=>{
                            this.isLoading = false;
                            if (suc) {
                                $state.go('app.success');
                            }
                            this.tryAgain = true;
                        },
                        (err)=>{
                            this.isLoading = false;
                            this.tryAgain = true;
                        }
                    );

                }
                else {
                    this.isLoading = false;
                    deferred.resolve(false);
                }

                return deferred.promise;
            }
        };

    }
}
