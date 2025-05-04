package session

import (
    "fmt"
    "net/http"
    "database/sql"
    "encoding/json"
    "apiv2/roots/config"
)

type PersonalInfo struct {
    Nick string;
    Tag string;
};

func AutoLogin(res http.ResponseWriter, req *http.Request) {
    defer req.Body.Close();
    var userData PersonalInfo;
    
    //Data in cookies must be encrypted!
    cookie, cookieErr := req.Cookie("session");
    if cookieErr != nil {
        if cookieErr == http.ErrNoCookie {
            fmt.Println(cookieErr);
            http.Error(res,"No cookies", http.StatusUnauthorized);
            return; 
        }
            http.Error(res, "Error with cookies", http.StatusInternalServerError);
            return;
    }

    id:= cookie.Value;
    var cmd string = "SELECT nick, tag FROM users WHERE id =?";
    err := database.DB.QueryRow(cmd,id).Scan(&userData.Nick,&userData.Tag);
    if err != nil {
        if err == sql.ErrNoRows {
            http.Error(res, "Account doesnt't exist", http.StatusUnauthorized);
            return;
        }
        http.Error(res, "Error with database", http.StatusInternalServerError )
        return;
    }

    jsonData, err := json.Marshal(userData);
    if err != nil {
        http.Error(res, "Error with json", http.StatusInternalServerError);
        return;
    }
    res.Header().Set("Content-Type","application/json");
    res.WriteHeader(http.StatusOK);
    res.Write([]byte(jsonData));
}
