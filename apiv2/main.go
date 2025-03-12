package main

import (
	"fmt"
	"net/http"
	"log"
	"time"
	"io"
	"github.com/rs/cors"
	"github.com/go-chi/chi/v5"
)

func accessPoint(res http.ResponseWriter, req *http.Request) {
	io.WriteString(res, "Welcom on the api hub!");
	fmt.Println(req.RemoteAddr);
}

func api(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w,"You have discobered a new route of are are! Good luck in your feature searchs")
	fmt.Println("test");
}

func test(res http.ResponseWriter, req *http.Request) {
	fmt.Println("Szczawik was here!");
}


func main() {
	r := chi.NewRouter()
	    corsHandler := cors.New(cors.Options{
		            AllowedOrigins: []string{"https://127.0.0.1:5173"}, // Only allow this origin
			    AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			    AllowedHeaders: []string{"Content-Type", "Authorization"},
			    ExposedHeaders: []string{"Content-Length", "X-Requested-With"},
			    AllowCredentials: true, // Allow cookies and credentials
			    Debug: true, // Optional debugging
								        })
	r.Use(corsHandler.Handler);
	r.Get("/",accessPoint);
	s := &http.Server{
		Addr: "0.0.0.0:8443",
		Handler: r,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	fmt.Println("Server is starting on https://127.0.0.1:8443");
	log.Fatal(s.ListenAndServeTLS("ssl/server.cert", "ssl/server.key"));
};

