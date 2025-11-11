"use client";

import { useState } from "react";
import { Modal } from "@/shared/ui";

export interface IShareButtonProps {
  giftId: string;
  giftTitle: string;
  className?: string;
}

export const ShareButton = ({ giftId, giftTitle, className = "" }: IShareButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/gift/${giftId}`
    : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("링크 복사 실패:", err);
    }
  };

  const handleShareKakao = () => {
    // 카카오톡 공유 (실제 구현시 카카오 SDK 필요)
    alert("카카오톡 공유 기능은 추후 구현 예정입니다.");
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(giftTitle)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        공유하기
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="공유하기"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-600 mb-6">
            이 선물을 공유해보세요!
          </p>

          {/* 소셜 공유 버튼 */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={handleShareKakao}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">K</span>
              </div>
              <span className="text-xs text-neutral-700">카카오톡</span>
            </button>

            <button
              onClick={handleShareFacebook}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-xs text-neutral-700">페이스북</span>
            </button>

            <button
              onClick={handleShareTwitter}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <span className="text-xs text-neutral-700">X (Twitter)</span>
            </button>
          </div>

          {/* 링크 복사 */}
          <div className="pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-700"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors text-sm font-medium whitespace-nowrap"
              >
                {copied ? "복사됨!" : "복사"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
