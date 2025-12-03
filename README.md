# Kubernetes Lab (kube-lab)

A hands-on Kubernetes learning project demonstrating core concepts and best practices for containerized application deployment and management.

## 📋 Overview

This project is a simple Node.js Express application deployed on Kubernetes with comprehensive examples of:
- Docker containerization
- Kubernetes deployments and services
- ConfigMaps and environment management
- Resource limits and requests
- Health checks (liveness probes)
- Rolling updates and rollbacks
- Self-healing capabilities
- Pause and resume deployments

## 🚀 Quick Start

### Prerequisites

- Docker Desktop with Kubernetes enabled
- `kubectl` CLI
- Node.js (for local development)

### Build and Deploy

```bash
# Build the Docker image
docker build -t kube-lab-app:v1 .

# Apply Kubernetes resources
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get svc
```

### Access the Application

```bash
# Get service details
kubectl get svc kube-lab-service

# Access via localhost
curl http://localhost:30080
# or
curl http://localhost:8080
```

## 📁 Project Structure

```
kube-lab/
├── Dockerfile                 # Container image definition
├── package.json              # Node.js dependencies
├── server.js                 # Express application
├── README.md                 # This file
└── k8s/
    ├── deployment.yaml       # Kubernetes deployment config
    └── service.yaml          # Kubernetes service config
```

## 📦 Application

### Technology Stack
- **Runtime:** Node.js 18 (Alpine)
- **Framework:** Express.js
- **Port:** 8080

### Endpoints
- `GET /` - Returns a greeting with environment information

**Response:**
```
Hello v2! Environment: production
```

## 🐳 Docker

### Build Image
```bash
docker build -t kube-lab-app:v1 .
```

### Available Image Tags
- `kube-lab-app:v1` - Initial version
- `kube-lab-app:v2` - Updated version with "Hello v2!" message

## ☸️ Kubernetes Configuration

### Deployment (k8s/deployment.yaml)

**Features:**
- **Replicas:** 2 pods
- **Image Policy:** `Never` (uses local images only)
- **Resource Requests:**
  - CPU: 100m (0.1 cores)
  - Memory: 128Mi
- **Resource Limits:**
  - CPU: 200m (0.2 cores)
  - Memory: 256Mi
- **Liveness Probe:**
  - HTTP GET on `/` port 8080
  - Initial delay: 5 seconds
  - Period: 5 seconds
  - Failure threshold: 3

**Environment Variables:**
- `APP_ENV` - Set to `production` via ConfigMap

### Service (k8s/service.yaml)

**Type:** LoadBalancer
- **Port:** 8080
- **Target Port:** 8080
- **Node Port:** 32758 (auto-assigned)

### ConfigMap

```bash
kubectl create configmap app-config --from-literal=APP_ENV=production
```

Stores application configuration separately from deployment definitions.

## 📚 Learning Concepts

### 1. Containerization
- Multi-stage builds
- Alpine Linux for minimal image size
- Docker best practices

### 2. Deployment Management
```bash
# Apply resources
kubectl apply -f k8s/

# Scale deployment
kubectl scale deployment kube-lab-deployment --replicas=3

# Check status
kubectl get pods
kubectl get deployments
```

### 3. Configuration Management
```bash
# View ConfigMap
kubectl get configmap app-config -o yaml

# Check environment variables in pod
kubectl exec -it <pod-name> -- printenv | grep APP_ENV
```

### 4. Rolling Updates
```bash
# Update image version
kubectl set image deployment/kube-lab-deployment kube-lab-app=kube-lab-app:v2

# Watch rollout progress
kubectl rollout status deployment/kube-lab-deployment

# View rollout history
kubectl rollout history deployment/kube-lab-deployment

# Rollback to previous version
kubectl rollout undo deployment/kube-lab-deployment
```

### 5. Pause and Resume Deployments
```bash
# Pause rollout (batch updates)
kubectl rollout pause deployment/kube-lab-deployment

# Make changes...
# kubectl set image, edit YAML, etc.

# Resume rollout
kubectl rollout resume deployment/kube-lab-deployment
```

### 6. Debugging and Inspection
```bash
# View pod logs
kubectl logs <pod-name>

# Describe pod details
kubectl describe pod <pod-name>

# Execute commands in pod
kubectl exec -it <pod-name> -- /bin/sh

# View pod events
kubectl get events
```

