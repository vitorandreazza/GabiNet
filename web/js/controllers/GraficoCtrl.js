var app = angular.module("gabiNet");
app.controller("graficosCtrl", function ($scope, grafico) {
    $scope.grafico = grafico.data;
    
    $scope.labels = ['Projeto de lei', 'Indicações', 'Requerimento', 'Oficios', 'Moções'];
    $scope.series = ['Aprovado', 'Reprovado'];

    $scope.data = [
        [$scope.grafico[0]['1'], $scope.grafico[1]['1'], 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
});