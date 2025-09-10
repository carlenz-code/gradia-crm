import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard'); // server redirect
  return null;
}
