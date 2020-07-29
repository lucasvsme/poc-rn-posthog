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
