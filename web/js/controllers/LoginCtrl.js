var app = angular.module("gabiNet");

app.controller("loginCtrl", function ($scope, loginAPI, $location, $rootScope, $cookies, usuarioLogado) {
    $scope.logado = $cookies.get('usuarioLogado');
    $scope.nome = usuarioLogado.nomeUsuario;
    $scope.validarLogin = function (usuario) {
        loginAPI.getUsuario(usuario)
                .success(function (data) {
                    if (data === true) {
                        $location.path("/index");
                        var nomeUsuario = usuario.login.toUpperCase();
                        var dataExpiracao = new Date();
                        dataExpiracao.setMinutes(dataExpiracao.getMinutes() + 30);
                        $cookies.put('nomeUsuarioLogado', nomeUsuario, {'expires': dataExpiracao});
                        $cookies.put('usuarioLogado', 'true', {'expires': dataExpiracao});
                        $rootScope.usuarioLogado = true;
                        usuarioLogado.nomeUsuario = nomeUsuario;
                    loginAPI.getID(usuario.login)
                            .success(function (data) {
                                usuarioLogado.id = data;
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
        usuarioLogado.nomeUsuario = '';
        usuarioLogado.id = '';
        $rootScope.usuarioLogado = false;
        $location.path("/login");
    };
});