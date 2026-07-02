import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { AppButton, AppText, FormField, Screen, SectionHeader } from '@/components/ui';
import { colors, spacing } from '@/theme';
import { loginSchema, LoginValues } from '@/validation/auth';

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const submit = () => router.replace('/(family)');

  return (
    <Screen contentStyle={styles.screen}>
      <AppText color="primary" variant="h3">
        CareCircle
      </AppText>
      <SectionHeader description="Welcome back. Your family circle is waiting." title="Sign in" />
      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <FormField
              autoCapitalize="none"
              autoComplete="email"
              error={errors.email?.message}
              keyboardType="email-address"
              label="Email address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onBlur, onChange, value } }) => (
            <FormField
              autoComplete="password"
              error={errors.password?.message}
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              value={value}
            />
          )}
        />
        <AppButton label="Sign in" onPress={handleSubmit(submit)} />
      </View>
      <AppText align="center" color="inkMuted">
        New to CareCircle?{' '}
        <Link href="/signup" style={styles.link}>
          Create an account
        </Link>
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing.xxl },
  form: { gap: spacing.lg },
  link: { color: colors.primary, fontWeight: '700' },
});
