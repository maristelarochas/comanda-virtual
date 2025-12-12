import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardBody } from "../../components/ui/card";
import Config from "./Config";
import React, { useState } from "react";
import "./../index.css";
import Input from "../../components/ui/input";
import Label from "../../components/ui/label";
import { OrderItem, Product } from "../../types";
import ProductList from "../../components/ProductList";
import OrderItemsList from "../../components/OrderItemsList";

export default function NewOrder() {
const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

const addOrderItem = (item: OrderItem) => {
    setOrderItems([...orderItems, { ...item, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Comanda Virtual</h1>
          <Button onClick={<Config/>}>
            Configurações
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          <Card className="border">
            <CardHeader>
              <CardTitle>Informações do Cliente</CardTitle>
            </CardHeader>
            <CardBody >
              <Label>Nome</Label>
              <Input id="Name" placeholder="Nome do cliente"/>
              <Label>Telefone</Label>
              <Input type="number" id="Phone" placeholder="Telefone do cliente"/>
              <Label>Observações</Label>
              <Input type="text" id="Observations" placeholder="Observações"/>
            </CardBody>
          </Card>
          <Card className="border">
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
            </CardHeader>
            <CardBody>
              <ProductList onAddItem={addOrderItem} />
            </CardBody>
          </Card>
          <Card className="border">
            <CardHeader>
              <CardTitle>Itens do Pedido</CardTitle>
            </CardHeader>
            <CardBody>
              <OrderItemsList items={orderItems} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
