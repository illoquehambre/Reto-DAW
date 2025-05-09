FROM eclipse-temurin:21-jdk-jammy AS builder
WORKDIR /workspace
COPY . .
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy

# Copia el script y vuelve ejecutable
COPY ./wait-for-it.sh /usr/local/bin/wait-for-it.sh       
RUN sed -i 's/\r$//' /usr/local/bin/wait-for-it.sh && \  
    chmod +x /usr/local/bin/wait-for-it.sh              

COPY --from=builder /workspace/target/*.jar /app.jar
ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE 8083
ENTRYPOINT ["/usr/local/bin/wait-for-it.sh", "-t", "0", "db:3306", "--strict", "--", "java", "-jar", "/app.jar"]