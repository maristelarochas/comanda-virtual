export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full border border-gray-300 rounded-md pt-2 pb-2 pl-2 mb-4"
      {...props}
    />
  );
}
