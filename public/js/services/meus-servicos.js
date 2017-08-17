angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function($resource){
    return $resource('/v1/fotos/:fotoId', null,{
        'update':{
            method: 'PUT'
        }
    });
})

.factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope){

    var evento = 'fotoCadastrada';

    var service = {};

    service.cadastrar = function(foto){
        return $q(function(resolve, reject){
            if(foto._id){
                // edicao
                recursoFoto.update({fotoId: foto._id}, foto, function(){
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem : 'Foto ' + foto.titulo + ' atualizada com sucesso!!',
                        inclusao : false
                    });
                }, function(erro){
                    console.log(erro);
                    reject({
                        mensagem : 'Não foi possivel atualizar a foto ' + foto.titulo
                    });
                });
            }else{
                // inclusao
                recursoFoto.save(foto, function(){
                    $rootScope.$broadcast(evento);
                    resolve({
                        mensagem : 'Foto ' + foto.titulo + ' incluida com sucesso!',
                        inclusao : true
                    });
                }, function(erro){
                    console.log(erro);
                    reject({
                        mensagem : 'Não foi possivel incluir a foto ' + foto.titulo
                    });
                });
            }
        });
    };

    return service;
});