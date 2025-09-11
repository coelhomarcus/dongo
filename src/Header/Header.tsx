import { IoSettings, IoSunny, IoMoon } from "react-icons/io5";
import { IoPaw } from "react-icons/io5";
import { useTheme } from "../hooks";

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="bg-card h-[50px] border-b border-border">
            <div className="flex justify-between items-center h-full px-5">
                <IoPaw className="w-5 h-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">dongo</p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                        title={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
                    >
                        {theme === "light" ? <IoMoon /> : <IoSunny />}
                    </button>
                    <IoSettings className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                </div>
            </div>
        </div>
    );
};

export default Header;
