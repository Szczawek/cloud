package session

import(
    "net/http"
    "time"
)

func SetSession(res http.ResponseWriter, id string) {
    cookie := &http.Cookie{
        Name:"session",
        Value:id,
        Expires: time.Now().Add(24 * 7 * time.Hour),
        MaxAge: 60 * 60 * 24 * 7,
        Secure: true,
        HttpOnly: true,
        SameSite: http.SameSiteNoneMode,
    };
    http.SetCookie(res, cookie);
}
