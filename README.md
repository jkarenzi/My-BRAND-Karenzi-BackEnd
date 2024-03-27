#**My Brand API Backend**  

-Github repo: https://github.com/jkarenzi/My-BRAND-Karenzi-BackEnd  

-Hosted url: https://my-brand-karenzi-backend.onrender.com  

-API Documentation: https://my-brand-karenzi-backend.onrender.com/api-docs  

## **Installation**  

1. Clone the repo:  
-git clone https://github.com/jkarenzi/My-BRAND-Karenzi-BackEnd.git  

2. Install dependencies  
-npm install  

## **Configuration**  
Add the following environment variables to a .env file  

-MONGO_URL: url of mongo database  
-PORT: port on which server will run  
-JWT_SECRET : used to sign and verify jwt tokens  
-CLOUD_NAME, API_KEY AND API_SECRET of cloudinary account  

## **Endpoints**  

### **Authentication**  

-POST auth/signup: Create new user  
-POST auth/login: login and get an access token  

### **User Management**  

-GET usermgt/get_users: Get all users  
-GET usermgt/get_user/:id : Get single user by ID  
-POST usermgt/update_username: Update username  
-POST usermgt/update_email: Update email  
-POST usermgt/update_profile: Update profile  
-DELETE usermgt/delete_user:/id: Delete user  

### **Blog Management**  

-POST blogs/create_blog: Create a new blog  
-GET blogs/get_blogs: Get all blogs  
-GET blogs/get_blog/:id: Get single blog by ID  
-POST blogs/update_blog: Update blog  
-DELETE blogs/delete_blog/:id: Delete blog  

### **Comment Management**  

-POST comments/create_comment: Create a new comment  
-GET comments/get_comments: Get all comments  
-GET comments/get_comment/:id: Get single comment by ID  
-PATCH comments/update_comment Update comment  
-DELETE comments/delete_comment/:id: Delete comment  

### **Query Management**  

-POST queries/create_query: Create a new query  
-GET queries/get_queries: Get all queries  
-GET queries/get_query/:id: Get single query by ID  