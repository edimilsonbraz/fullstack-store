"use client";

import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TruckIcon,
} from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "basePrice" | "description" | "discountPercentage" | "totalPrice" | "name"
  >;
}

const ProductInfo = ({
  product: { name, basePrice, description, discountPercentage, totalPrice },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</h1>
        {discountPercentage > 0 && (
          <DiscountBadge>{discountPercentage}</DiscountBadge>
        )}
      </div>

      {discountPercentage > 0 && (
        <div>
          <span className="mr-1 text-sm opacity-75">De:</span>
          <span className="text-sm line-through opacity-75">
            R$ {Number(basePrice).toFixed(2)}
          </span>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          onClick={handleDecreaseQuantityClick}
          size="icon"
          variant="outline"
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          onClick={handleIncreaseQuantityClick}
          size="icon"
          variant="outline"
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col  gap-3">
        <h3 className="font-bold">Descrição</h3>

        <p className="text-justify text-sm opacity-60">{description}</p>
      </div>

      <Button className="mt-8 font-bold uppercase">
        Adicionar ao carrinho
      </Button>

      <div className="mb-10 mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />

          <div className="flex flex-col">
            <p>
              Entrega via <span className="font-bold">FSPacket</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>

        <p className="text-sm font-semibold">Frete grátis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
