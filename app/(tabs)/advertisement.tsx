import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

export default function Advertisement() {
  //보안을 위해 환경변수로 지정
  const iosKey: string | undefined = process.env.EXPO_PUBLIC_ADMOB_IOS_KEY;
  const androidKey: string | undefined =
    process.env.EXPO_PUBLIC_ADMOB_ANDROID_KEY;

  // 개발 환경에서는 테스트 광고 ID 사용, 실제 배포에서는 실제 광고 ID 사용
  const adUnitId: string = __DEV__
    ? TestIds.BANNER // 개발 중에는 테스트 광고 사용
    : Platform.OS === 'ios'
      ? (iosKey ?? '') // 실제 iOS 광고 ID
      : (androidKey ?? ''); // 실제 Android 광고 ID

  return (
    <View style={styles.container}>
      {/* 배너 광고를 화면 중앙에 배치 */}
      <View style={styles.adContainer}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.WIDE_SKYSCRAPER} // 광고 크기 (반응형)
          requestOptions={{
            requestNonPersonalizedAdsOnly: true, // 비개인화 광고 요청
            networkExtras: { collapsible: 'bottom' }, // 광고가 화면에 자연스럽게 배치되도록 설정
          }}
          onAdLoaded={() => console.log('광고 로드 완료')}
          onAdFailedToLoad={(error) => console.log('광고 로드 실패: ', error)}
          onAdOpened={() => console.log('광고 열림')}
          onAdClosed={() => console.log('광고 닫힘')}
        />
      </View>
    </View>
  );
}

// 🔹 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 차지하도록 설정
    justifyContent: 'center', // 세로 방향 중앙 정렬
    alignItems: 'center', // 가로 방향 중앙 정렬
    backgroundColor: '#ffffff', // 배경색 (필요에 따라 변경 가능)
  },
  adContainer: {
    width: '100%', // 가로 전체 차지
    alignItems: 'center', // 광고 중앙 정렬
  },
});
