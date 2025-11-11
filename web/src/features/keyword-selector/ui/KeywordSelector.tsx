'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui';
import { keywords } from '@/shared/lib/mockData';

interface KeywordSelectorProps {
  onSearch?: (selectedKeywords: string[]) => void;
}

export function KeywordSelector({ onSearch }: KeywordSelectorProps) {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const toggleKeyword = (keywordId: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keywordId)
        ? prev.filter((id) => id !== keywordId)
        : [...prev, keywordId]
    );
  };

  const handleSearch = () => {
    onSearch?.(selectedKeywords);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
        키워드를 선택해주세요
      </h2>

      {/* 키워드 그룹 */}
      <div className="space-y-6">
        {['상황', '관계', '스타일'].map((category) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywords
                .filter((k) => k.category === category)
                .map((keyword) => (
                  <button
                    key={keyword.id}
                    onClick={() => toggleKeyword(keyword.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedKeywords.includes(keyword.id)
                        ? 'bg-accent-500 text-white shadow-md'
                        : 'bg-white text-neutral-700 border border-neutral-300 hover:border-accent-400 hover:bg-accent-50'
                    }`}
                  >
                    {keyword.label}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {selectedKeywords.length > 0 && (
        <div className="mt-8 text-center">
          <Button variant="primary" size="lg" onClick={handleSearch}>
            {selectedKeywords.length}개의 키워드로 검색하기
          </Button>
        </div>
      )}
    </div>
  );
}
