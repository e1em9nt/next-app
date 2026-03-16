import { Link } from "@/pkg/libraries/locale";
import { CardImageContainerProps } from "./card-image-container.interface";

export const CardImageContainer = ({ children, isCompact, href = '' }: CardImageContainerProps) => {
    const className = 'mb-6 overflow-hidden rounded-lg sm:mb-12';
    if (isCompact) {
        return (
            <Link href={href} className={`${className} block`}>
                {children}
            </Link>
        )
    } else {
        return (
            <div className={className}>{children}</div>
        )
    }
}