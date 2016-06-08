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

app.controller("novaAtividadeCtrl", function ($scope, atividadeAPI, $location, $cookies) {
    $scope.novaAtividade = function (atividade) {
        atividade.usuario = {};
        atividade.usuario.id = $cookies.get('id');
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
    $scope.alterarAtividade = function (atividade) {
        atividadeAPI.setAtividade(atividade)
                .success(function () {
                    $location.path("/atividades");
                });
    };

    $scope.gerarPdf = function () {
        var doc = new jsPDF();
        var x = 20, y = 0;
        var dataATV = new Date($scope.atividade.dataAtividade);
        var dataString = dataATV.getDay()-1 + "/" + (dataATV.getMonth() + 1) + "/" + dataATV.getFullYear();
        $scope.atividade.dataAtividade = dataString;
        doc.setFont("helvetica");
        var imgData = 'data:image/jpeg;base64,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'; 

        doc.addImage(imgData, 'JPEG', 20, 15, 16, 16);
        doc.setFontSize(11);
        doc.setFontType("bold");
        //y += 20;

        doc.text(x+35, y+20, 'CÂMARA DE VEREADORES DA ESTÂNCIA TURÍSTICA DE ITU');
        doc.text(x+35, y+30, 'VEREADOR PROF. JOÃO CARLOS DE CAMPOS FEITAL');
        doc.text(x+85, y+35, 'PDT');
        doc.text(x, y+50, 'ATIVIDADE Nº '+$scope.atividade.id+ ' - DATA: '+$scope.atividade.dataAtividade);
        
        doc.setFontSize(11);
        doc.setFontType("bold");
        y += 60;
        doc.text(x, y, 'TIPO DA ATIVIDADE:');
      
        doc.setFontSize(11);
        doc.setFontType("normal");
        y += 5;
        doc.text(x, y, $scope.atividade.tipo);
        
        if ($scope.atividade.tipo === "Moções") {
            doc.setFontSize(11);
            doc.setFontType("bold");
            y += 10;
            doc.text(x, y, 'Tipo da moção:');

            doc.setFontSize(11);
            doc.setFontType("normal");
            y += 5;
            doc.text(x, y, $scope.atividade.tipoMocao);
        }
        
        doc.setFontSize(11);
        doc.setFontType("bold");
        y += 10;
        
        doc.text(x, y, 'EMENTA:');
        
        doc.setFontSize(11);
        doc.setFontType("normal");
        var texto = doc.splitTextToSize($scope.atividade.ementa, 180);
        for(var i=0; i< texto.length; i++) {
            y += 5;
            doc.text(x, y, texto[i]);
        }
        
        
        doc.save('PDF.pdf');
    };
});