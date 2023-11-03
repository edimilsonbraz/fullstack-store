import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: true;
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              Pedido com {order.orderProducts.length} produto(s)
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p className="uppercase">Status</p>
                  <p className="mt-1 text-[#8162FF]">{order.status}</p>
                </div>
                <div>
                  <p className="font-bold uppercase">Data</p>
                  <p className="mt-1 opacity-60">
                    {format(order.createdAt, "dd/MM/y")}
                  </p>
                </div>
                <div>
                  <p className="font-bold uppercase">Pagamento</p>
                  <p className="mt-1 opacity-60">Cartão</p>
                </div>
              </div>

              {/* PRODUTOS */}
              <div className="flex flex-col">
                <div className="flex">
                  {/* {order.orderProducts.map(product => (
                  <p>{product.basePrice}</p>
                ))} */}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
