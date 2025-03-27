package account

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type Payload struct {
    Password string `json:"password"`
    Login string `json:"login"`
    Tag string `json:"tag"` 
    Nick string `json:"nick"`
 }

func CreateAccount(res http.ResponseWriter, req *http.Request) {
        var data Payload;
        err := json.NewDecoder(req.Body).Decode(&data);
        if err != nil  {
            http.Error(res,"Failed to Parse JSON", http.StatusBadRequest);
            return;
        }

        fmt.Println("recived",data.Login);;
}
