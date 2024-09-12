export default function ProductDetail({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  return (
    <div>
      <div>Testtt123: {params.productId} </div>
    </div>
  );
}
