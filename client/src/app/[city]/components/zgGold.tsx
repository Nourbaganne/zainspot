import { MoneyValue } from "@/app/components/MoneyValue";
import Translation from "@/app/components/translation";
import { useCurrency } from "@/app/contexts/CurrencyContext";


interface ZsGoldProps {
  goldPrice: {
    value: number;
    tax: number;
  };
  setSelectedPayment: (value: Object | null) => void;

}

const ZsGold = ({ goldPrice, setSelectedPayment }: ZsGoldProps) => {
  const { currency } = useCurrency();


  return (
    <div className="flex flex-col gap-4 border-2 font-sans rounded-md border-secondary  px-2 py-4">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1
            className="font-sans font-semibold text-semibold-24 md:text-semibold-36">
            ZS Gold
          </h1>
          <h1
            className="font-sans font-extrabold text-[18px] md:text-bold-italic-22 italic  text-alert uppercase"
            style={{ letterSpacing: '-0.01em' }}
          >
            <Translation translationKey="citypage_zg_gold_alert" />
          </h1>

        </div>
        <p className="font-sans font-extrabold leading-normal md:leading-[26.1px] uppercase text-primary">
          <Translation translationKey="citypage_zg_gold_title" />
        </p>
      </div>

      <p className="font-sans font-semibold text-semibold-15 md:text-lg leading-[27px] tracking-wide"
        style={{ wordSpacing: '0.2em', textAlign: 'justify' }}>
        <Translation translationKey="citypage_zg_gold_description" />
      </p>

      <h1 className="text-center font-bold text-bold-16 md:text-xl">
        <Translation translationKey="citypage_cards_subtitle" />
      </h1>

      <div className="flex justify-between font-semibold text-semibold-14 md:text-semibold-18">
        <h1 className="flex  gap-5 md:gap-20 items-center">
          <Translation translationKey="citypage_single_payment" />
          <span className="text-primary text-lg">
            <MoneyValue
              value={goldPrice?.value}
              fromCurrency="USD"
              toCurrency={currency}
              decimals={0}
            />
          </span>
        </h1>
        <div className="flex items-center gap-4">
          <input
            type="radio"
            onChange={() => setSelectedPayment(goldPrice)}
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
