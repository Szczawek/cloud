package access

import (
    "net/http"
)

func Session(res http.ResponseWriter, req *http.Request) {
    res.Write([]byte("session"));
}
