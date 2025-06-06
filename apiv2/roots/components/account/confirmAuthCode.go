package account

import(
    "net/http"
    "fmt"
    //"apiv2/roots/components/token"
)

func ConfirmAuthCode(res http.ResponseWriter, req *http.Request) {
    cookies := req.Cookies();
    fmt.Println(cookies);
   // id := token.ConfirmJWT(cookies[0]);

   // fmt.Println(id);
}
