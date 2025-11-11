import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut,
  User,
  ConfirmationResult,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';

// Google 로그인
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    const result = await signInWithPopup(auth, provider);
    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('Google 로그인 오류:', error);
    return { user: null, error: error.message };
  }
};

// 이메일/비밀번호 로그인
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('이메일 로그인 오류:', error);
    let errorMessage = '로그인에 실패했습니다.';

    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = '등록되지 않은 이메일입니다.';
        break;
      case 'auth/wrong-password':
        errorMessage = '비밀번호가 올바르지 않습니다.';
        break;
      case 'auth/invalid-email':
        errorMessage = '유효하지 않은 이메일 형식입니다.';
        break;
      case 'auth/user-disabled':
        errorMessage = '비활성화된 계정입니다.';
        break;
      case 'auth/too-many-requests':
        errorMessage = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
        break;
    }

    return { user: null, error: errorMessage };
  }
};

// 이메일/비밀번호 회원가입
export const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // 사용자 이름 업데이트
    if (displayName && result.user) {
      await updateProfile(result.user, { displayName });
    }

    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('회원가입 오류:', error);
    let errorMessage = '회원가입에 실패했습니다.';

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = '이미 사용 중인 이메일입니다.';
        break;
      case 'auth/invalid-email':
        errorMessage = '유효하지 않은 이메일 형식입니다.';
        break;
      case 'auth/weak-password':
        errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
        break;
    }

    return { user: null, error: errorMessage };
  }
};

// 전화번호 로그인 - RecaptchaVerifier 설정
export const setupRecaptcha = (containerId: string) => {
  try {
    const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'normal',
      callback: () => {
        console.log('reCAPTCHA 확인 완료');
      },
      'expired-callback': () => {
        console.log('reCAPTCHA 만료됨');
      }
    });
    return recaptchaVerifier;
  } catch (error) {
    console.error('RecaptchaVerifier 설정 오류:', error);
    throw error;
  }
};

// 전화번호로 인증 코드 전송
export const sendPhoneVerification = async (
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier
): Promise<{ confirmationResult: ConfirmationResult | null; error: string | null }> => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return { confirmationResult, error: null };
  } catch (error: any) {
    console.error('전화번호 인증 오류:', error);
    let errorMessage = '인증 코드 전송에 실패했습니다.';

    switch (error.code) {
      case 'auth/invalid-phone-number':
        errorMessage = '유효하지 않은 전화번호 형식입니다.';
        break;
      case 'auth/too-many-requests':
        errorMessage = '너무 많은 요청이 있었습니다. 잠시 후 다시 시도해주세요.';
        break;
      case 'auth/quota-exceeded':
        errorMessage = 'SMS 전송 할당량이 초과되었습니다.';
        break;
    }

    return { confirmationResult: null, error: errorMessage };
  }
};

// 인증 코드 확인
export const verifyPhoneCode = async (confirmationResult: ConfirmationResult, code: string) => {
  try {
    const result = await confirmationResult.confirm(code);
    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('인증 코드 확인 오류:', error);
    let errorMessage = '인증 코드 확인에 실패했습니다.';

    switch (error.code) {
      case 'auth/invalid-verification-code':
        errorMessage = '잘못된 인증 코드입니다.';
        break;
      case 'auth/code-expired':
        errorMessage = '인증 코드가 만료되었습니다.';
        break;
    }

    return { user: null, error: errorMessage };
  }
};

// 익명 로그인
export const signInAnonymouslyUser = async () => {
  try {
    const result = await signInAnonymously(auth);
    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('익명 로그인 오류:', error);
    return { user: null, error: '익명 로그인에 실패했습니다.' };
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    console.error('로그아웃 오류:', error);
    return { error: '로그아웃에 실패했습니다.' };
  }
};

// 현재 사용자 가져오기
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
