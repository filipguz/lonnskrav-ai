# --- Build React ---
FROM node:18 AS frontend
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# --- Build Spring Boot ---
FROM maven:3.9.6-eclipse-temurin-17 AS backend
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
COPY --from=frontend /app/build src/main/resources/static
RUN mvn clean package -DskipTests

# --- Run ---
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=backend /app/target/*.jar app.jar
CMD ["java", "-jar", "app.jar"]