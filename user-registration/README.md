# 1. DOCKER INSTALL

```bash
sudo apt install docker.io

sudo systemctl start docker

sudo systemctl enable docker 

sudo systemctl status docker
```


# 2. INSTALL NPM


Node.js comes with npm (Node Package Manager) by default. Install it using the following command:
```bash
sudo apt install nodejs npm
```
Verify the installation:
Check the installed versions of Node.js and npm:
```bash
node -v
npm -v
```


# 3. CREATE MYSQL CONTAINER

Run mysql ooficial image from docker hub(this creates database)
```bash
docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=userdb -p 3306:3306 -d mysql:5.7
```

Login into database and create database

```bash
docker exec -it mysql-db mysql -u root -p
```

Create database
```bash
USE userdb;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);
```

# 4. Create server.js, index.html,  Dockerfile



# 5. INSTALL  DEPENDENCY

Initialize a Node.js project:
Run the following command to generate a package.json file:
```bash
npm init -y
```
This will create a package.json file with default values.


Install required dependencies:
Install the dependencies needed for your Node.js application:
```bash
npm install express mysql2 body-parser cors dotenv
```
This will:
    • Install the packages.
    • Generate a package-lock.json(which locks the dependency versions).



# 6. BUILD DOCKERFILE AND CREATE CONTAINER

Run the Application
    1. Build the Node.js Docker image:
       ```bash
       docker build -t node-app .
       ```
    2. Run the Node.js container and link it to the MySQL container:
       ```bash
       docker run --name node-app --link mysql-db:mysql -p 3000:3000 -d node-app
       ```
    3. Access the application:
        ◦ Open your browser and go to http://your-ec2-public-ip:3000.
        ◦ Fill out the registration form and submit it.
