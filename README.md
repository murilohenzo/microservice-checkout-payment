# Microservice Checkout Payment
- Micro serviço vai ser responsável por fazer a conexão com o serviço externo para conclusão do pagamento.
## UseCases
- CheckoutPaymentUseCase, vai receber dados da fila de SQS sobre o pagamento do boleto e cliente. Recebidos os dados vai ser realizada a conexão com o serviço externo para conclusão do pagamento, tendo uma response de 200 sobre o pagamento do boleto, enviamos um email para o cliente sobre o pagamento do boleto finalizado, junto com uma mensagem sobre o cashack recebido ao pagar o boleto.

exemplo:

  ![Screenshot_9](https://user-images.githubusercontent.com/28688721/185522902-d1d1cc0c-5737-45e5-8c2d-15ecb336ca3b.png)
  
 
## Tecnologias
NodeJS, Typescript, Postgresql, Docker, Docker Compose, AWS SQS, Nodemailer

- Foi utilizado Postgresql devido ser um banco de dados poderoso de objeto-relacional opensource, e para uma aplicação de pagamentos é bem viável utilizar um banco relacional visto que vai possuir muitas a relação entre cliente e boletos, onde temos  ```1 Customer -> N Payments```.

- O Docker Compose, possui a seguinte estrutura:
```yaml
version: '3'

services:
  api:
    container_name: microservice-checkout
    build: 
      context: ./
      dockerfile: Dockerfile
    image: murilohenzo/microservice-checkout
    entrypoint: dockerize -wait tcp://db:5432 -timeout 30s 
    depends_on:
      - db
    command: yarn dev
    ports:
      - 9090:9090
    links:
      - db
```

### Como testar?

1. [Instalar Docker Compose](https://docs.docker.com/compose/install/)
2. Rodar o projeto do [Microservice Payment](https://github.com/murilohenzo/microservice-payment)
3. Clonar este repo com ssh
4. Criar um ```.env``` para as seguintes enviroments, com as variáveis criadas por você
   - Uma observação, o email para teste deve ser um ```hotmail```
    ```.env 
      AWS_USER_SECRET_ACCESS_KEY=
      AWS_USER_KEY=
      AWS_REGION_SQS=
      AWS_ARN_POLICY=
      AWS_SQS_URL=
      NODEMAILER_USER=
      NODEMAILER_PASS=
    ```
5. Rodar todos os containers com `docker-compose up ou docker-compose up -d`
6. Outra alternativa fazendo `make build` para buildar os containers.
7. Observação, existe linhas comentadas dentro do ```Dockerfile``` e ```docker-compose.yaml```, que caso esteja em um SO do Linux podem ser descomentadas
