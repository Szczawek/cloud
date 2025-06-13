package account

import(
    "net/http"
    "fmt"
    "apiv2/roots/components/token"
)

func ConfirmAuthCode(res http.ResponseWriter, req *http.Request) {
    cookie, err := req.Cookie("session");
    if err != nil {
        http.Error(res,"No cookies anvaliable", http.StatusInternalServerError);
        return;
    };
    id,errToken := token.ConfirmJWT(cookie.Value);
    if errToken != nil {
        http.Error(res,"JWT token error",http.StatusInternalServerError);
        return;
    }

}
