const apiKey = '7b6b7220d75c52bbed85c4114e6755b7-us4';
const apiId = '7c7be738af';
const config = {username: '', dc: '', u: '', id: ''};

export interface IFormly {
    model:Object;
    fields:AngularFormly.IFieldArray;
    form:any;
    options:Object;
    onSubmit(form:IFormly):void;
}


export default class RegisterCtrl {
    formly:IFormly;
    tryAgain:boolean=false;
    isLoading:boolean = false;
    static $inject = [
        '$q',
        '$http',
        '$state'
    ];

    constructor($q, $http,$state) {
        let formlyModel = {
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
            form: {},
            options: {},
            onSubmit: (postForm)=> {
                let deferred = $q.defer();
                if (postForm.form.$valid) {
                    this.isLoading=true;
                    let params = {
                        apikey: apiKey,
                        id: apiId,
                        email: {
                            email: formlyModel.email
                        },
                        /*merge_vars are used to send extra data to mailchimp. however not knowing exactly what you called
                         first and last name in mailchimp i assumed it was this*/
                        merge_vars:{
                            FNAME:formlyModel.firstName,
                            LName:formlyModel.lastName
                        }
                    };
                    var cors_api_host = 'cors-anywhere.herokuapp.com';
                    var cors_api_url = 'https://' + cors_api_host + '/';

                    let url = 'https://us4.api.mailchimp.com/2.0/lists/subscribe.json';
                    return $http({
                        url: cors_api_url+url,
                        data: params,
                        method: 'POST'
                    }).then( (data) =>{
                        this.isLoading=false;
                        if (data.data) {
                            deferred.resolve(data.data);
                            $state.go('app.success');
                        }
                        else {
                            this.tryAgain = true;
                            deferred.reject(data.data);
                        }

                    }, function (err) {
                        deferred.reject(err);
                    });

                }
                else {
                    deferred.resolve(false);
                }
                
                return deferred.promise;
            }
        };

    }

    subscribe(data) {
        var params = angular.extend(data, {u: config.u, id: config.id, c: 'JSON_CALLBACK'});
    }
}
