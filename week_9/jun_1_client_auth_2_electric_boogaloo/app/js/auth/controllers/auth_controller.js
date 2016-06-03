module.exports = function(app) {
  app.controller('AuthController', ['cfAuth', 'cfHandleError',  '$location', function(auth, handleError, $location) {
    this.username = '';
    this.errors = [];
    this.getUsername = function() {
      // AUTH_EXP: What happens when this function is called?
      // First, it runs the getUsername method from the cfAuth factory
      //  in the services/auth_service file (starting at line 3)
      // It then calls a promise that takes currentUser as a parameter,
      //   and assigns this value to username in the AuthController scope.
      // It also includes an error handler that passes the errors array to the
      //  cfHandleError service.
      // Finally, the this context is bound to the AuthController.


      auth.getUsername()
        .then((currentUser) => {
          this.username = currentUser;
        }, handleError(this.errors, 'could not get username'));
    }.bind(this);

    this.logout = function() {
      auth.removeToken();
      this.username = '';
      $location.path('/signin');
    }.bind(this);
  }]);
};
