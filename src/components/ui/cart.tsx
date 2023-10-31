import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { createOrder } from "@/actions/order";

const Cart = () => {
  const { data } = useSession()

  const { products, total, subtotal, totalDiscount } = useContext(CartContext)
  
  const handleFinishPurchaseClick = async () => {
    if(!data?.user) {
      //TODO: redirecionar para o login 
      return
    }
    //Cria pedido no Banco
    await createOrder(products, (data?.user as any).id)

    const checkout = await createCheckout(products)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    //Quando finaliza compra redireciona pro Checkout do Stripe
    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    })
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant={"outline"}
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      {/* RENDERIZANDO OS PRODUTOS */}
      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-5">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center text-xs">
                Carrinho vazio. Vamos fazer compras ?
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Subtotal</p>
            <p>R$ {subtotal.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Entrega</p>
            <p className="uppercase">Grátis</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p>Descontos</p>
            <p>- {totalDiscount.toFixed(2)}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-base font-bold">
            <p>Total</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>

          <Button
            onClick={handleFinishPurchaseClick}
            className="mt-7 font-bold uppercase"
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
