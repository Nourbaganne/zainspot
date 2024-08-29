import { MoneyValue } from "@/app/components/MoneyValue";
import Translation from "@/app/components/translation";
import { useCurrency } from "@/app/contexts/CurrencyContext";

const ZsGold = ({ amount }: { amount: number }) => {
  const { currency } = useCurrency();
  return (
    <div className="flex flex-col gap-4 border-2 font-sans rounded-md border-secondary  px-2 py-4">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1
            className="font-sans font-semibold text-[36px]">
            ZS Gold
          </h1>
          <h1
            className="font-sans font-extrabold text-bold-italic-22 italic  text-alert uppercase"
            style={{ letterSpacing: '-0.01em' }}
          >
            <Translation translationKey="citypage_zg_gold_alert" />
          </h1>

        </div>
        <p className="font-sans font-extrabold leading-[26.1px] uppercase text-primary">
          <Translation translationKey="citypage_zg_gold_title" />
        </p>

      </div>

      <p className="font-sans font-semibold text-lg leading-[27px]  tracking-wide"
        style={{ wordSpacing: '0.2em', textAlign: 'justify' }}>
        <Translation translationKey="citypage_zg_gold_description" />
      </p>

      <h1 className="text-center font-bold text-xl">
        <Translation translationKey="citypage_cards_subtitle" />
      </h1>

      <div className="flex justify-between font-semibold">
        <h1 className="flex gap-20">
          <Translation translationKey="citypage_single_payment" />
          <span className="text-primary text-lg">
            <MoneyValue
              value={amount}
              fromCurrency="USD"
              toCurrency={currency}
              decimals={0}
            />
          </span>
        </h1>
        <div className="flex items-center gap-4">
          <input
            type="radio"
            id="buy"
            name="buy"
            className="w-6 h-6 border-[3px] border-text-foreground text-[#00927C]  focus:ring-[#00927C]"
          />
          <label htmlFor="buy">
            <Translation translationKey="citypage_raio_label" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ZsGold;
