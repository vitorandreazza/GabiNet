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
    
    $scope.combo = {
        //opcoes para o select| procura e a chave e o valor que sera procurado no filtro
        opcoes: [
            {name: 'Tudo', procura: {$: ''}},
            {name: 'Nº Atividade', procura: {id: ''}},
            {name: 'Tipo Atividade', procura: {tipo: ''}},
            {name: 'Ementa', procura: {ementa: ''}},
            {name: 'Data', procura: {dataAtividade: ''}}
        ],
        //opção default do select e option selecionado do select
        opcaoSelecionada: {name: 'Nº Atividade', procura: {id: ''}}
    };

    $scope.selecionaKey = function () {
//        if ($scope.combo.opcaoSelecionada.name === "Nome cidadão") {
//            $scope.combo.opcaoSelecionada.procura.cidadao.nome = $scope.textoBusca;
//            return;
//        }

        if ($scope.combo.opcaoSelecionada.name === "Data") {
            var splitted = $scope.textoBusca.split("/");
            var date = "";
            if (splitted.length < 2) {
                //busca apenas o dia
                date = $scope.textoBusca;
            } else if (splitted.length < 3) {
                //busca o dia com o mes
                date = splitted[1] + "-" + splitted[0];
            } else {
                //busca a data toda
                date = splitted[2] + "-" + splitted[1] + "-" + splitted[0];
            }
            //$scope.combo.opcaoSelecionada.procura[Object.keys($scope.combo.opcaoSelecionada.procura)[0]] = date;
            $scope.combo.opcaoSelecionada.procura.dataAtividade = date;
            return;
        }
        $scope.combo.opcaoSelecionada.procura[Object.keys($scope.combo.opcaoSelecionada.procura)[0]] = $scope.textoBusca;
    };

    $scope.mudou = function () {
        console.log($scope.combo.opcaoSelecionada.name);
        if ($scope.combo.opcaoSelecionada.name === "Data") {
            //adiciona mascara quando a procura e por data
            $scope.html = '<input type="text" mask="99/99/9999" ng-model="textoBusca" class="form-control" ng-keyup="selecionaKey()" placeholder="Buscar Atendimento"><br>';
            $scope.textoBusca = "";
        } else {
            //tira a mascara
            $scope.html = '<input type="text" ng-model="textoBusca" class="form-control" ng-keyup="selecionaKey()" placeholder="Buscar Atendimento"><br>';
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