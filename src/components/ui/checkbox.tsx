function Checkbox({ checked, onChange, disabled = false, className = "" }) {
  function toggle() {
    if (disabled) return;
    onChange(!checked);
  }

  function handleKeyDown(e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={`
        w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer
        ${checked ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
        ${className}
      `}
    >
      {checked && (
        <span className="text-white font-bold text-sm">✓</span>
      )}
    </div>
  );
}

export { Checkbox };
