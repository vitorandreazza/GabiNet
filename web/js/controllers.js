var app = angular.module("gabiNet");
var urlBase = 'http://localhost:8084/GabiNet';

app.controller("cidadaoController", function ($scope, $http) {
    $scope.novoCidadao = function (cidadao) {
        $http.post(urlBase + "api/cidadaos", cidadao).success(function (data) {
            console.info(JSON.stringify("Cidadao salvo com sucesso!: " + data));
            alert("cidadao cadastrado com sucesso");
        }).error(function (error) {
            console.error(JSON.stringify("Erro ao incluir o cidadao: " + error));
            alert(JSON.stringify("Erro ao incluir o cidadao: " + error));
        });
    };
    $scope.buscaCidadao = function (cpf) {
        $http.get(urlBase + "/api/cidadaos/"+cpf).success(function (data) {
                    $scope.cidadao = data;
                })
                .error(function () {
                    console.log('Erro ao obter os dados do cidadao');
                    $scope.cidadao = "ERRO ao efetuar o SELECT!";
                });
        //$scope.cidadao = [];
    };
});

app.controller("graficosController", function ($scope) {
    $scope.labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    $scope.series = ['Aprovado', 'Reprovado'];

    $scope.data = [
        [5, 9, 8, 8, 10, 4, 5, 8, 7, 5, 9, 4],
        [2, 3, 4, 4, 2, 1, 5, 6, 6, 4, 2, 6]
    ];
});
