import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { AppButton, AppText, FormField, Screen, SectionHeader } from '@/components/ui';
import { colors, spacing } from '@/theme';
import { signupSchema, SignupValues } from '@/validation/auth';

export default function SignupScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' },
  });

  const submit = () => router.push('/onboarding');

  return (
    <Screen>
      <AppText color="primary" variant="h3">
        CareCircle
      </AppText>
      <SectionHeader
        description="Start a private space for your family’s care."
        title="Create your account"
      />
      <View style={styles.form}>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onBlur, onChange, value } }) => (
            <FormField
              autoComplete="name"
              error={errors.fullName?.message}
              label="Full name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
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
              error={errors.password?.message}
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onBlur, onChange, value } }) => (
            <FormField
              error={errors.confirmPassword?.message}
              label="Confirm password"
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              value={value}
            />
          )}
        />
        <AppButton label="Continue" onPress={handleSubmit(submit)} />
      </View>
      <AppText align="center" color="inkMuted">
        Already have an account?{' '}
        <Link href="/login" style={styles.link}>
          Sign in
        </Link>
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.lg },
  link: { color: colors.primary, fontWeight: '700' },
});
