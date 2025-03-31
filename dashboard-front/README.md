
# Dashboard Front End

## Setup Container

All done inside main project folder.

```bash
podman build -t dashboard_front -f .\DOCKERFILE
```

```bash
podman network create mynetwork
```

```bash
podman run --name dashboard_front --network mynetwork -p 5173:80 dashboard_front
```
