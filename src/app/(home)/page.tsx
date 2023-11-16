import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import SectionTitle from "../../components/ui/section-title";
import PromoBanner from "./components/promo-banner";
import { KeyboardIcon, ListIcon, MouseIcon, ThumbsUpIcon } from "lucide-react";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        //Maior que 0
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 py-8 lg:container">
      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 55% de desconto esse mês!"
      />

      <div className="lg:mt-8 px-5">
        <div className="flex">
          <ListIcon color="#5235c5" />
          <SectionTitle>Departamentos</SectionTitle>
        </div>
        <Categories />
      </div>

      <div>
        <div className="flex px-5">
          <ThumbsUpIcon color="#5235c5" />
          <SectionTitle>Ofertas</SectionTitle>
        </div>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/banner-home-02.png"
        alt="Até 55% de desconto em mouses!"
      />

      <div>
        <div className="flex px-5">
          <KeyboardIcon color="#5235c5" />
          <SectionTitle>Teclados</SectionTitle>
        </div>
        <ProductList products={keyboards} />
      </div>

      <div>
        <PromoBanner
          src="/banner-home-03.png"
          alt="Até 20% de desconto em fones!"
        />
      </div>

      <div>
        <div className="flex px-5">
          <MouseIcon color="#5235c5" />
          <SectionTitle>Mouses</SectionTitle>
        </div>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
