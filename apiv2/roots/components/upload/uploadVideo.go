package videoUp

import (
    "fmt"
    "net/http"
);

func UploadVideo(res http.ResponseWriter, req *http.Request) {
    defer req.Body.Close();
    err := req.ParseForm();
    if err != nil {
        http.Error(res, "server err", http.StatusInternalServerError);
    }
    file,_,errFs := req.FormFile("file");
    if errFs != nil {
        http.Error(res,"server error", http.StatusInternalServerError)
        return;
    }

    fmt.Println(file);
    res.WriteHeader(http.StatusAccepted);
    res.Write([]byte("ok"));
}
