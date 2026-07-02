import { StyleSheet, View } from 'react-native';

import { AppCard, FeatureRow, Screen, SectionHeader } from '@/components/ui';
import { colors } from '@/theme';

export default function SettingsScreen() {
  return (
    <Screen>
      <SectionHeader description="Account, notifications, and care preferences." title="Settings" />
      <AppCard>
        <FeatureRow icon="person-circle" title="Account profile" />
        <View style={styles.divider} />
        <FeatureRow icon="notifications" title="Notification preferences" />
        <View style={styles.divider} />
        <FeatureRow icon="accessibility" title="Accessibility" />
        <View style={styles.divider} />
        <FeatureRow icon="shield-checkmark" title="Privacy and security" />
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  divider: { backgroundColor: colors.border, height: StyleSheet.hairlineWidth },
});
