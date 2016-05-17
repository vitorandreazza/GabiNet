var app = angular.module("gabiNet");

app.controller("graficosCtrl", function ($scope, atividadeAPI) {

    $scope.setData = function (datas) {
        dataString(datas);
        console.log(datas);
        atividadeAPI.getGrafico(datas)
                .success(function (dados) {
                    $scope.labels = [];
                    $scope.data = [];
                    for (var i = 0; i < dados.length; i++) {
                        $scope.labels.push(dados[i][0]);
                        $scope.data.push(dados[i][1]);
                    }
                }).error(function (data) {
            console.log(data);
        });
    };

    dataString = function (datas) {
        var dataString;
        datas.de = new Date(datas.de.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
        datas.ate = new Date(datas.ate.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));

        dataString = datas.de.getFullYear() + "-" + (datas.de.getMonth() + 1) + "-" + datas.de.getDate();
        datas.de = dataString;
        dataString = datas.ate.getFullYear() + "-" + (datas.ate.getMonth() + 1) + "-" + datas.ate.getDate();
        datas.ate = dataString;
    };

});