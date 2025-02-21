import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { TestIds } from 'react-native-google-mobile-ads';

const Index = () => {
  const webViewRef = useRef<WebView>(null);

  // 광고 ID를 환경 변수에서 불러오기
  const iosKey: string | undefined = process.env.EXPO_PUBLIC_ADMOB_IOS_KEY;
  const androidKey: string | undefined =
    process.env.EXPO_PUBLIC_ADMOB_ANDROID_KEY;

  // 개발 환경에서는 테스트 광고 ID 사용, 실제 배포에서는 실제 광고 ID 사용
  const adUnitId: string = __DEV__
    ? TestIds.BANNER // 개발 중에는 테스트 광고 사용
    : Platform.OS === 'ios'
      ? (iosKey ?? '') // 실제 iOS 광고 ID
      : (androidKey ?? ''); // 실제 Android 광고 ID

  useEffect(() => {
    // 광고 ID를 웹 페이지에 전달하는 JavaScript 코드 생성
    if (webViewRef.current) {
      const jsCode = `window.postMessage(${JSON.stringify(adUnitId)}, "*");`;
      webViewRef.current.injectJavaScript(jsCode);
    }
  }, [adUnitId]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://polycube-web.vercel.app' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onMessage={(event) => {
          console.log('Message from web:', event.nativeEvent.data);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default Index;
