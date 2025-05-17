package videoUp

import (
    "fmt"
    "io"
    "os"
    "strconv"
    "net/http"
);

var count int = 0;

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

    defer file.Close();
    byte, errIo := io.ReadAll(file);
    if errIo != nil {
        fmt.Println("err");
        return;
    }

    count ++;
    desc := "uploads/"
    desc += strconv.Itoa(count);
    desc += ".jpg";
    errFi := os.WriteFile(desc, byte, 0666);
    if errFi != nil {
        fmt.Println("err");
    }
    fmt.Println(byte);
    res.WriteHeader(http.StatusAccepted);
}
