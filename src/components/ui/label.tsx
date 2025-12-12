export default function label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="block mb-2 font-medium text-gray-700" {...props} />
  );
}
