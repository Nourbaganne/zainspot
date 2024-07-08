import { MoneyValue } from "@/app/components/MoneyValue";
import Translation from "@/app/components/translation";
import { useCurrency } from "@/app/contexts/CurrencyContext";

const ZsGold = () => {
  const { currency } = useCurrency();
  return (
    <div className="flex flex-col gap-4 border-2 rounded-md border-secondary p-2 text-xl">
      <div className="flex justify-between text-text font-bold">
        <h1>ZS Gold</h1>
        <h1 className="text-alert">
          <Translation translationKey="citypage_zg_gold_alert" />
        </h1>
      </div>
      <p className="text-primary font-bold">
        <Translation translationKey="citypage_zg_gold_title" />
      </p>
      <p className="font-semibold">
        <Translation translationKey="citypage_zg_gold_description" />
      </p>

      <h1 className="text-center font-semibold">
        Now you&apos;re ready to promote your business and Go Global!
      </h1>

      <div className="flex justify-between">
        <h1 className="flex gap-4">
          1 year single payment{" "}
          <span className="text-primary">
            <MoneyValue
              value={260}
              fromCurrency="USD"
              toCurrency={currency}
              decimals={0}
            />
          </span>
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="buy"
            name="buy"
            className={`w-5 h-5 accent-primary 
                  `}
          />
          <label htmlFor="buy">Buy Now</label>
        </div>
      </div>
    </div>
  );
};

export default ZsGold;
