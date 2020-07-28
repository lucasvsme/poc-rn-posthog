SERVICE = posthog
SCALE ?= 5

database-up:
	@kubectl apply --filename=k8s-postgres.yml
	@kubectl apply --filename=k8s-redis.yml

database-down:
	@kubectl delete --filename=k8s-postgres.yml
	@kubectl delete --filename=k8s-redis.yml

posthog-up:
	@kubectl apply --filename=k8s-$(SERVICE).yml

posthog-down:
	@kubectl delete --filename=k8s-$(SERVICE).yml

posthog-logs:
	@kubectl logs --selector app=$(SERVICE) --follow

posthog-info:
	@kubectl get service $(SERVICE)
	@kubectl get pods --selector app=$(SERVICE)

posthog-url:
	@./ip.sh $(SERVICE)

