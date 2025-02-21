import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Platform, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { TestIds } from 'react-native-google-mobile-ads';

const Index = () => {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    if (webViewRef.current) {
      const sendData = JSON.stringify({
        type: 'adUnitId',
        content: adUnitId,
      });
      webViewRef.current.postMessage(JSON.stringify(sendData)); // adUnitId를 웹뷰로 전송
    }
  }, [adUnitId]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://polycube-web.vercel.app/' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onLoad={(e) => {
          if (webViewRef.current) {
            const sendData = JSON.stringify({
              type: 'adUnitId',
              message: adUnitId,
            });
            webViewRef.current.postMessage(JSON.stringify(sendData)); // adUnitId를 웹뷰로 전송
          }
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
