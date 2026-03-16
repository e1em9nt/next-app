'use client';

import { Link, useRouter } from "@/pkg/libraries/locale";
import { buttonVariants, Button } from "@/app/shared/ui";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/pkg/utils/cn";
import { CardActionProps } from "./card-action.interface";

export const ProductCardAction = ({ isCompact, href = '' }: CardActionProps) => {
    const router = useRouter();

    const buttonClassName = 'ml-auto group-hover:bg-primary! group-hover:text-primary-foreground group-hover:border-primary hover:border-primary hover:bg-primary! hover:text-primary-foreground transition-colors duration-300';

    if (isCompact) {
        return (
          <Link href={href} className={cn(buttonVariants({ variant: "outline", size: "icon" }), buttonClassName)}
          >
            <ArrowRightIcon className="size-4 -rotate-45" />
            <span className="sr-only">Read more</span>
          </Link>
        );
      }
    return (
        <Button variant="outline" size="icon" className={buttonClassName} onClick={() => router.back()}>
            <ArrowRightIcon className="size-4 -rotate-180" />
            <span className="sr-only">Go back</span>
        </Button>
    )
}