import { AuthPage } from '@/components/auth-page';

export default function SignUpPage({ searchParams }: { searchParams: { callbackUrl?: string } }) {
  return <AuthPage callbackUrl={searchParams.callbackUrl ?? '/'} mode="signup" />;
}
