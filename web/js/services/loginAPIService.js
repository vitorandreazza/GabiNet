angular.module("gabiNet").factory("loginAPI", function ($http, config) {
    var _getUsuario = function (usuario) {
        return $http.get(config.baseUrl + "/login/" + usuario.login + "/" + usuario.senha);
    };
    
    var _getID = function (login) {
        return $http.get(config.baseUrl + "/login/" + login);
    };
    
    return {
        getUsuario: _getUsuario,
        getID: _getID
    };
});