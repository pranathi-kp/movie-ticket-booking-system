interface FormFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isTextArea?: boolean;
  }
  
  export const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange, isTextArea = false }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {isTextArea ? (
          <textarea
            value={value}
            onChange={onChange}
            className="mt-1 p-3 border rounded w-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          ></textarea>
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            className="mt-1 p-3 border rounded w-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </div>
    );
  };
  