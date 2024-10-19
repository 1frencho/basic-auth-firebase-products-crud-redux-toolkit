import { IoHardwareChip } from "react-icons/io5";
import { Link } from "react-router-dom";

interface MyLogo {
  className?: string;
}
export const MyLogo = ({ className }: MyLogo) => {
  return (
    <Link to="/">
      <div className={`flex items-center gap-2 ${className}`}>
        <IoHardwareChip className="text-myPrimary" size={40} />
        <h2 className="text-xl font-bold">Frencho</h2>
      </div>
    </Link>
  );
};
