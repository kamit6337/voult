import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SECRET } from "@/types/secret";

import { Star, EllipsisVerticalIcon, CopyIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import CopyButton from "./CopyButton";

type Props = {
  secretsArr: SECRET[];
  isHeader?: boolean;
};

const SecretsComponent = ({ secretsArr, isHeader = true }: Props) => {
  return (
    <main className="space-y-2">
      {isHeader && (
        <>
          <div className="flex justify-between items-center">
            <p className="px-2">Secrets</p>
            <Link href={"/secrets"}>
              <Button variant={"outline"}>View All</Button>
            </Link>
          </div>
          <Separator />
        </>
      )}

      {secretsArr.map((item, i) => {
        const nameCopiedId = `${item._id}-${item.name}`;
        const valueCopiedId = `${item._id}-${item.value}`;

        return (
          <div
            key={item._id}
            className="flex gap-2 justify-between items-center text-sm"
          >
            <p className="basis-6 flex justify-center">{i + 1}</p>
            <div className="basis-10 flex justify-center">
              <Star size={16} fill={item.favourite ? "yellow" : "black"} />
            </div>
            <div className="flex-1 flex justify-between items-center gap-3 border rounded-lg p-2">
              <p className="truncate flex">{item.name}</p>
              <CopyButton value={item.name} />
            </div>
            <div className="flex-1 flex justify-between items-center gap-3 border rounded-lg p-2">
              <p className="truncate flex">{item.value}</p>
              <CopyButton value={item.value} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="">
                  <EllipsisVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-max whitespace-nowrap"
              >
                <DropdownMenuItem>Edit</DropdownMenuItem>

                <DropdownMenuItem>
                  {item.favourite ? "Remove to Favourite" : "Add to Favourite"}
                </DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
                <Separator />
                <DropdownMenuItem className="text-xs flex flex-col items-start">
                  <p>CreatedAt</p>
                  <p className="self-center">
                    {item.createdAt.toLocaleDateString()}
                  </p>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs flex flex-col items-start">
                  <p>UpdatedAt</p>
                  <p className="self-center">
                    {item.updatedAt.toLocaleDateString()}
                  </p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      })}
    </main>
  );
};

export default SecretsComponent;
