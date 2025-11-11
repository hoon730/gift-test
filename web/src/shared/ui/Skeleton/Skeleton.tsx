import React from "react";

export interface ISkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  className = "",
  variant = "rectangular",
  width,
  height,
}: ISkeletonProps) => {
  const baseClasses = "animate-pulse bg-neutral-200";

  const variantClasses = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const style: React.CSSProperties = {
    width: width || "100%",
    height: height || (variant === "text" ? "1rem" : "100%"),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

// 카드 스켈레톤
export const CardSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton variant="rectangular" height="200px" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width="60px" height="24px" />
        <Skeleton variant="rectangular" width="60px" height="24px" />
      </div>
    </div>
  );
};

// 리스트 아이템 스켈레톤
export const ListItemSkeleton = () => {
  return (
    <div className="flex gap-4 p-4">
      <Skeleton variant="rectangular" width="80px" height="80px" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  );
};

// 페이지 스켈레톤
export const PageSkeleton = () => {
  return (
    <div className="container-custom py-12 space-y-8">
      <div className="space-y-4">
        <Skeleton variant="text" width="300px" height="40px" />
        <Skeleton variant="text" width="500px" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
