var app = angular.module("gabiNet");
app.controller("graficosCtrl", function ($scope, atividadeAPI) {

    $scope.setData = function (datas) {
        dataString(datas);
        console.log(datas);
        atividadeAPI.getGrafico(datas)
            .success(function (data) {
                $scope.grafico = data;
                $scope.labels = [];
                $scope.data = [[],[]];
                $scope.series = ['Aprovado', 'Reprovado'];
                delete $scope.datas;
                $scope.graficoForm.$setPristine();
                for (var i = 0; i < $scope.grafico.length; i++) {
                    $scope.labels[i] = [$scope.grafico[i]['0']];
                    $scope.data[i] = [[$scope.grafico[i]['1']],[0]];
                }
            }).error(function (data) {
                console.log(data);
        });
    };
    
    dataString = function(datas) {
        var dataString;
        datas.de = new Date(datas.de.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
        datas.ate = new Date(datas.ate.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
        
        dataString = datas.de.getFullYear()+"-"+(datas.de.getMonth()+1)+"-"+datas.de.getDate();
        datas.de = dataString;
        dataString = datas.ate.getFullYear()+"-"+(datas.ate.getMonth()+1)+"-"+datas.ate.getDate();
        datas.ate = dataString;  
    };

});