import {ISubscriber} from './registerCtrl';


export default class RegisterService {
    static $inject = [
        '$http',
        '$q'

    ];
    corsApiUrl:string;
    apiKey:string;
    apiId:string;


    constructor(private $http:ng.IHttpService, private $q:ng.IQService) {
        this.corsApiUrl = 'https://cors-anywhere.herokuapp.com/';
        this.apiKey = '7b6b7220d75c52bbed85c4114e6755b7-us4';
        this.apiId = '7c7be738af';
    }


    register(person:ISubscriber) {
        let deferred = this.$q.defer();
        let params = {
            apikey: this.apiKey,
            id: this.apiId,
            email: {
                email: person.email
            },
            /*merge_vars are used to send extra data to mailchimp. however not knowing exactly what you called
             first and last name in mailchimp i assumed it was this*/
            merge_vars: {
                FNAME: person.firstName,
                LName: person.lastName
            }
        };
        let url = 'https://us4.api.mailchimp.com/2.0/lists/subscribe.json';
        this.$http({
            url: this.corsApiUrl + url,
            data: params,
            method: 'POST'
        }).then((data) => {
            if (data.data) {
                deferred.resolve(data.data);
            }
            else {
                deferred.reject(data.data);
            }

        }, (err) => {
            deferred.reject(err);
        });
        return deferred.promise;

    }
}
