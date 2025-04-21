package database;

import (
    "fmt"
    "log"
    "os"
    "database/sql"
    "github.com/go-sql-driver/mysql"
)

var DB *sql.DB;

func do(cmd string, nn string, nk string){
    rows, error := DB.Query(cmd,nn,nk);
    if error != nil {
        log.Fatal(error);
    }
    defer rows.Close();
    nicks := make([]string,0);

    for rows.Next() {
        var test string;
        if err := rows.Scan(&test); err !=nil {
            log.Fatal(err)
        }
        nicks = append(nicks, test);
    }
    fmt.Println(nicks);
}

type Person struct {
    Name string
    Email string
    Password string

}

func secondThing(cmd string, args []interface{}) {
    rows,err := DB.Query(cmd, args...);
    if err != nil {
        log.Fatal(err);
    };
    defer rows.Close()
    
    var data []Person;


    for rows.Next() {
        var subData Person;
        if err := rows.Scan(&subData.Name,&subData.Email,&subData.Password); err != nil {
            log.Fatal(err);
        }
        data = append(data,subData);
    }
    fmt.Println(data);
}

func Init() {
    config := mysql.Config{
        User: "root",
        Passwd: os.Getenv("PASSWORD"),
        Net: "tcp",
        Addr: "127.0.0.1:3306",
        DBName: os.Getenv("DATABASE"),

    };
    
    var err error;
    DB, err = sql.Open("mysql",config.FormatDSN());
    if err != nil {
        log.Fatal(err);
    }

    fmt.Println("conected");
    input := []interface{}{"szczawik","szczawikczek","123"}; 
    secondThing("SELECT Nick, Email, Password FROM users WHERE nick IN(?,?,?)", input);
    do("SELECT nick FROM users where nick =? OR nick =?", "szczawik","szczawiczek");
}


