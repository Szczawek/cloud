package main

import (
	"fmt"
	"net/http"
	"log"
	"time"
    "apiv2/content/components/account"
    "apiv2/content/components/access"
    //"apiv2/content/config"
	"github.com/rs/cors"
	"github.com/go-chi/chi/v5"
)

func main() {
	r := chi.NewRouter()
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"https://127.0.0.1:5173"}, 
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
		ExposedHeaders: []string{"Content-Length", "X-Requested-With"},
	    AllowCredentials: true,
    })

	r.Use(corsHandler.Handler);
    r.Use(access.AccessPoint);
    r.Get("/api/session",access.Session);
	r.Post("/create-account",account.CreateAccount)
    
    server := &http.Server{
		Addr: "0.0.0.0:8443",
		Handler: r,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	fmt.Println("Server is starting on https://127.0.0.1:8443");
	log.Fatal(server.ListenAndServeTLS("ssl/server.cert", "ssl/server.key"));
};

