import Link from "next/link";
import { Button, Card } from "@/shared/ui";
import { mockGifts } from "@/shared/lib/mockData";
import { KeywordSelector } from "@/features/keyword-selector";

export const HomePage = () => {
  return (
    <main className="bg-gradient-to-b from-primary-50 to-white">
      {/* 히어로 섹션 */}
      <section className="container-custom pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            센스 있는 선물,
            <br />
            <span className="text-accent-600">키워드로 찾아보세요</span>
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            상황, 관계, 스타일을 조합하여
            <br />딱 맞는 선물을 추천받아보세요
          </p>
        </div>
      </section>

      {/* 키워드 선택 섹션 */}
      <section className="container-custom pb-16">
        <KeywordSelector />
      </section>

      {/* 큐레이션 피드 섹션 */}
      <section className="container-custom py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-neutral-900">
            인기 큐레이션
          </h2>
          <Link href="/gifts">
            <Button variant="ghost">전체보기</Button>
          </Link>
        </div>

        {/* 그리드 레이아웃 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockGifts.map((gift) => (
            <Card
              key={gift.id}
              id={gift.id}
              title={gift.title}
              imageUrl={gift.imageUrl}
              price={gift.price}
              tags={gift.tags}
              href={`/gift/${gift.id}`}
            />
          ))}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="container-custom py-20">
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 시작해보세요
          </h2>
          <p className="text-accent-100 mb-8 text-lg">
            회원가입하고 맞춤형 선물 추천을 받아보세요
          </p>
          <Link href="/login">
            <Button variant="secondary" size="lg">
              무료로 시작하기
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};
