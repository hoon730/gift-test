import React from "react";
import Link from "next/link";
import { Button } from "@/shared/ui";

export interface IComingSoonPageProps {
  title?: string;
  description?: string;
}

export const ComingSoonPage = ({
  title = "준비중입니다",
  description = "현재 페이지를 준비하고 있습니다. 빠른 시일 내에 찾아뵙겠습니다!",
}: IComingSoonPageProps) => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* 이모지 아이콘 */}
          <div className="text-8xl animate-bounce">🎁</div>

          {/* 제목 */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-neutral-900">{title}</h1>
            <p className="text-lg text-neutral-600">{description}</p>
          </div>

          {/* 액션 버튼 */}
          <div className="flex items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">
                홈으로 돌아가기
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline" size="lg">
                둘러보기
              </Button>
            </Link>
          </div>

          {/* 추가 정보 */}
          <div className="pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-500">
              궁금한 점이 있으신가요?{" "}
              <a
                href="mailto:support@example.com"
                className="text-accent-600 hover:text-accent-700 font-medium"
              >
                문의하기
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
