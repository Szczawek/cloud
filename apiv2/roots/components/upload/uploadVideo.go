package videoUp

import (
    "fmt"
    "net/http"
);

func UploadVideo(res http.ResponseWriter, req *http.Request) {
    
    fmt.Println(req);
}
