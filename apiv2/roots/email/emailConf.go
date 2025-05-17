package email

import(
    "log"
    "os"
    "github.com/wneessen/go-mail"
)

func SendEmail(recipient) error {
    client, err = mail.NewClient(
    "smtp.gmail.com",
    mail.WithPort(587),
    mail.WithSMTPAuth(mail.SMTPAuthPlain),
    mail.WithUsername(os.Getenv("EMAIL_USER"),
    mail.WithPassword(os.Getenv("EMAIL_PASSWORD"),
    mail.WithTLSPolicy(mail.TLSMandatory))
    if err != nil {
        return err;
    }
    
    msg := mail.NewMsg();
    if err := m.From(os.Getenv("EMAIL_SERVER")); err != nil {
        return err;
    }
    if err := m.To(recipier); err != nil {
        return err;
    }

    msg.Subject(title)

    
}
