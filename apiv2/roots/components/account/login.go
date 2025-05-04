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

    err := json.NewDecoder(req.Body).Decode(&loginData);
    if err != nil {
        http.Error(res,"json err", http.StatusInternalServerError);
        return;
    };

    dbErr, id := loginAttempt(loginData);
    if dbErr != nil {
        if dbErr == sql.ErrNoRows {
        http.Error(res, "Incorrect data!", http.StatusUnauthorized);
        return;
        }

        http.Error(res, "database error", http.StatusInternalServerError);
        return;

    }
    session.SetSession(res,id);
    res.WriteHeader(http.StatusAccepted);
    res.Write([]byte("logged"));
}


func loginAttempt(data LoginSchema) (error, string) {
    var id string;
    err := database.DB.QueryRow("SELECT id FROM users WHERE email =? AND password =?", data.Login,data.Password).Scan(&id);
    return err, id
}
