export default function Brand({ params }: { params: { brand: string } }) {
  return (
    <div>
      <div>This page is brand: {params.brand}</div>
    </div>
  );
}
