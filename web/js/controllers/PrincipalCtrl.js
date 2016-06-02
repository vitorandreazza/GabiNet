var app = angular.module("gabiNet");
app.controller("principalCtrl", function ($scope, atividadeAPI, atendimentos, atividades, $cookies) {
    $scope.atendimentos = atendimentos.data;
    $scope.atividades = atividades.data;

    $scope.setData = function () {
        datas = {};
        dataString(datas);     
        atividadeAPI.getGrafico(datas, $cookies.get('id'))
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
        datas.de = new Date();
        datas.ate = new Date();

        dataString = datas.de.getFullYear() + "-" + (datas.de.getMonth()) + "-" + datas.de.getDate();
        datas.de = dataString;
        dataString = datas.ate.getFullYear() + "-" + (datas.ate.getMonth() + 1) + "-" + datas.ate.getDate();
        datas.ate = dataString;
    };
 
});

