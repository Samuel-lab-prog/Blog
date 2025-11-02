import Button from '../components/Button';

type DropdownProps = {
  links: { label: string; to: string }[];
  isOpen: boolean;
  toggle: () => void;
};

const menuClasses =
  'md:hidden fixed top-0 right-0 bg-gray-200 border-l-2 border-gray-300 shadow-lg px-5 pt-24 z-30 w-48 h-full flex flex-col gap-y-3 transition-transform duration-300 ease-in-out overflow-hidden';

export default function Dropdown({
  links,
  isOpen,
  toggle,
}: DropdownProps) {
  return (
    <menu
      className={`${menuClasses} ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between">
        <h2 className="text-gray-900">Menu</h2>
      </div>
      {links.map((link) => (
        <li key={link.to} onClick={toggle}>
          <Button
            to={link.to}
            variant="anchor"
            className="text-gray-900 hover:text-gray-700 text-xl w-full block"
          >
            {link.label}
          </Button>
        </li>
      ))}
    </menu>
  );
}
