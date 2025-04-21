package account;

import(
    "net/http"
    "encoding/json"
)

type LogData struct {
    Login string
    Password string
} 

func Login(res http.ResponseWriter, req *http.Request) {
    var data LogData;
    err := json.NewDecoder(req.Body).Decode(&data);
    
    if err != nil {
        http.Error(res, "error", http.StatusBadRequest);
        return;
    }
    
}
