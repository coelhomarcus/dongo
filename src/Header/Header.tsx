import { IoSettings } from "react-icons/io5";

const Header = ({ displayUrl }: { displayUrl: string }) => {
    return (
        <div className="bg-[#141414] h-[50px] border-b border-[#303030]">
            <div className="flex justify-between items-center h-full px-4">
                <img
                    src="https://i.pinimg.com/736x/b3/c6/c1/b3c6c1bc6c7f68aef1af1435b523e9cd.jpg"
                    alt="Logo"
                    className="w-8 h-8 ml-4 rounded"
                />
                <p className="text-sm">{displayUrl ? displayUrl : "Dongo"}</p>
                <div>
                    <IoSettings className="w-5 h-5 text-[#5D5D5D] cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
};

export default Header;
