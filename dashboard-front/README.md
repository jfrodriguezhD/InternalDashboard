
# Dashboard Front End

## Setup Container

All done inside main project folder.

```bash
mvn clean package -DskipTests
```

```bash
 podman build -t dashboard_front -f .\DOCKERFILE
```

```bash
podman network create mynetwork
```

```bash
podman run -d --name postgresdb --network mynetwork -e POSTGRES_DB=postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 6432:5432 postgres:17.4-alpine
```

```bash
podman run --name dashboard_front --network mynetwork -p 5173:80 dashboard_front
```
