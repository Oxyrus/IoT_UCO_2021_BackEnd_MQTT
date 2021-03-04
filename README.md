# Broker de mensajeria

El proyecto consta de un microservicio que se conecta a una instancia de RabbitMQ, la cual puede correr de manera local o en la nube.

El microservicio se encuentra desarrollado en el framework [Nest.js](https://docs.nestjs.com/microservices/basics), el cual nos ahorra detalles de implementación para la conexión al servicio de RabbitMQ.

## Puesta en marcha

1. Instalar [Node.js](https://nodejs.org/en/download/).
2. Instalar las herramientas de linea de comandos de Nest.js desde la terminal con el comando `$ npm install -g @nest/cli`
3. Instalar [MongoDB](https://www.mongodb.com/try/download/community).
4. Instalar RabbitMQ local. Para esto se puede escoger una de estas dos alternativas:
    * Descargar RabbitMQ desde la [web oficial](https://www.rabbitmq.com/download.html).
    * Instalar [Docker](https://www.docker.com/get-started) y correr un contenedor con la imagen de RabbitMQ desde la terminal con el comando `$ docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management -e RABBITMQ_DEFAULT_USER=iot -e RABBITMQ_DEFAULT_PASS=test-user`
5. Configurar las conexiones a RabbitMQ y MongoDB en los archivos ubicados en `src/config`.
6. Clonar el repositorio con el comando `$ git clone https://github.com/JMGVDEV/IoT_UCO_2021_BackEnd_MQTT.git`
7. Una vez estemos dentro de la carpeta del repositorio que acabamos de clonar, debemos primero instalar los paquetes de Node.js con el comando `$ npm install`, seguido de `$ npm start` para iniciar nuestro microservicio.

## Colas de mensajería

Se tienen dos virtual host para separar las colas utilizadas entre backend-broker (neptuno) y broker-firmware (mercurio).

Las colas existentes al momento son:

* Virtual host `mercurio`
    * `doorstatus`: Se publica el estado de la puerta (abierta o cerrada) por parte del equipo de firmware y posteriormente se almacena como log en la base de datos desde el broker.
    * `triggeropendoor`: Pública a la cola, indicando al equipo de firmware que deben accionar la apertura de la puerta.

* Virtual host `neptuno`:
    * `opendoor`: El equipo de backend notifica mediante esta cola, que se debe realizar la apertura de la puerta una vez se hayan realizando las diferentes validaciones de autorización del usuario.
