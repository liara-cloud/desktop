.DEFAULT_GOAL := build

ifeq ($(OS),Windows_NT)
	D_OS += windows
	ifeq ($(PROCESSOR_ARCHITECTURE),AMD64)
		D_PA += x64
	endif
	ifeq ($(PROCESSOR_ARCHITECTURE),x86)
		D_PA += ia32
	endif
else
	UNAME_S := $(shell uname -s)
	ifeq ($(UNAME_S),Linux)
		D_OS += linux
	endif
	ifeq ($(UNAME_S),Darwin)
		D_OS += macos
	endif

	UNAME_M := $(shell uname -m)
	ifeq ($(UNAME_M),x86_64)
		D_PA += x64
	endif
	ifeq ($(UNAME_M),armv7l)
		D_PA += armv7l
	endif
	ifneq ($(filter arm%,$(UNAME_M)),)
        D_PA += arm64
    endif
endif

prepare:
	npm list -g --depth=0 electron-builder || npm i -g electron-builder
.PHONY:prepare

build: prepare
	export AWS_ENDPOINT=“test”
	electron-builder build --$(D_OS) --$(D_PA) -p never
.PHONY:build