'use client';

import { useCurrentUser } from '@/lib/auth.client';
import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfilePageBridge() {
  const user = useCurrentUser();
  return <ProfileForm user={user} />;
}
