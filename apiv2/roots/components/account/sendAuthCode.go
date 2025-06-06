package account

import (
    "apiv2/roots/email"
    "net/http"
    "fmt"
    "log"
    "strconv"
    "encoding/json"
    "math/rand"
)

type Load struct {
    To string `json:"to"`
}

func SendAuthCode(res http.ResponseWriter, req *http.Request) {
    var data Load;
    defer req.Body.Close();

    if err := json.NewDecoder(req.Body).Decode(&data); err != nil {
        http.Error(res,"Error with json", http.StatusInternalServerError);
        return;
    }
    fmt.Println(data.To);
    var to string = "szczawik.rozwoju@wp.pl";
    var authCode string;
    for i := 0; i < 6; i++ {
        value := rand.Intn(10);
        authCode += strconv.Itoa(value);
    } 
        
    var html string = `<div><p>Code ` + authCode + `</p></div>`
    emailData := email.Email{
        to,
        "Auth Code",
        html,
    }

    err := email.SendEmail(emailData);
    if err != nil {
        log.Fatalf("err",err);
        fmt.Println("error")
        return;
    }
    
}
