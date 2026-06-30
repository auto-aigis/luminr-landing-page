'use client';

export const dynamic = 'force-dynamic';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authApi } from '@/app/_lib/api';
import { useAuthContext } from '@/app/_components/AuthProvider';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuthContext();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>(token ? 'loading' : 'pending');
  const [errorMsg, setErrorMsg] = useState('');
  const [resent, setResent] = useState(false);

  if (token) {
    const handleVerify = async () => {
      try {
        await authApi.verifyEmail(token);
        await refresh();
        setStatus('success');
        setTimeout(() => router.push('/dashboard'), 1500);
      } catch (err) {
        setStatus('error');
        setErrorMsg(err instanceof Error ? err.message : 'Verification failed');
      }
    };

    if (status === 'loading') {
      handleVerify();
      return (
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Loader2 className="w-10 h-10 text-teal-600 mx-auto animate-spin" />
            <p className="mt-4 text-gray-600">Verifying your email...</p>
          </CardContent>
        </Card>
      );
    }

    if (status === 'success') {
      return (
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />
            <p className="mt-4 text-gray-900 font-medium">Email verified!</p>
            <p className="text-gray-600">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      );
    }

    if (status === 'error') {
      return (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Verification Failed</CardTitle>
            <CardDescription className="text-center">{errorMsg}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button className="w-full">Back to Login</Button>
            </Link>
          </CardContent>
        </Card>
      );
    }
  }

  const handleResend = async () => {
    if (!email) return;
    try {
      await authApi.resendVerification(email);
      setResent(true);
      setTimeout(() => setResent(false), 3000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to resend');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Mail className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a verification link to{' '}
            <span className="font-medium text-gray-900">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Click the link in the email to verify your account.
          </p>
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errorMsg}
            </div>
          )}
          {resent && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Verification email sent!
            </div>
          )}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResend}
            disabled={!email || resent}
          >
            {resent ? 'Email sent!' : 'Resend verification email'}
          </Button>
          <div className="text-center text-sm">
            <Link href="/login" className="text-teal-600 hover:underline">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full" />
      </div>
    }>
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
