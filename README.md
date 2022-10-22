# 숨고 과제

### 실행방법 

- 의존성 패키지를 설치하기 전에 다음과 같은 설치 절차가 필요합니다. 
1. 맥 에뮬레이터를 실행하기 위한 xcode: https://apps.apple.com/us/app/xcode/id497799835?mt=12
2. 파일 변경 감지 역할을 하는 watchman: brew install watchman
3. ios 패키지 모듈 관리 역할을 하는 Cocoapods: sudo gem install cocoapods

- Root 위치에서 npm install 로 의존성 패키지를 설치해 줍니다.
- ios 폴더 내로 가서 pod install 명령어로 ios에 맞는 의존성패키지를 설치해 줍니다.
- 다시 root 폴더로 돌아와서 npm run ios 명령어로 에뮬레이터를 실행합니다

<img width="50%" alt="스크린샷 2022-10-22 오전 11 21 15" src="https://user-images.githubusercontent.com/34852597/197314912-23bfb7f4-b4b5-44cb-a9a9-c341ed2a9d8f.png">
<img width="50%" alt="스크린샷 2022-10-22 오전 11 21 31" src="https://user-images.githubusercontent.com/34852597/197314927-06f9dc95-4bb4-4b9d-a156-cda26fe79e28.png">
