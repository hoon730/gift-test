import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./Badge";

export interface ICardProps {
  id: string;
  title: string;
  imageUrl: string;
  price?: number;
  tags?: string[];
  href?: string;
}

export const Card: React.FC<ICardProps> = ({
  id,
  title,
  imageUrl,
  price,
  tags = [],
  href,
}) => {
  const content = (
    <div className="group cursor-pointer">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 mb-3">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-base font-medium text-neutral-900 line-clamp-2 group-hover:text-accent-700 transition-colors">
          {title}
        </h3>

        {price && (
          <p className="text-lg font-semibold text-neutral-900">
            {price.toLocaleString()}원
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
