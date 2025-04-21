package account

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "apiv2/content/config"
)

type ExpectedData struct {
    Password string `json:"password"`
    Login string `json:"login"`
    Nick string `json:"nick"`
    Tag string `json:"tag"`
}

func CreateAccount(res http.ResponseWriter, req *http.Request) {
    var data ExpectedData;

    err := json.NewDecoder(req.Body).Decode(&data);
    if err != nil {
        log.Fatal(err);
    };

    defer req.Body.Close();

    status := attempt(data);
    fmt.Println(status);
    if !status {
        setData(data);
        return;
    }
    fmt.Println("User with your data already exists!")
}

func attempt(data ExpectedData) bool {
    var userID string;

    err := database.DB.QueryRow("SELECT id FROM users where email =? OR tag =?", data.Login,data.Tag).Scan(&userID);
    if err != nil { 
        return false
    };
    
    return true;
}

func setData(data ExpectedData) {
    _,err := database.DB.Exec("INSERT INTO users(password,email,nick,tag) VALUE(?,?,?,?)",data.Password,data.Login,data.Nick,data.Tag);
    if err != nil {
        log.Fatal(err);
    }
    fmt.Println("ok");

}
