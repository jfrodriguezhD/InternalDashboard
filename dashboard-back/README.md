
# Dashboard Backend

## Setup Containers

All done inside main project folder.

```bash
mvn clean package -DskipTests
```

```bash
podman build -t backend -f .\DOCKERFILE
```

```bash
podman network create mynetwork
```

```bash
podman run -d --name postgresdb --network mynetwork -e POSTGRES_DB=postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 6432:5432 postgres:17.4-alpine
```

```bash
podman run -d --name backend --network mynetwork -p 8080:8080 backend
```
