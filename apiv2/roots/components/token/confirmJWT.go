package token 

import(
    "os"
    "fmt"
    "github.com/golang-jwt/jwt/v5"
)

func ConfirmJWT(value string) (error) {
    token, err := jwt.ParseWithClaims(value, &CustomData{},func(token *jwt.Token) (interface{}, error) {
        return os.Getenv("JWT_cookies"), nil
    })
    fmt.Println(token);
    return err;
}
