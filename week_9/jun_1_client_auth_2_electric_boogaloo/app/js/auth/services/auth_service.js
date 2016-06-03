var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.factory('cfAuth', ['$http', '$q', function($http, $q) {
    // AUTH_EXP: explain what each of these functions are accomplishing and
    // what data we're storing in this service
    //  removeToken: this function is essential to the logout process because it clears
    //    out all the login information. It sets to null the token, username,
    //    and headers. It also sets the localStorage token to an empty string.
    //  saveToken: is the complementary function to removeToken. It takes the token argument
    //    passed to it and assigns the values to the controller-scoped token on the backend,
    //    and the window localStorage token on the front end.
    //  getToken: checks for the existence of a backend token, if it does not exist,
    //    looks at localStorage. If it needs the localStorage token, it passes the value of
    //    localStorage token into the saveToken function. It exposes the value of the token
    //    for other functions to use.
    //  getUsername: returns a promise that checks for the existence of a username. If it exists,
    //    it resolves the username. It then runs the getToken function, and if getToken returns false,
    //    then getUsername rejects the promise with a error. If both conditions are true, it then uses
    //    the $http.get method to redirect the user to the profile view. AND THEN, it assigns the value
    //    of res.data.username to the username scoped to the controller, and attempts to resolve it.
    //    An empty reject is passed in to satisfy the promise library expectations.
    //    AND THEN, the scope is bound to the controller scope. AND THEN...no and then.

    return {
      removeToken: function() {
        this.token = null;
        this.username = null;
        $http.defaults.headers.common.token = null;
        window.localStorage.token = '';
      },
      saveToken: function(token) {
        this.token = token;
        $http.defaults.headers.common.token = token;
        window.localStorage.token = token;
        return token;
      },
      getToken: function() {
        this.token || this.saveToken(window.localStorage.token);
        return this.token;
      },
      getUsername: function() {
        return $q(function(resolve, reject) {
          if (this.username) return resolve(this.username);
          if (!this.getToken()) return reject(new Error('no authtoken'));
          $http.get(baseUrl + '/api/profile')
            .then((res) => {
              this.username = res.data.username;
              resolve(res.data.username);
            }, reject);
        }.bind(this));
      }
    }
  }]);
};
