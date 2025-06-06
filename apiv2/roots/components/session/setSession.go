package session

import(
    "net/http"
    "time"
    "apiv2/roots/components/token"
)

func SetSession(res http.ResponseWriter, id string) error {
    encID, err := token.CreateToken(id);
    if err != nil {
        return err;
    }
    cookie := &http.Cookie{
        Name:"session",
        Value:encID,
        Expires: time.Now().Add(24 * 7 * time.Hour),
        MaxAge: 60 * 60 * 24 * 7,
        Secure: true,
        HttpOnly: true,
        SameSite: http.SameSiteNoneMode,
    };
    http.SetCookie(res, cookie);
    //temporary
    return nil;
}
