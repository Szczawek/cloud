package account;

import(
    "net/http"
    "encoding/json" 
    "database/sql"
    "apiv2/roots/components/session"
    "apiv2/roots/config"
)

type LoginSchema struct {
    Login string `json:"login"`
    Password string `json:"password"`
} 

func Login(res http.ResponseWriter, req *http.Request) {
    defer req.Body.Close();
    var loginData LoginSchema;

    if err := json.NewDecoder(req.Body).Decode(&loginData); err != nil {
        http.Error(res,"json err", http.StatusInternalServerError);
        return;
    };

    err, id := loginAttempt(loginData);
    if err != nil {
        if err == sql.ErrNoRows {
        http.Error(res, "Incorrect data!", http.StatusUnauthorized);
        return;
        }
        http.Error(res, "database error", http.StatusInternalServerError);
        return;
    }

    if err := session.SetSession(res,id); err != nil {
        http.Error(res, "Error with cookies", http.StatusInternalServerError);
        return;
    }
    if err := SendAuthCode(loginData.Login); err != nil {
        http.Error(res,"Error with email server", http.StatusInternalServerError);
        return;
    }
    res.Write([]byte("Auth code was sended"));
}


func loginAttempt(data LoginSchema) (error, string) {
    var id string;
    err := database.DB.QueryRow("SELECT id FROM users WHERE email =? AND password =?", data.Login,data.Password).Scan(&id);
    return err, id
}
