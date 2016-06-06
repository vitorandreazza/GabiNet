var app = angular.module("gabiNet");

app.controller("loginCtrl", function ($scope, loginAPI, $location, $rootScope, $cookies) {
    $scope.logado = $cookies.get('usuarioLogado');
    $scope.nome = $cookies.get('nomeUsuarioLogado');
    $scope.validarLogin = function (usuario) {
        loginAPI.getUsuario(usuario)
                .success(function (data) {
                    if (data === true) {
                        var nomeUsuario = usuario.login.toUpperCase();
                        $cookies.put('nomeUsuarioLogado', nomeUsuario);
                        $cookies.put('usuarioLogado', 'true');
                        $rootScope.usuarioLogado = true;
                    loginAPI.getID(usuario.login)
                            .success(function (data) {
                                $cookies.put('id', data.id);
                                if(data.idPai === null)
                                    $cookies.put('idPai', data.id);
                                else
                                $cookies.put('idPai', data.idPai.id);
                                $location.path("/index");
                            });
                    } else {
                        $rootScope.usuarioLogado = false;
                        $scope.erro = true;
                    }
                });

    };

    $scope.logout = function () {
        $cookies.remove('nomeUsuarioLogado');
        $cookies.remove('usuarioLogado');
        $cookies.remove('id');
        $rootScope.usuarioLogado = false;
        $location.path("/login");
    };
});