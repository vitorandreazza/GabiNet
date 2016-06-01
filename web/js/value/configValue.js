angular.module("gabiNet").value("config", {
    baseUrl: "http://localhost:8090/gabinet/api"
});

angular.module("gabiNet").value("cidadaoSelecionado", {
    cpf: '',
    nome: ''
});

angular.module("gabiNet").value("usuarioLogado", {
    id: '',
    nomeUsuario: ''
});