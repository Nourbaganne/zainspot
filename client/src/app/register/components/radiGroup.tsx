import Translation from "@/app/components/translation";

interface RadioOption {
    value: string;
    labelKey: string;
}

interface RadioGroupProps {
    labelKey: string;
    name: string;
    options: RadioOption[];
    value: string;
    onChange: (name: string, value: string) => void; // Update to receive name and value
    error?: string;
    touched?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    labelKey,
    options,
    value,
    onChange,
    error,
    touched,
    name
}) => {
    const hasError = touched && error;

    return (
        <div className="flex flex-col gap-2">
            <div className={`relative flex flex-col border rounded-md pl-4 pr-14 py-3 
                ${value && 'border-primary'}
                ${hasError ? 'border-alert' : 'border-button'}`}>
                <label className="absolute px-1 bottom-[40px] left-2 text-primary text-xs bg-white">
                    <Translation translationKey={labelKey} />
                </label>
                <div className="flex gap-3 pt-1">
                    {options.map((option) => (
                        <label key={option.value} className="flex items-center gap-2 text-span font-light">
                            <input
                                type="radio"
                                name={name}
                                value={option.value}
                                checked={value === option.value}
                                onChange={() => onChange(name, option.value)} 
                                className={`w-3 h-3 accent-primary ${hasError ? 'border-alert' : ''}`}
                            />
                            <Translation translationKey={option.labelKey} />
                        </label>
                    ))}
                </div>
            </div>
            {hasError && <span className="pl-4 text-alert">{error}</span>}
        </div>
    );
};
