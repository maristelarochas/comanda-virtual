import { faker } from "@faker-js/faker";
import { Card } from "./ui/card";
import { Plus } from "lucide-react";
import React from "react";
import { OrderItem, Product } from "../types";
import { Modal, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle } from "./ui/dialog";
import Label from "./ui/label";
import Input from "./ui/input";


interface ProductListProps {
  onAddItem: (item: OrderItem) => void;
}

export default function ProductList({ onAddItem }: ProductListProps) {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [observations, setObservations] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = React.useState<'small' | 'medium' | 'large'>('medium');

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

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setObservations('');
    setOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedProduct) return;

    let price = 0;
    if (selectedSize === 'small') price = selectedProduct.priceSmall;
    else if (selectedSize === 'medium') price = selectedProduct.priceMedium;
    else if (selectedSize === 'large') price = selectedProduct.priceLarge;

    const orderItem: OrderItem = {
      id: Date.now(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      size: selectedSize,
      quantity: quantity,
      price: price,
      observations: observations
    };

    onAddItem(orderItem);
    setOpen(false);
  };

  const getSizeLabel = (size: 'small' | 'medium' | 'large') => {
    const labels = { small: 'P', medium: 'M', large: 'G' };
    return labels[size];
  };

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
      {mockProducts.map((product) => (
        <div
          key={product.id}
          className="border rounded cursor-pointer hover:bg-muted transition"
          onClick={() => handleOpenModal(product)}
        >
          <Card className="p-4 hover:bg-accent/50 cursor-pointer transition-colors group">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold">{product.name}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.hasSmall && (
                    <div className="inline-flex items-center px-1 font-semibold rounded-full bg-gray-100 text-sm text-muted-foreground">
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
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(product);
                  setOpen(true);
                }}
                className="p-1"
              ></button>
              <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Card>
        </div>
      ))}

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent onClose={() => setOpen(false)}>
          <ModalHeader>
            <ModalTitle>Adicionar {selectedProduct?.name} </ModalTitle>
            <ModalDescription>
              Escolha as opções do item
            </ModalDescription>
          </ModalHeader>
          <ModalTitle>
            <div>
              <Label>Tamanho</Label>
              <div className="flex gap-2 mt-2">
                {selectedProduct?.hasSmall && (
                  <button
                    className={`px-4 py-2 rounded border ${
                      selectedSize === 'small'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-accent'
                    }`}
                    onClick={() => setSelectedSize('small')}
                  >
                    P - R$ {selectedProduct.priceSmall}
                  </button>
                )}
                {selectedProduct?.hasMedium && (
                  <button
                    className={`px-4 py-2 rounded border ${
                      selectedSize === 'medium'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-accent'
                    }`}
                    onClick={() => setSelectedSize('medium')}
                  >
                    M - R$ {selectedProduct.priceMedium}
                  </button>
                )}
                {selectedProduct?.hasLarge && (
                  <button
                    className={`px-4 py-2 rounded border ${
                      selectedSize === 'large'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-accent'
                    }`}
                    onClick={() => setSelectedSize('large')}
                  >
                    G - R$ {selectedProduct.priceLarge}
                  </button>
                )}
              </div>
              </div>
              <div>
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <div>
              <Label>Observações</Label>
              <Input
                type="text"
                placeholder="Ex: sem cebola, bem passado..."
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="mt-2 border"
              />
            </div>
          </ModalTitle>
          <ModalFooter>
            <button
              className="rounded border px-4 py-2"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>

            <button
              className="rounded bg-primary px-4 py-2 text-primary-foreground"
              onClick={handleConfirm}
            >
              Confirmar
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
