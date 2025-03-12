FROM mysql:9.2.0

ENV MYSQL_DATABASE="sky" MYSQL_ROOT_PASSWORD="1234"

COPY ./scripts/ /docker-entrypoint-initdb.d/
