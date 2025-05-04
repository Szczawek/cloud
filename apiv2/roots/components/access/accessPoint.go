package access

import (
    "net/http"
    "fmt"
)
func AccessPoint(next http.Handler) http.Handler { 
    return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
        fmt.Println("step hard on the groud!");
        next.ServeHTTP(res,req);
    })
}
