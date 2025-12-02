import styles from "./InputField.module.scss";


type Props = {
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
};


export default function InputField({ label, type = "text", value, onChange, placeholder }: Props) {
    return (
        <label className={styles.field}>
            <p>{label}</p>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    );
}