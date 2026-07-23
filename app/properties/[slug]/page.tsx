import PropertyDetailsClient from "./PropertyDetailsClient";

export async function generateStaticParams() {
  return [
    { slug: "ajuba-smart-city" },
    { slug: "nouveau-heights" },
    { slug: "kayceelaw-residence" },
    { slug: "grand-horizon" },
  ];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PropertyDetailsClient slug={slug} />;
}