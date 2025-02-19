# 📌 polycube-assignment

🚀 **프로젝트 개요**  
`polycube-assignment`는 **React Native 기반의 모바일 애플리케이션**입니다.  
**웹뷰(WebView) 기반의 컨텐츠 표시 기능**과 **광고 ID 조회 및 표시 기능**을 포함합니다.  

🔗 **DownLode**: [polycube-assignment]([https://github.com/baebang/polycube-assignment](https://expo.dev/accounts/jaejungkim/projects/polycubeAssignment/builds/950936bf-c470-493e-8da0-ea1a6cc9a495))

## ✨ 주요 기능
### 1️⃣ **컨텐츠 표시 (WebView)**
- 웹뷰를 사용하여 특정 URL의 컨텐츠를 앱 내부에서 표시  
- 웹뷰 내에서 **확대/축소, 스크롤 등이 자연스럽게 동작**하도록 설정  

### 2️⃣ **광고 ID 조회 및 표시**
- iOS 및 Android 기기에서 광고 ID를 불러와 특정 화면에서 노출  
- 광고 ID는 **보안 및 개인정보 보호 정책에 부합하도록 관리**  
- **Google Mobile Ads (AdMob)**를 활용하여 배너 및 전면 광고 적용  

### 3️⃣ **Bottom Navigation 적용**
- `expo-router`를 활용하여 **탭 네비게이션 구현**  
- `content` (컨텐츠 표시), `advertisement` (광고 ID 표시) 두 개의 탭으로 구성  

### 4️⃣ **UI 디자인 및 UX 최적화**
- **심플하고 직관적인 인터페이스** 적용  
- **스마트폰 & 태블릿 최적화**  
- iOS & Android에서 **일관된 UX 경험 제공**  

---

## 🛠️ 사용한 기술 및 라이브러리  
프로젝트에서 사용한 주요 라이브러리는 다음과 같습니다.  

### 📌 **기본 환경**
- **React Native** `0.72`
- **Expo** `SDK 49`
- **TypeScript**
- **React Navigation** (탭 네비게이션)

### 📌 **주요 라이브러리**
| 라이브러리 | 용도 |
|------------|--------------------------------------|
| `react-native-webview` | 웹뷰 기능 (컨텐츠 표시) |
| `react-native-google-mobile-ads` | 광고 ID 조회 및 광고 표시 |
| `expo-router` | 화면 라우팅 (탭 네비게이션) |
| `expo-splash-screen` | 스플래시 화면 관리 |
| `expo-status-bar` | 상태바 UI 커스텀 |
| `expo-device` | 기기 정보 조회 |
| `react-native-gesture-handler` | 제스처 지원 |
| `react-native-reanimated` | 애니메이션 효과 |
| `react-native-screens` | 네이티브 화면 최적화 |

---

## 🔧 **구현 과정**
### 1️⃣  WebView (컨텐츠 표시) 추가 
```sh

import { WebView } from 'react-native-webview';

export default function ContentScreen() {
  return (
    <WebView
      source={{ uri: '[https://www.naver.com](https://polycube-web.vercel.app/)' }} // 웹페이지 로드
      style={{ flex: 1 }}
      (옵션생략)
      javaScriptEnabled
      domStorageEnabled
    />
  );
}
```
react-native-webview를 사용하여 웹페이지를 앱에서 표시하도록 구현했습니다.
추가 옵션을 통해 모바일 액션을 수행하도록 구현하였습니다.

### 2️⃣ ***광고 ID 조회 및 광고 삽입***
react-native-google-mobile-ads를 활용하여 광고 삽입
개발 환경에서는 테스트 광고 ID, 실제 배포 환경에서는 실제 광고 ID를 사용하도록 처리 했습니다.
```sh
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'ios'
  ? 'ca-app-pub-****/yyyy' // iOS 실제 광고 ID
  : 'ca-app-pub-****/yyyy'; // Android 실제 광고 ID

export default function AdvertisementScreen() {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{ requestNonPersonalizedAdsOnly: true }}
    />
  );
}
```
테스트 광고 ID를 기본적으로 사용하도록 하여 광고 심사 이전에도 테스트 가능하도록 설정했습니다.

###3️⃣ ***탭 네비게이션 적용***
```sh
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="content" options={{ title: '컨텐츠' }} />
      <Tabs.Screen name="advertisement" options={{ title: '광고 ID' }} />
    </Tabs>
  );
}
```
Bottom Navigation을 추가하여 content와 advertisement 탭을 이동할 수 있도록 구성했습니다.


