FROM golang:1.24-alpine as builder

WORKDIR /apiv2

COPY go.mod go.sum ./

RUN go mod download

COPY . .

# Discalimer go can compiler code to file exe like bellow, so all things to run it, is to open file

RUN CGO_ENABLED=0 GOOS=linux go build -o server .

FROM alpine:latest

COPY .env.development .

COPY ssl/ ssl/

COPY --from=builder /apiv2/server /server

CMD ["/server"]
