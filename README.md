# API - CRUD Operations

A RESTful API to manage **Employees** and **Tasks** with JWT login authentication, full CRUD operations, and MongoDB database integration.

---

## Tech Stack

 **Backend:** Node.js, Express.js  
 **Database:** MongoDB   
 **Authentication:** JWT    
 **Tools:** Postman for testing  

##  Installation & Setup

1. npm init -y
2. npm install bcryptjs cors dotenv express joi jsonwebtoken mongoose morgan
3. npm install 

## Run

npm run seed

npm start


##  Features

- Login authentication (JWT-based)  
- CRUD operations for Employees and Tasks   
- Assign/unassign tasks to employees    
- Error handling with proper messages


## Deployment

https://tract2-backend.onrender.com


## Screenshot

### Use Postman to test all CRUD operations

### 1.Login - Authentication

** /api/auth/login **

<img width="1858" height="944" alt="Screenshot 2025-10-26 162239" src="https://github.com/user-attachments/assets/d4d66327-1d30-42d2-8d99-85fdf0fe1a85" />


### POST  METHOD

#### CREATE EMPLOYEES / TASKS

** /api/employees **

<img width="1860" height="941" alt="Screenshot 2025-10-26 162759" src="https://github.com/user-attachments/assets/6567b1b1-8e97-4773-9c0b-3e63d9af0a2c" />




** /api/tasks **

<img width="1851" height="936" alt="Screenshot 2025-10-26 164132" src="https://github.com/user-attachments/assets/0fc6ad27-926a-486f-8655-9e14a38e32b1" />


### GET METHOD

#### READ EMPLOYEES 

** /api/employees **

<img width="1852" height="941" alt="Screenshot 2025-10-26 164508" src="https://github.com/user-attachments/assets/93467dd5-c860-4dec-89e5-68de61d1eda1" />


### PUT METHOD

#### UPDATE EMPLOYEE NAME AND EMAIL 

** /api/employees/:id **

<img width="1850" height="919" alt="Screenshot 2025-10-26 165407" src="https://github.com/user-attachments/assets/2441c4f0-058c-4d64-b6cd-d4babad347d3" />

### DELETE METHOD

#### DELETE EMPLOYEE DETAILS

** /api/employees/:id **


<img width="1857" height="906" alt="Screenshot 2025-10-26 170008" src="https://github.com/user-attachments/assets/eb101cdd-1c44-494c-9937-74dbf86e450b" />

