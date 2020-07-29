SERVICE = posthog
SCALE ?= 5

up:
	@kubectl apply --filename=postgres.yml
	@kubectl apply --filename=redis.yml
	@kubectl apply --filename=$(SERVICE).yml

down:
	@kubectl delete --filename=postgres.yml
	@kubectl delete --filename=redis.yml
	@kubectl delete --filename=$(SERVICE).yml

logs:
	@kubectl logs --selector app=$(SERVICE) --follow

info:
	@kubectl get service $(SERVICE)
	@kubectl get pods --selector app=$(SERVICE)

ip:
	@echo "http://$$(minikube ip):$$(kubectl get service/$(SERVICE) -o jsonpath='{.spec.ports[0].nodePort}')"
