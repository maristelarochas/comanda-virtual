import { Card } from "./ui/card";

interface OrderSummaryProps {
  subtotal: number;
  deliveryPrice: number;
  total: number;
}

export default function OrderSummary({ subtotal, deliveryPrice, total }: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <Card className="p-6">
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        {deliveryPrice > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Taxa de Entrega:</span>
            <span className="font-medium">{formatPrice(deliveryPrice)}</span>
          </div>
        )}

        <div className="flex justify-between pt-3 border-t">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold text-primary">{formatPrice(total)}</span>
        </div>
      </div>
    </Card>
  );
}
