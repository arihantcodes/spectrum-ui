import { AuthPage } from '@/components/auth-page';

export default async function SignUpPage(props: { searchParams: Promise<{ callbackUrl?: string }> }) {
  const searchParams = await props.searchParams;
  return <AuthPage callbackUrl={searchParams.callbackUrl ?? '/'} mode="signup" />;
}
