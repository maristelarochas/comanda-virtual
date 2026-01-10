import { de } from "@faker-js/faker";
import { Card } from "./ui/card";
import { OrderItem } from "../types";
import Input from "./ui/input";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface OrderItemsListProps {
  items: OrderItem[];
  onRemoveItem?: (id: number) => void;
  onUpdateItem?: (id: number, updates: Partial<OrderItem>) => void;
}

export default function OrderItemsList({ items, onRemoveItem, onUpdateItem }: OrderItemsListProps) {
  const getSizeLabel = (size: string) => {
    const labels = { small: 'P', medium: 'M', large: 'G' };
    return labels[size as keyof typeof labels] || size;
  };

const formatPrice = (price?: number) => {
  if (typeof price !== 'number') {
    return 'R$ 0,00';
  }

  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

  if (items.length === 0) {
    return <div className="text-sm text-center mb-5 text-muted-foreground">Nenhum item adicionado ao pedido</div>;
  }

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
      {items.map((item) => (
        <Card key={item.id} className="border p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="font-semibold text-sm">{item.productName} ({getSizeLabel(item.size)})</div>
              {item.observations && (
                <div className="text-xs text-muted-foreground mt-1">
                  Obs: {item.observations}
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateItem?.(item.id, { quantity: parseInt(e.target.value) || 1 })}
                  className="w-16 h-8 text-sm"
                />
                <span className="text-xs text-muted-foreground">x</span>
                <span className="text-sm font-medium">
                  {formatPrice(item.price)}
                </span>
                <span className="text-xs text-muted-foreground">=</span>
                <span className="text-sm font-semibold text-primary">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
            <Button onClick={() => onRemoveItem && onRemoveItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
