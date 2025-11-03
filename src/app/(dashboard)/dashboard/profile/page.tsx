import ProfilePageBridge from './profilePageBridge';

export default function ProfilePage() {
  // Server component mínimo: delega a cliente para usar el UserProvider
  return <ProfilePageBridge />;
}
