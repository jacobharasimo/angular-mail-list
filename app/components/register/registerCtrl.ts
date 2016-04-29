const apiKey = '7b6b7220d75c52bbed85c4114e6755b7';
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
    static $inject = [
        '$q',
        '$http'
    ];

    constructor($q, $http) {
        let formlyModel = {
            firstName: '',
            lastName: '',
            email: ''
        };
        //seed

        formlyModel={
            firstName: 'me',
            lastName: 'notu',
            email: 'me@notu.ca'
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
                postForm.form.$setSubmitted();
                let deferred = $q.defer();
                let params = {
                    apikey: apiKey,
                    id: apiId,
                    email: {
                        email: formlyModel.email
                    },
                    merge_vars:{
                        FNAME:formlyModel.firstName,
                        LNAME:formlyModel.lastName
                    }
                };
                var cors_api_host = 'cors-anywhere.herokuapp.com';
                var cors_api_url = 'https://' + cors_api_host + '/';

                let url = 'https://us4.api.mailchimp.com/2.0/lists/subscribe';
                if (postForm.form.$valid) {
                    $http({
                        url: url,
                        params: params,
                        method: 'JSONP'
                    }).then(function (data) {
                        if (data.data.result === 'success') {
                            deferred.resolve(data.data);
                        }
                        else {
                            deferred.reject(data.data);
                        }

                    }, function (err) {
                        deferred.reject(err);
                    });

                    deferred.resolve(true);
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
