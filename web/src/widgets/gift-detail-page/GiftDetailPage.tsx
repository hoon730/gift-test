import Image from "next/image";
import { Badge, Card } from "@/shared/ui";
import { mockGifts } from "@/shared/lib/mockData";
import { ShareButton } from "@/features/gift-share";
import { CartButton } from "@/features/gift-cart";
import { PurchaseButton } from "@/features/gift-purchase";

interface IGiftDetailPageProps {
  giftId: string;
}

export const GiftDetailPage = ({ giftId }: IGiftDetailPageProps) => {
  const gift = mockGifts.find((g) => g.id === giftId);
  const relatedGifts = mockGifts.filter((g) => g.id !== giftId).slice(0, 4);

  if (!gift) {
    return (
      <main className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">
          선물을 찾을 수 없습니다
        </h1>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* 메인 콘텐츠 */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 이미지 섹션 */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100">
              <Image
                src={gift.imageUrl}
                alt={gift.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 정보 섹션 */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {gift.tags.map((tag, index) => (
                  <Badge key={index} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                {gift.title}
              </h1>

              <p className="text-3xl font-bold text-accent-700 mb-6">
                {gift.price?.toLocaleString()}원
              </p>

              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                {gift.description}
              </p>
            </div>

            {/* 액션 버튼 */}
            <div className="space-y-3">
              <PurchaseButton
                giftId={gift.id}
                className="w-full"
              />

              <div className="grid grid-cols-2 gap-3">
                <CartButton
                  giftId={gift.id}
                  className="w-full flex items-center justify-center py-2 px-4 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
                />

                <ShareButton
                  giftId={gift.id}
                  giftTitle={gift.title}
                  className="w-full flex items-center justify-center py-2 px-4 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
                />
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="pt-8 border-t border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-4">
                상세 정보
              </h3>
              <dl className="space-y-3">
                <div className="flex">
                  <dt className="w-24 text-sm text-neutral-600">카테고리</dt>
                  <dd className="text-sm text-neutral-900">{gift.category}</dd>
                </div>
                <div className="flex">
                  <dt className="w-24 text-sm text-neutral-600">등록일</dt>
                  <dd className="text-sm text-neutral-900">
                    {gift.createdAt.toLocaleDateString('ko-KR')}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* 관련 상품 */}
      <section className="bg-neutral-50 py-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">
            이런 선물은 어때요?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedGifts.map((relatedGift) => (
              <Card
                key={relatedGift.id}
                id={relatedGift.id}
                title={relatedGift.title}
                imageUrl={relatedGift.imageUrl}
                price={relatedGift.price}
                tags={relatedGift.tags}
                href={`/gift/${relatedGift.id}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
