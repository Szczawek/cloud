package token

import(
    "os"
    "time"
    "github.com/golang-jwt/jwt/v5"
)

type CustomData struct {
    ID string `jsong:"id"`
    jwt.RegisteredClaims
}

func CreateToken(id string) (string, error) {
    dataForJWT := CustomData{ID:id, RegisteredClaims: jwt.RegisteredClaims{
        ExpiresAt: jwt.NewNumericDate(time.Now().Add(23 * 7 * time.Hour)),
        IssuedAt: jwt.NewNumericDate(time.Now()),
        },
    };
    token := jwt.NewWithClaims(jwt.SigningMethodHS256,dataForJWT)
    tokenLock, err := token.SignedString(os.Getenv("JWT_COOKIES"));
    if err != nil {
        return "",err;
    } 
    return tokenLock, nil;
}
