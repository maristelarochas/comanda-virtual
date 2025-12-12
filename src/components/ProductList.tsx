import { faker } from "@faker-js/faker";
import { Card } from "./ui/card";
import { Plus } from "lucide-react";


interface ProductListProps {
  onAddItem: (item: any) => void;
}

export default function ProductList({ onAddItem }: ProductListProps) {
  const mockProducts = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: faker.commerce.productName(),
    hasSmall: faker.datatype.boolean(),
    hasMedium: true,
    hasLarge: faker.datatype.boolean(),
    priceSmall: faker.number.int({ min: 10, max: 20 }),
    priceMedium: faker.number.int({ min: 20, max: 30 }),
    priceLarge: faker.number.int({ min: 30, max: 40 })
  }));

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
      {mockProducts.map((product) => (
        <div
          key={product.id}
          className="border rounded cursor-pointer hover:bg-muted transition"
          onClick={() => onAddItem(product)}
        >
          <Card className="p-4 hover:bg-accent/50 cursor-pointer transition-colors group">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold">{product.name}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.hasSmall && (
                    <div className="inline-flex items-center px-2 font-semibold rounded-full bg-gray-100 text-sm text-muted-foreground">
                      P: R$ {product.priceSmall}
                    </div>
                  )}
                  {product.hasMedium && (
                    <div className="inline-flex items-center px-1 font-semibold rounded-full bg-gray-100 text-sm text-muted-foreground">
                      M: R$ {product.priceMedium}
                    </div>
                  )}
                  {product.hasLarge && (
                    <div className="inline-flex items-center px-1 font-semibold rounded-full bg-gray-100 text-sm text-muted-foreground">
                      G: R$ {product.priceLarge}
                    </div>
                  )}
                </div>
              </div>
              <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
