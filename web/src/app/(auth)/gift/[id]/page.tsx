import { GiftDetailPage } from "@/widgets/gift-detail-page";

interface IPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GiftDetail({ params }: IPageProps) {
  const { id } = await params;
  return <GiftDetailPage giftId={id} />;
}
