# Project Talker Manager

# Contexto
Aplicação de cadastro de talkers (palestrantes) em que é possível cadastrar, visualizar, pesquisar, editar e excluir informações.

Para isso, foi necessário desenvolver uma API de um CRUD (Create, Read, Update e Delete) de palestrantes (talkers) e desenvolver alguns endpoints que irão ler e escrever em um arquivo utilizando o módulo fs.

## Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, ES6


## Instalando Dependências

> Backend
```bash
cd sd-020-a-project-talker-manager/ 
npm install
``` 

## Executando aplicação

Para rodar a aplicação você vai precisar ter o [Docker](https://docs.docker.com/engine/install/ubuntu/) instalado usando os comandos no terminal:
```bash
docker-compose up -d
docker exec -it talker_manager bash
npm install
```

* Para rodar o back-end:

```
npm start
```

* Realizando Requisições:

Para realizar as requisições, você pode usar a extensão [Thunder Client](https://www.thunderclient.com/) do VSCode ou pode usar os clientes HTTP [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).
