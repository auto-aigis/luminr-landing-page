'use client';

export const dynamic = 'force-dynamic';

import { OnboardingWizard } from '@/app/_components/OnboardingWizard';
import { useAuthContext } from '@/app/_components/AuthProvider';

export default function OnboardingPage() {
  const { user } = useAuthContext();
  return <OnboardingWizard tier={user?.tier ?? 'free'} />;
}
