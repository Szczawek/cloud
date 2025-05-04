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
        http.Error(res, "json erro", http.StatusInternalServerError);
        return;
    };

    dbErr := attempt(data.Tag, data.Login);
    if dbErr != nil {
        if dbErr == sql.ErrNoRows {
            err := setData(data);
            if err != nil {
                http.Error(res, "Database error", http.StatusInternalServerError);
                return; 
            }
            res.WriteHeader(http.StatusCreated);
            return;
        }
        http.Error(res,"db err", http.StatusInternalServerError);
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
