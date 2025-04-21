package main

import (
	"fmt"
	"net/http"
	"log"
	"time"
    "apiv2/content/components/account"
    "apiv2/content/components/access"
    "apiv2/content/config"
    "github.com/lpernett/godotenv"    
	"github.com/rs/cors"
	"github.com/go-chi/chi/v5"
)

var port string = "8443";

func helmet(next http.Handler) http.Handler{
    return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
        res.Header().Set("X-Frame-Options", "DENY")
        res.Header().Set("X-Content-Type-Options", "nosniff")
        res.Header().Set("X-XSS-Protection", "1; mode=block")
        res.Header().Set("Referrer-Policy", "no-referrer-when-downgrade")
        res.Header().Set("Content-Security-Policy", "default-src 'self'; script-src 'self' https://red-town.net; object-src 'none'")
        res.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
        res.Header().Set("Permissions-Policy", "geolocation=(self), camera=(), microphone=()")
        res.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate")
        res.Header().Set("Pragma", "no-cache") 
        res.Header().Set("Cross-Origin-Opener-Policy", "same-origin")
        res.Header().Set("Cross-Origin-Resource-Policy", "same-origin")
        res.Header().Set("Cross-Origin-Embedder-Policy", "require-corp")
        next.ServeHTTP(res,req);
    })  
}

func showUsers() {
    cmd := "SELECT nick FROM users";
    rows, err := database.DB.Query(cmd);
    if err != nil {
        log.Fatal(err);
    }
    var usersName []string;
    for rows.Next() {
        var nick string;

        if err := rows.Scan(&nick); err != nil {
            log.Fatal(err);
        }
        usersName = append(usersName,nick);
    }
    rows.Close();
    fmt.Println(usersName);
}

//There should be defer db.Close();
//"grace-full" shutdown;

func main() {
	r := chi.NewRouter()
    host := "0.0.0.0:" + port;;
    
    server := &http.Server{
        Addr: host,
        Handler: r,
        ReadTimeout:    10 * time.Second,
        WriteTimeout:   10 * time.Second,
        MaxHeaderBytes: 1 << 20,
    }
	corsHandler := cors.New(cors.Options{
        AllowedOrigins: []string{"https://127.0.0.1:5173"}, 
		AllowedMethods: []string{"GET","POST"},
        AllowedHeaders: []string{"Content-Type", "Authorization"},
		ExposedHeaders: []string{"Content-Length", "X-Requested-With"},
	    AllowCredentials: true,
        MaxAge: 300,
        Debug: true,
    });
    
    err := godotenv.Load(".env");
    if err != nil {
        log.Fatal(err);
    };

    r.Use(corsHandler.Handler);
    r.Use(helmet);
    r.Use(access.AccessPoint); 
    r.Get("/session",access.Session);
    r.Post("/create-account",account.CreateAccount)
    r.Post("/login",account.Login);

    database.Init();
    showUsers();
	fmt.Sprintf("Server is starting on https://127.0.0.1:%s", port);
	log.Fatal(server.ListenAndServeTLS("ssl/server.cert", "ssl/server.key"));
};


    
