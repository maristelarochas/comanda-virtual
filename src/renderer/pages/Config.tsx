import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { link } from "fs";

export default function Config() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="min-h-screen bg-muted/30">
        <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Comanda Virtual</h1>
            <Button variant="outline" className="mr-2 h-8 w-30" onClick={() => navigate("/")}>
              Configurações
            </Button>
          </div>
        </header>
        <div className="container py-6">
          <div className="grid grid-rows-2 gap-3">
            <Button
              className="border w-full h-40 text-xl hover:bg-orange-100"
              onClick={() => navigate('/')}
              variant="link"
            > Visualizar Pedidos
            </Button>
            <Button
              className="border w-full h-40 text-xl hover:bg-orange-100"
              onClick={() => navigate('/')}
              variant="link"
            > Editar Produtos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
