import { DEFAULT_CURRENCY } from "@/utils/constants";

export const Price = ({
  amount,
  className,
  currencyCode = DEFAULT_CURRENCY,
  ...rest
}: {
  amount: string;
  className?: string;
  currencyCode: string;
} & React.ComponentProps<"p">) => (
  <p className={className} suppressHydrationWarning={true} {...rest}>
    {`${new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).format(parseFloat(amount))}`}
  </p>
);
