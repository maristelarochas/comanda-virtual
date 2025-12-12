import { de } from "@faker-js/faker";
import { Card } from "./ui/card";
import { OrderItem } from "../types";

interface OrderItemsListProps {
  items: OrderItem[];
}

export default function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
      {items.map((item) => (
        <Card key={item.id} className="p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="font-semibold text-sm">{item.productName}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
