var app = angular.module("gabiNet");

app.controller("atividadesCtrl", function ($scope, atividadeAPI, atividades, $route) {
    $scope.atividades = atividades.data;

    $scope.excluiAtividade = function (id) {
        if (confirm("Confirma a exclusão da Atividade?")) {
            atividadeAPI.deleteAtividade(id)
                    .success(function () {
                        $route.reload();
                    });
        }
    };

});

app.controller("novaAtividadeCtrl", function ($scope, atividadeAPI, $location) {
    $scope.novaAtividade = function (atividade) {
        atividadeAPI.novaAtividade(atividade)
                .success(function () {
                    delete $scope.atividade;
                    $scope.AtividadeForm.$setPristine();
                    $location.path("/atividades");
                });
    };
});

app.controller("atividadeCtrl", function ($scope, atividade, atividadeAPI, $location) {
    $scope.atividade = atividade.data;
    console.log($scope.atividade);
    $scope.alterarAtividade = function (atividade) {
        atividadeAPI.setAtividade(atividade)
                .success(function () {
                    $location.path("/atividades");
                });
    };

    $scope.gerarPdf = function () {
        var doc = new jsPDF();
        var x = 20, y = 0;
        //doc.setFont("courier");
        
        doc.setFontSize(20);
        //doc.setFontType("bold");
        y += 20;
        doc.text(x+65, y, 'Atividade');
        
        doc.setFontSize(12);
        doc.setFontType("bold");
        y += 20;
        doc.text(x, y, 'Tipo:');
        
        doc.setFontSize(11);
        doc.setFontType("normal");
        y += 5;
        doc.text(x, y, $scope.atividade.tipo);
        
        if ($scope.atividade.tipo === "Moções") {
            doc.setFontSize(12);
            doc.setFontType("bold");
            y += 10;
            doc.text(x, y, 'Tipo da moção:');

            doc.setFontSize(11);
            doc.setFontType("normal");
            y += 5;
            doc.text(x, y, $scope.atividade.tipoMocao);
        }
        
        doc.setFontSize(12);
        doc.setFontType("bold");
        y += 10;
        doc.text(x, y, 'Ementa:');
        
        doc.setFontSize(11);
        doc.setFontType("normal");
        y += 5;
        doc.text(x, y, $scope.atividade.ementa);

        
        doc.save('PDF.pdf');
    };
});