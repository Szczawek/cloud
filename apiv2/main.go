package main

import (
	"fmt"
	"net/http"
	"log"
	"time"
    "apiv2/roots/components/account"
    "apiv2/roots/components/access"
    "apiv2/roots/components/session"
    "apiv2/roots/config"
    "github.com/lpernett/godotenv"    
	"github.com/rs/cors"
    "os"
    "apiv2/roots/components/upload"
	"github.com/go-chi/chi/v5"
)

func helmet(next http.Handler) http.Handler{
    return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
        res.Header().Set("Cross-Origin-Opener-Policy", "same-origin")
        res.Header().Set("Cross-Origin-Resource-Policy", "same-origin")
        res.Header().Set("Cross-Origin-Embedder-Policy", "require-corp")
        res.Header().Set("X-Frame-Options", "DENY")
        res.Header().Set("X-Content-Type-Options", "nosniff")
        res.Header().Set("X-XSS-Protection", "1; mode=block")
        res.Header().Set("Referrer-Policy", "no-referrer-when-downgrade")
        res.Header().Set("Content-Security-Policy", "default-src 'self'; script-src 'self' https://red-town.net; object-src 'none'")
        res.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
        res.Header().Set("Permissions-Policy", "geolocation=(self), camera=(), microphone=()")
        res.Header().Set("Cache-Control", "no-store, no-cache, must-revalidate")
        res.Header().Set("Pragma", "no-cache")

        next.ServeHTTP(res,req);
    })  
}

//There should be defer db.Close();
//"grace-full" shutdown;

func main() {
    err := godotenv.Load(".env");
    if err != nil {
        log.Fatal(err);
    };

	r := chi.NewRouter()
    port := os.Getenv("PORT");
    host := "0.0.0.0:" + port;;
    
    server := &http.Server{
        Addr: host,
        Handler: r,
        ReadTimeout:    60 * time.Second,
        WriteTimeout:   60 * time.Second,
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
    r.Use(corsHandler.Handler);
    r.Use(helmet);
    r.Use(access.AccessPoint);

    r.Post("/create-account",account.CreateAccount)
    r.Post("/login",account.Login);
    r.Get("/auto-login",session.AutoLogin);
    r.Post("/upload-video", videoUp.UploadVideo);
    
    database.Init(); 
	fmt.Sprintf("Server is starting on https://127.0.0.1:%s", port);
	log.Fatal(server.ListenAndServeTLS("ssl/server.cert", "ssl/server.key"));
};


    
