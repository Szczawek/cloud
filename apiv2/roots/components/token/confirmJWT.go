package token 

import(
    "os"
    "fmt"
    "github.com/golang-jwt/jwt/v5"
)

func ConfirmJWT(value string) (error) {
    token, err := jwt.ParseWithClaims(value, &CustomData{},func(token *jwt.Token) (interface{}, error) {
        return []byte(os.Getenv("JWT_cookies")), nil
    })
    if err != nil {
        return err;
    }
    data, ok := token.Claims.(*CustomData);
    return data.ID, nil;
}
