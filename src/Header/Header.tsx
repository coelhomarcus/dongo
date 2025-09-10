import { IoSettings } from "react-icons/io5";
import { IoPaw } from "react-icons/io5";

const Header = () => {
    return (
        <div className="bg-[#141414] h-[50px] border-b border-[#303030]">
            <div className="flex justify-between items-center h-full px-5">
                <IoPaw className="w-5 h-5 text-[#5D5D5D]" />
                <p className="text-sm text-[#5D5D5D]">dongo</p>
                <div>
                    <IoSettings className="w-5 h-5 text-[#5D5D5D] cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
};

export default Header;
