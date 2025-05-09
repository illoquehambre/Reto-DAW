FROM eclipse-temurin:21-jdk-jammy AS builder
WORKDIR /workspace
COPY . .
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy

# Copia el script y vuelve ejecutable
COPY ./wait-for-it.sh /usr/local/bin/wait-for-it.sh       
RUN chmod +x /usr/local/bin/wait-for-it.sh               

COPY --from=builder /workspace/target/*.jar /app.jar
ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE 8083
ENTRYPOINT ["/usr/local/bin/wait-for-it.sh", "db:3306", "--timeout=30", "--", "java", "-jar", "/app.jar"]