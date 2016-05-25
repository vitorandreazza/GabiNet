var app = angular.module("gabiNet");
app.controller("graficosCtrl", function ($scope, atividadeAPI) {

    $scope.setData = function (datas) {
        dataString(datas);
        console.log(datas);
        atividadeAPI.getGrafico(datas)
            .success(function (dados) {
//                $scope.labels = [];
//                $scope.data = {
//                    labels: [],
//                    datasets: [{
//                        label: "Quantidade",
//                        backgroundColor: "rgba(255,99,132,0.2)",
//                        borderColor: "rgba(255,99,132,1)",
//                        borderWidth: 1,
//                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
//                        hoverBorderColor: "rgba(255,99,132,1)",
//                        data: []
//                    }]
//                };
//                $scope.series = ['Aprovado', 'Reprovado'];
//                delete $scope.datas;
//                $scope.graficoForm.$setPristine();
//                console.log(dados);
//                console.log(dados[1][1]);
                $scope.labels = [];
                $scope.data = [];
                
                for (var i = 0; i < dados.length; i++) {
//                    $scope.data.labels.push(dados[i][0]);
//                    $scope.data.datasets[0].data.push(dados[i][1]);
//                    $scope.data[1][i] = [$scope.grafico[i]['1']];
                    $scope.labels.push(dados[i][0]);
                    $scope.data.push(dados[i][1]);
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