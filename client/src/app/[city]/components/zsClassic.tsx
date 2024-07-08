import { MoneyValue } from "@/app/components/MoneyValue"
import Translation from "@/app/components/translation"
import { useCurrency } from "@/app/contexts/CurrencyContext";


const ZsClassic = () => {
    const { currency } = useCurrency();

    
  const PAYMENT_METHODS = [
    { duration: "12 months", price: 23 },
    { duration: "6 months", price: 25 },
    { duration: "1 month", price: 36 },
  ];
  return (
    <div className="flex flex-col gap-4 border-2 rounded-md border-secondary p-2 text-xl">
          <div className="flex text-text font-bold">
            <h1>ZS Classic</h1>
          </div>
          <p className="text-primary font-bold">
            <Translation translationKey="citypage_zg_classic_title" />
          </p>
          <p className="font-semibold">
            <Translation translationKey="citypage_zg_classic_description" />
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
          <div className="flex flex-col gap-4 px-4">
            <p className="font-light text-sm text-end pr-16">Per month</p>
            {PAYMENT_METHODS.map((pm, index) => (
              <div key={index} className="flex justify-between">
                <h1>{pm.duration}</h1>
                <h1 className="text-primary">
                  <MoneyValue
                    value={260}
                    fromCurrency="USD"
                    toCurrency={currency}
                    decimals={0}
                  />
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
            ))}
          </div>
        </div>
  )
}

export default ZsClassic