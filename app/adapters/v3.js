import Ember from 'ember';
import DS from 'ember-data';
import config from 'travis/config/environment';

export default DS.RESTAdapter.extend({
  auth: Ember.inject.service(),
  host: config.apiEndpoint,

  defaultSerializer: 'v3',

  sortQueryParams: false,
  coalesceFindRequests: false,
  headers: {
    'Travis-API-Version': '3',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  ajaxOptions: function(url, type, options) {
    var hash = this._super(...arguments);

    hash.headers = hash.headers || {};

    var token;
    if(token = this.get('auth').token()) {
      hash.headers['Authorization'] = "token " + token;
    }

    return hash;
  }
});
