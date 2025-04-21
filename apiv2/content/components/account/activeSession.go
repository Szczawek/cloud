package account

import (
    "fmt"
    "net/http"
)

func activeSession(res http.ResponseWriter, req *http.Request) {
    fmt.Println("test");
}
