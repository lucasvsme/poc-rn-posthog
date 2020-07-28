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


NAME = "poc-android-testing"
API = "28"
FOLDER = "$$(pwd)/emulator"
SERIAL = "$$(adb get-serialno)"

install:
	@touch ~/.android/repositories.cfg
	@sdkmanager --install "tools"
	@sdkmanager --install "emulator"
	@sdkmanager --install "platforms;android-$(API)"
	@sdkmanager --install "build-tools;$(API).0.0"
	@sdkmanager --install "system-images;android-$(API);default;x86"

create:
	@avdmanager create avd \
			--device "pixel" \
			--name $(NAME) \
			--package "system-images;android-$(API);default;x86" \
			--path $(FOLDER)

delete:
	@avdmanager delete avd --name $(NAME)

device:
	@emulator -avd $(NAME) -no-snapshot -no-boot-anim -no-audio

test:
	@ANDROID_SERIAL=$(SERIAL) ./gradlew clean test connectedAndroidTest
