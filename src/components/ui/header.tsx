"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageSearchIcon,
  PercentIcon,
  SearchIcon,
  ShoppingCartIcon,
  User2Icon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { Input } from "./input";

const Header = () => {
  const { status, data } = useSession();

  const { products } = useContext(CartContext);

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <Card className="flex items-center justify-between p-[1.5rem] lg:p-[1.875rem] ">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>

                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">Boas compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {status === "unauthenticated" && (
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogInIcon size={16} />
                Fazer login
              </Button>
            )}

            {status === "authenticated" && (
              <Button
                onClick={handleLogoutClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogOutIcon size={16} />
                Fazer logout
              </Button>
            )}

            <SheetClose asChild>
              <Link href={"/"}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HomeIcon size={16} />
                  Início
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/orders"}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PackageSearchIcon size={16} />
                  Meus Pedidos
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/deals"}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PercentIcon size={16} />
                  Ofertas
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/catalog"}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex items-center justify-between lg:container md:gap-6">
        <Link href={"/"}>
          <h1 className="text-lg font-semibold lg:text-2xl">
            <span className="text-primary ml-1 mr-1">FSW</span> 
            <span className="hidden md:inline ">Store</span> 
          </h1>
        </Link>

        <div className="flex items-center rounded-lg border-2 border-primary">
          <Input
            placeholder="Busque aqui"
            className="rounded-r-none lg:w-[32rem]"
          />
          <div className="bg-primary px-4 py-1.5">
            <SearchIcon size={28} />
          </div>
        </div>

        <div className="hidden items-center gap-2 text-sm lg:flex ">
          <div className="rounded-full border-2 border-primary p-1">
            <User2Icon size={32} />
          </div>
          <div>
            <Button
              onClick={handleLoginClick}
              variant={"outline"}
              className="block"
            >
              <strong>Faça login</strong>
            </Button>
            <Link href={"/"}>
              Crie seu <strong>cadastro</strong>
            </Link>
          </div>
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <div className=" relative ">
              {products.length > 0 ? (
                <span className="absolute -right-4 -top-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs">
                  {products.length}
                </span>
              ) : null}
              <ShoppingCartIcon className="ml-2"/>
            </div>
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[380px]">
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
