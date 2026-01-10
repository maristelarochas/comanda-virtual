import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardBody } from "../../components/ui/card";
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from "../../components/ui/dialog";
import React, { useState } from "react";
import "./../index.css";
import Input from "../../components/ui/input";
import Label from "../../components/ui/label";
import { OrderItem, Product } from "../../types";
import ProductList from "../../components/ProductList";
import OrderItemsList from "../../components/OrderItemsList";
import OrderSummary from "../../components/OrderSummary";
import { Checkbox } from "../../components/ui/checkbox";
import { useNavigate } from "react-router-dom";

export default function NewOrder() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [hasDelivery, setHasDelivery] = useState(false);
  const [customerObservations, setCustomerObservations] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  const addOrderItem = (item: OrderItem) => {
    setOrderItems([...orderItems, { ...item, id: Date.now() }]);
  };

  const removeOrderItem = (id: number) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const updateOrderItem = (id: number, updates: Partial<OrderItem>) => {
    setOrderItems(orderItems.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + (deliveryPrice || 0);
  };

  const handleCompleteOrder = () => {
    if(!customerName.trim()) {
      setShowAlertModal(true);
      return;
    }
    console.log("Pedido concluído!");
  }

  const handleCancelOrder = () => {
    setShowCancelModal(true);
  }

  const confirmCancel = () => {
    setCustomerName("");
    setCustomerPhone("");
    setOrderItems([]);
    setDeliveryPrice(0);
    setCustomerObservations("");
    setShowCancelModal(false);
    setHasDelivery(false);
    setCustomerAddress("");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Comanda Virtual</h1>
          <Button variant="outline" className="mr-2 h-8 w-30" onClick={() => navigate("/config")}>
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
              <Input id="Name"
                     placeholder="Nome do cliente"
                     value={customerName}
                     onChange={(e) => setCustomerName(e.target.value)}
                     />
              <Label>Telefone</Label>
              <Input type="number" inputMode="numeric" id="Phone"
                     placeholder="(00) 00000-0000"
                     value={customerPhone}
                     onChange={(e) => setCustomerPhone(e.target.value)}
                     />
              <Label>Observações</Label>
              <Input type="text"
                     id="Observations"
                     placeholder="Observações do Cliente"
                     value={customerObservations}
                     onChange={(e) => setCustomerObservations(e.target.value)}
                     />
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={hasDelivery}
                    onChange={setHasDelivery}
                  />
                  <Label className="">Entrega</Label>
                </div>
                {hasDelivery && (
                  <div>
                    <Label>Endereço</Label>
                    <Input type="text"
                            id="customerAddress"
                            placeholder="Endereço do cliente"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            />
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          <Card className="border max-h-screen">
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
            </CardHeader>
            <CardBody>
              <ProductList onAddItem={addOrderItem} />
            </CardBody>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="border">
              <CardHeader>
                <CardTitle>Itens do Pedido</CardTitle>
              </CardHeader>
              <CardBody>
                <OrderItemsList items={orderItems}
                                onRemoveItem={removeOrderItem}
                                onUpdateItem={updateOrderItem}/>
              </CardBody>
            </Card>
            <Card className="border">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardBody>
              <OrderSummary
                  subtotal={calculateSubtotal()}
                  deliveryPrice={deliveryPrice || 0}
                  total={calculateTotal()}
                  />
              </CardBody>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={handleCompleteOrder}
                variant="default"
                className="flex-1"
              >
                Concluir Pedido
              </Button>

              <Button
                onClick={handleCancelOrder}
                variant="destructive"
                className="flex-2"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal open={showAlertModal} onOpenChange={setShowAlertModal}>
        <ModalContent onClose={() => setShowAlertModal(false)}>
          <ModalHeader>
            <ModalTitle>Atenção</ModalTitle>
            <ModalDescription>
              Por favor, insira o nome do cliente.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button onClick={() => setShowAlertModal(false)} variant="default">
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal open={showCancelModal} onOpenChange={setShowCancelModal}>
        <ModalContent onClose={() => setShowCancelModal(false)}>
          <ModalHeader>
            <ModalTitle>Cancelar Pedido</ModalTitle>
            <ModalDescription>
              Tem certeza que deseja cancelar o pedido? Todos os dados serão perdidos.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button onClick={() => setShowCancelModal(false)} variant="outline">
              Não
            </Button>
            <Button onClick={confirmCancel} variant="destructive">
              Sim, Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
