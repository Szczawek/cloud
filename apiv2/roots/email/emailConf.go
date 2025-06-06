package email

import(
    "os"
    "fmt"
    "github.com/wneessen/go-mail"
)

type Email struct {
    To string
    Title string
    HTML string
};

func SendEmail(data Email) error {
    fmt.Println(os.Getenv("EMAIL_USER"));
    client, err := mail.NewClient(
    "smtp.gmail.com",
    mail.WithPort(587),
    mail.WithSMTPAuth(mail.SMTPAuthPlain),
    mail.WithUsername(os.Getenv("EMAIL_USER")),
    mail.WithPassword(os.Getenv("EMAIL_PASSWORD")),
    mail.WithTLSPolicy(mail.TLSMandatory))
    if err != nil {
        return err;
    }
    msg := mail.NewMsg();
    if err := msg.From(os.Getenv("EMAIL_SERVER")); err != nil {
        return err;
    }
    if err := msg.To(data.To); err != nil {
        return err;
    }

    msg.Subject(data.Title)
    msg.SetBodyString("text/html", data.HTML);
    sendErr := client.DialAndSend(msg);
    return sendErr;
}
