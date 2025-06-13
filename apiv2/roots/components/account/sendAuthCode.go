package account

import (
    "apiv2/roots/email"
    "strconv"
    "math/rand"
)

func SendAuthCode(recipient string) error {
    var authCode string;
    for i := 0; i < 6; i++ {
        value := rand.Intn(10);
        authCode += strconv.Itoa(value);
    } 
        
    var html string = `<div><p>Code ` + authCode + `</p></div>`
    emailData := email.Email{
        recipient,
        "Auth Code",
        html,
    }

    err := email.SendEmail(emailData);
    return err;
}
