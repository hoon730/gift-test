import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-bold text-neutral-900 mb-3">
              선물
            </div>
            <p className="text-sm text-neutral-600 mb-4">
              키워드 조합으로 찾는 센스 있는 선물 큐레이션
            </p>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-neutral-600 hover:text-accent-700">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-neutral-600 hover:text-accent-700">
                  이용 방법
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">고객지원</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-neutral-600 hover:text-accent-700">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-600 hover:text-accent-700">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-xs text-neutral-500 text-center">
            © 2024 선물. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
