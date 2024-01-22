# Backend

A api usa typescript com express como framework. Foi adotado um padrão de arquitetura hexagonal, com separação entre controllers, repositório e casos de uso.
Foi adotado o padrão de projeto `Either`, que retorna sempre um resultado de left ou right, aqui chamado de sucesso ou falha.
Assim, erros não são jogados pela aplicação e cada função tem controle sobre o que fazer com cada tipo de resultado. Apesar 
disso aumentar a complexidade, há um ganho de desempenho por não se jogar erros e se tem uma rastreabilidade maior de onde 
erros não esperados.

Os repositórios foram abstraídos em uma interface para sua fácil substituição e desacoplamento de tecnologia. O mesmo
não foi feito nos casos de uso, pois eles são, como o próprio nome já diz, para um uso único. Caso precisem ser modificados
por um motivo qualquer, deverá ser feito um novo caso de uso, uma vez que isso significa que seu escopo também mudou.

Foi adotado o sequelize como ORM e um banco de dados postgres, que pode ser subido através do docker-compose na raiz do projeto.
As aplicações de back e front também possuem um dockerfile que as montam no docker-compose.

Foram feitos apenas testes unitários nos casos de uso e classes isoladas da aplicação, não sendo feitos testes de integração, 
end to end ou regressão. O test runner escolhido foi o jest, juntamente com o ts-jest para rodar os arquivos em typescript.

Também foram configurados o eslint e prettier, para manter a apresentação do projeto. Foram configurados hooks do husky de 
pre-commit para lint, mensagens convencionais de commit e bateria de testes, evitando assim que suba código fora do padrão para o repositório.




## Rodando o Backend

O backend foi desenvolvido na versão 20 do node.  

Para rodá-lo, faça:

```console
> cd BACK
> npm i
> npm run start
```

Caso deseje rodar em modo desenvolvimento, sem copilar para javascript, faça:


```console
> cd BACK
> npm i
> npm run start:dev
```

## Problemas encontrados

* O docker do back está com algum problema para subir a aplicação devido à incompatibilidade com o linux. Entrar manualmente 
no container, remover o node_modules e instalar novamente resolveu. Não consegui encontrar uma solução permanente devido ao tempo.

* O middleware de log para cards editados e removidos loga mesmo em caso de erros. Além disso, ele não loga o nome do card
na rota de deleção, pois esse valor não está facilmente disponível no contexto. Para tal, uma nova consulta no banco teria 
que ser feita para recuperar este valor, o que considerei uma perda de desempenho desnecessária para o caso. Na situação em que
seja impertinente essa informação, o middleware pode ser refatorado para fazer essa consulta.

* O front não trata erros além do 401, mesmo que na documentação tenha pedido envio de erros 400 e 404 para situações específicas.