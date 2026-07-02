import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppButton, AppCard, AppText, FormField, Screen, SectionHeader } from '@/components/ui';
import { useAppStore } from '@/store/app-store';
import { colors, radius, spacing } from '@/theme';

export default function OnboardingScreen() {
  const { completeOnboarding, setRole } = useAppStore();

  const finish = () => {
    setRole('admin');
    completeOnboarding();
    router.replace('/(family)');
  };

  return (
    <Screen>
      <View style={styles.progress}>
        <View style={styles.progressFill} />
      </View>
      <SectionHeader
        description="A few details will personalize the space. You can change these later."
        title="Create your family circle"
      />
      <FormField label="Family circle name" placeholder="e.g. Menon Family" />
      <FormField label="Who are you caring for?" placeholder="Your loved one’s name" />
      <AppText variant="caption">Your role</AppText>
      <Pressable>
        <AppCard style={styles.roleCard}>
          <View style={styles.roleIcon}>
            <Ionicons color={colors.primary} name="people" size={24} />
          </View>
          <View style={styles.roleCopy}>
            <AppText variant="bodyStrong">Family administrator</AppText>
            <AppText color="inkMuted" variant="caption">
              Set up care details and invite family members.
            </AppText>
          </View>
          <Ionicons color={colors.primary} name="checkmark-circle" size={26} />
        </AppCard>
      </Pressable>
      <AppButton label="Create care circle" onPress={finish} />
      <AppText align="center" color="inkMuted" variant="caption">
        CareCircle is for coordination and does not replace emergency services.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progress: {
    backgroundColor: colors.border,
    borderRadius: radius.pill,
    height: 6,
    overflow: 'hidden',
  },
  progressFill: { backgroundColor: colors.primary, height: 6, width: '50%' },
  roleCard: { alignItems: 'center', flexDirection: 'row', gap: spacing.md },
  roleIcon: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  roleCopy: { flex: 1, gap: 2 },
});
