package database;

import (
    "fmt"
    "log"
    "os"
    "database/sql"
    "github.com/go-sql-driver/mysql"
)

var DB *sql.DB;

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

    fmt.Println("Database conected!");
}
