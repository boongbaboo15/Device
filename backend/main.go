package main

import (
	"github.com/boongbaboo15/sa-65-example/controller"
	"github.com/boongbaboo15/sa-65-example/entity"
	"github.com/boongbaboo15/sa-65-example/middlewares"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{
			// User Routes 1
			r.GET("/users", controller.ListUsers)
			r.GET("/user/:id", controller.GetUser)
			r.POST("/users", controller.CreateUser)
			r.PATCH("/users", controller.UpdateUser)
			r.DELETE("/users/:id", controller.DeleteUser)
			// Device Routes 2
			r.GET("/devices", controller.ListDevices)
			r.GET("/device/:id", controller.GetDevice)
			r.POST("/devices", controller.CreateDevice)
			r.PATCH("/devices", controller.UpdateDevice)
			r.DELETE("/devices/:id", controller.DeleteDevice)
			// Role Routes 3
			r.GET("/roles", controller.ListRoles)
			r.GET("/role/:id", controller.GetRole)
			// brand Routes 4
			r.GET("/brands", controller.ListBrands)
			r.GET("/brand/:id", controller.GetBrand)
			// distributor Routes 5
			r.GET("/distributors", controller.ListDistributors)
			r.GET("/distributor/:id", controller.GetDistributor)
			// type Routes 6
			r.GET("/types", controller.ListTypes)
			r.GET("/type/:id", controller.GetType)
		}
	}
	// Signup User Route
	r.POST("/signup", controller.CreateUser)
	// login User Route
	r.POST("/login", controller.Login)
	// Run the server go run main.go
	r.Run()
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
