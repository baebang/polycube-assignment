import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Index = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://polycube-web.vercel.app' }}
        style={styles.webview}
        javaScriptEnabled={true} // JavaScript 실행 허용
        domStorageEnabled={true} // 웹페이지의 DOM 저장소 사용 허용
        scalesPageToFit={true} // 페이지 크기 자동 조정
        startInLoadingState={true} // 페이지 로드 시 로딩 인디케이터 표시
        allowsFullscreenVideo={true} // 전체 화면 동영상 재생 허용
        setBuiltInZoomControls={true} // 확대/축소 버튼 추가 (Android 전용)
        setDisplayZoomControls={false} // 줌 컨트롤 UI 숨김 (Android)
        allowsBackForwardNavigationGestures={true} // iOS에서 뒤로가기 제스처 허용
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
