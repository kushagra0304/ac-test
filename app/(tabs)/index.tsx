import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Call, Voice } from '@twilio/voice-react-native-sdk';
import axios from 'axios';
import { Image } from 'expo-image';
import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';

async function getTwilioCallToken() {
  const response = await axios.get('https://acdc16273db5.ngrok-free.app/api/get-twilio-call-token', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}


export default function HomeScreen() {
    useEffect(() => {
      const initializeTwilio = async () => {
          try {
            // Get access token from your server
            const response = await getTwilioCallToken();
            
            console.log(response.token)
            
            const voice = new Voice();
          
            const call = await voice.connect(response.token, {
              params: {
                From: "+13135136257",
                To: "+917081056000"
              }
            });


            call.on(Call.Event.Ringing, (d) => {
              console.log(d)
            })

            call.on(Call.Event.QualityWarningsChanged, (d) => {
              console.log(d)
            })

            call.on(Call.Event.Reconnecting, (d) => {
              console.log(d)
            })

            call.on(Call.Event.Connected, (d) => {
              console.log(d)
            })

            call.on(Call.Event.Disconnected, (d) => {
              console.log(d)
            })

            call.on(Call.Event.ConnectFailure, (d) => {
              console.log(d)
            })

            call.on(Call.Event.MessageReceived, (d) => {
              console.log(d)
            })

            // console.log(call)

            // setError(JSON.stringify(call))
          } catch (error) {
            console.log(error)
          }
      };

      initializeTwilio()
  }, [])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
