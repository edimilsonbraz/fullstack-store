import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        //Maior que 0 
        gt: 0,
      },
    },
  })

  return (
    <div>
      <Image
        className="h-auto w-full px-5"
        sizes="100vw"
        src="/banner-home-01.png"
        height={0}
        width={0}
        alt="Até 55% de desconto esse mês!"
      />

      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <p className="mb-3 font-semibold uppercase pl-5">Oferta</p>
        <ProductList products={deals}/>
      </div>

      <Image
        className="h-auto w-full px-5"
        sizes="100vw"
        src="/banner-home-02.png"
        height={0}
        width={0}
        alt="Até 55% de desconto em mouses!"
      />
    </div>
  );
}
