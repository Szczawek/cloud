package account

import (
    "encoding/json"
    "database/sql"
    "net/http"
    "apiv2/roots/config"
)

type ExpectedData struct {
    Password string `json:"password"`
    Login string `json:"login"`
    Nick string `json:"nick"`
    Tag string `json:"tag"`
}

func CreateAccount(res http.ResponseWriter, req *http.Request) {
    defer req.Body.Close();
    var data ExpectedData;

    err := json.NewDecoder(req.Body).Decode(&data);
    if err != nil {
        http.Error(res, "json error", http.StatusInternalServerError);
        return;
    };

    dbErr := attempt(data.Tag, data.Login);
    if dbErr != nil {
        if dbErr == sql.ErrNoRows { 
            if err := setData(data); err != nil {
                http.Error(res, "Error with inserts data to database", http.StatusInternalServerError);
                return; 
            }
            if err := SendAuthCode(data.Login); err != nil {
                http.Error(res,"Error with email server, auth code can't be sends", http.StatusInternalServerError);
                return;
            }
            res.Write([]byte("Auth Code Was seneded"));
            return;
        }
        http.Error(res,"Error with open database", http.StatusInternalServerError);
        return;
    }
    http.Error(res,"User with that data already exists", http.StatusUnauthorized);
}

func attempt(tag string, email string) error {
    var userID string;
    err := database.DB.QueryRow("SELECT id FROM users where email =? OR tag =?", email,tag).Scan(&userID);
    return err;
}

func setData(data ExpectedData) error {
    _,err := database.DB.Exec("INSERT INTO users(password,email,nick,tag) VALUE(?,?,?,?)",data.Password,data.Login,data.Nick,data.Tag);
    
    return err;
}