### 7. Self-Healing
```bash
# Delete a pod - Kubernetes automatically recreates it
kubectl delete pod <pod-name>

# Verify new pod is created
kubectl get pods
```

### 8. Node Inspection
```bash
# View cluster nodes
kubectl get nodes

# Detailed node information
kubectl describe node docker-desktop

# Node resource allocation
kubectl describe node docker-desktop | grep -A 10 "Allocated resources"
```

## 🔧 Common Commands

### Deployment Management
```bash
# Apply configuration
kubectl apply -f k8s/

# Delete resources
kubectl delete -f k8s/

# Recreate everything
kubectl delete -f k8s/ && kubectl apply -f k8s/
```

### Scaling
```bash
# Scale to N replicas
kubectl scale deployment kube-lab-deployment --replicas=3

# View current scale
kubectl get deployment kube-lab-deployment
```

### Monitoring
```bash
# Watch pods continuously
kubectl get pods -w

# View recent events
kubectl get events --sort-by='.lastTimestamp'

# Pod resource usage (if metrics-server installed)
kubectl top pods
kubectl top nodes
```

### Troubleshooting
```bash
# Get detailed pod information
kubectl describe pod <pod-name>

# View pod logs
kubectl logs <pod-name>

# Follow logs in real-time
kubectl logs -f <pod-name>

# Check previous pod logs (if crashed)
kubectl logs <pod-name> --previous
```

## 📊 Resource Allocation

### Pod Resources
| Resource | Request | Limit |
|----------|---------|-------|
| CPU | 100m | 200m |
| Memory | 128Mi | 256Mi |

### Node Capacity (Docker Desktop)
| Resource | Total | Allocatable |
|----------|-------|-------------|
| CPU | 8 cores | 8 cores |
| Memory | 3.8 GB | 3.6 GB |

## 🔄 Deployment Workflow

### Version Updates
1. Modify `server.js`
2. Build new Docker image: `docker build -t kube-lab-app:v2 .`
3. Update deployment: `kubectl set image deployment/kube-lab-deployment kube-lab-app=kube-lab-app:v2`
4. Monitor rollout: `kubectl rollout status deployment/kube-lab-deployment`
5. Rollback if needed: `kubectl rollout undo deployment/kube-lab-deployment`

## 🐛 Debugging

### Pod Fails to Start
```bash
# Check pod status
kubectl describe pod <pod-name>

# Look at Events section for errors
# Common issues:
# - ErrImageNeverPull: Image not found locally
# - ImagePullBackOff: Cannot pull image from registry
# - CrashLoopBackOff: Pod keeps crashing
```

### Application Unresponsive
```bash
# Check logs
kubectl logs <pod-name>

# Verify liveness probe is passing
kubectl describe pod <pod-name> | grep -A 5 "Liveness"

# Check resource limits aren't being exceeded
kubectl describe node docker-desktop | grep "Allocated resources" -A 10
```

### Service Not Accessible
```bash
# Verify service exists
kubectl get svc kube-lab-service

# Check endpoints
kubectl get endpoints kube-lab-service

# Verify pod labels match service selector
kubectl get pods --show-labels
```

## 🎯 Learning Objectives

After completing this lab, you should understand:
- ✅ Container basics and Docker
- ✅ Kubernetes deployment patterns
- ✅ Service discovery and networking
- ✅ Configuration management
- ✅ Resource management and limits
- ✅ Health checks and self-healing
- ✅ Rolling updates and rollbacks
- ✅ Cluster resource inspection
- ✅ Troubleshooting and debugging

## 📝 Key Takeaways

1. **Infrastructure as Code:** All configuration in YAML files
2. **Declarative Management:** Describe desired state, Kubernetes ensures it
3. **Self-Healing:** Automatic pod recreation on failure
4. **Zero-Downtime Updates:** Gradual rollout of new versions
5. **Resource Awareness:** Specify and enforce resource limits
6. **Health Monitoring:** Liveness probes ensure application health

## 🚀 Next Steps

- Experiment with different replica counts
- Test readiness probes
- Implement horizontal pod autoscaling
- Try different service types (ClusterIP, NodePort, LoadBalancer, Ingress)
- Deploy multiple applications with networking
- Set up persistent volumes
- Implement resource quotas and network policies

## 📖 Additional Resources

- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Tutorials](https://kubernetes.io/docs/tutorials/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

## 📝 License

This project is for educational purposes.

## ✍️ Author

Kubernetes Lab Assignment - DevOps Training

---

**Last Updated:** December 2, 2025
