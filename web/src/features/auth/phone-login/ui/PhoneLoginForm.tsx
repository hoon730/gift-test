'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { sendPhoneVerification, verifyPhoneCode, setupRecaptcha } from '@/shared/lib/auth';

export function PhoneLoginForm() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let verifier = recaptchaVerifier;
      if (!verifier) {
        verifier = setupRecaptcha('recaptcha-container');
        setRecaptchaVerifier(verifier);
      }

      const { confirmationResult: result, error: phoneError } = await sendPhoneVerification(
        phoneNumber,
        verifier
      );

      if (phoneError) {
        setError(phoneError);
        setLoading(false);
        return;
      }

      setConfirmationResult(result);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!confirmationResult) {
      setError('먼저 인증 코드를 요청해주세요.');
      setLoading(false);
      return;
    }

    const { user, error: verifyError } = await verifyPhoneCode(confirmationResult, verificationCode);

    if (verifyError) {
      setError(verifyError);
      setLoading(false);
      return;
    }

    router.push('/');
  };

  return (
    <div className="mt-8 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {!confirmationResult ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              전화번호
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="+82 10-1234-5678"
            />
            <p className="mt-1 text-xs text-gray-500">
              국가 코드를 포함해서 입력하세요 (예: +82 10-1234-5678)
            </p>
          </div>

          <div id="recaptcha-container"></div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '전송 중...' : '인증 코드 전송'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              인증 코드
            </label>
            <input
              id="code"
              type="text"
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="6자리 코드"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '확인 중...' : '인증 코드 확인'}
          </button>

          <button
            type="button"
            onClick={() => setConfirmationResult(null)}
            className="w-full text-sm text-indigo-600 hover:text-indigo-500"
          >
            다시 전송하기
          </button>
        </form>
      )}
    </div>
  );
}
