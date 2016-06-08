var app = angular.module("gabiNet");

app.controller("cidadaosCtrl", function ($scope, cidadaoAPI, cidadaos, $route, $location, cidadaoSelecionado) {
    $scope.cidadaos = cidadaos.data;
    
    $scope.combo = {
        //opcoes para o select| procura e a chave e o valor que sera procurado no filtro
        opcoes: [
            {name: 'Tudo', procura: {$: ''}},
            {name: 'Nome', procura: {nome: ''}},
            {name: 'Cpf', procura: {cpf: ''}}
        ],
        //opção default do select e option selecionado do select
        opcaoSelecionada: {name: 'Nome', procura: {id: ''}}
    };

    $scope.selecionaKey = function () {
        $scope.combo.opcaoSelecionada.procura[Object.keys($scope.combo.opcaoSelecionada.procura)[0]] = $scope.textoBusca;
    };
    
    $scope.mudou = function () {
        console.log($scope.combo.opcaoSelecionada.name);
        if ($scope.combo.opcaoSelecionada.name === "Cpf") {
            //adiciona mascara quando a procura e por data
            $scope.html = '<input type="text" mask="999.999.999-99" ng-model="textoBusca" class="form-control" ng-keyup="selecionaKey()" placeholder="Buscar Atendimento"><br>';
            $scope.textoBusca = "";
        } else {
            //tira a mascara
            $scope.html = '<input type="text" ng-model="textoBusca" class="form-control" ng-keyup="selecionaKey()" placeholder="Buscar Atendimento"><br>';
        }
    };
    
    $scope.excluiCidadao = function (cpf) {
        cpf = cpf.replace(".", "").replace(".", "").replace("-", "");
        if (confirm("Confirma a exclusão do cidadão?")) {
            cidadaoAPI.deleteCidadao(cpf)
            .success(function () {
                $route.reload();
            })
            .error(function () {
                alert("Vinculado com algum Atendimento!");
            });
        }
    };
    
    $scope.redirecionaCidadao = function (cidadao) {
        cidadaoSelecionado.cpf = cidadao.cpf;
        cidadaoSelecionado.nome = cidadao.nome;
        $location.path("/atendimentos/novo");  
    };
});

app.controller("novoCidadaoCtrl", function ($scope, cidadaoAPI, $location, $cookies) {
    $scope.novoCidadao = function (cidadao) {
        replaceCidadao(cidadao);
        cidadao.usuario = {};
        cidadao.usuario.id = $cookies.get('id');
        cidadaoAPI.novoCidadao(cidadao)
                .success(function () {
                    delete $scope.cidadao;
                    $scope.cidadaoForm.$setPristine();
                    $location.path("/cidadaos");
                });
    };
});

app.controller("cidadaoCtrl", function ($scope, cidadao, cidadaoAPI, $location) {
    $scope.cidadao = cidadao.data;
    var data = new Date($scope.cidadao.nascimento);
    $scope.cidadao.nascimento = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
    $scope.alterarCidadao = function (cidadao) {
        replaceCidadao(cidadao);
        cidadaoAPI.setCidadao(cidadao)
                .success(function () {
                    $location.path("/cidadaos");
                });
    };
});

replaceCidadao = function (cidadao) {
        cidadao.cpf = cidadao.cpf.replace(".", "").replace(".", "").replace("-", "");

        if (cidadao.cep !== undefined && cidadao.cep !== null) 
            cidadao.cep = cidadao.cep.replace("-", "");
        
        if (cidadao.telefone !== undefined && cidadao.telefone !== null) 
            cidadao.telefone = cidadao.telefone.replace("(", "").replace(")", "").replace("-", "");
        
        if (cidadao.celular !== undefined && cidadao.celular !== null) 
            cidadao.celular = cidadao.celular.replace("(", "").replace(")", "").replace("-", "");
        
        if (cidadao.nascimento !== undefined && cidadao.nascimento !== null) 
            cidadao.nascimento = new Date(cidadao.nascimento.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$2/$1/$3"));
};