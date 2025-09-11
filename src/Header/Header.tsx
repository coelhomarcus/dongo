import { IoSettings, IoSunny, IoMoon, IoRemove, IoSquareOutline, IoClose } from "react-icons/io5";
import { IoPaw } from "react-icons/io5";
import { useTheme, useWindow } from "../hooks";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { isMaximized, minimize, maximize, close } = useWindow();

    return (
        <div className="bg-card h-[50px] border-b border-border drag-region">
            <div className="flex justify-between items-center h-full px-5">
                <div className="flex items-center gap-3">
                    <IoPaw className="w-5 h-5 text-muted-foreground" />
                    <IoSettings className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors no-drag" />
                    <button
                        onClick={toggleTheme}
                        className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors no-drag"
                        title={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
                    >
                        {theme === "light" ? <IoMoon /> : <IoSunny />}
                    </button>
                </div>
                <p className="text-sm text-muted-foreground unselectable">dongo</p>
                <div className="flex items-center gap-2">
                    {/* Controles da janela */}
                    <div className="flex items-center gap-1 ml-2 no-drag">
                        <button
                            onClick={minimize}
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded"
                            title="Minimizar"
                        >
                            <IoRemove className="w-4 h-4" />
                        </button>
                        <button
                            onClick={maximize}
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded"
                            title={isMaximized ? "Restaurar" : "Maximizar"}
                        >
                            <IoSquareOutline className="w-3 h-3" />
                        </button>
                        <button
                            onClick={close}
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors rounded"
                            title="Fechar"
                        >
                            <IoClose className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
