import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, ArrowUp, Delete, ArrowLeft } from 'lucide-react'

const letterKeys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const symbolKeys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['@', '#', '$', '%', '&', '*', '-', '+', '(', ')'],
    ['!', '"', '\'', ':', ';', '/', '?', ',', '.', '_']
];

export const ScreenKeyboard = () => {
    const [text, setText] = useState('')
    const [isUpperCase, setIsUpperCase] = useState(false)
    const [isSymbols, setIsSymbols] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)

    const handleKeyPress = (key: string) => {
        setText(prev => prev + (isUpperCase ? key.toUpperCase() : key))
    }

    const handleBackspace = () => {
        setText(prev => prev.slice(0, -1))
    }

    const handleSpace = () => {
        setText(prev => prev + ' ')
    }

    const toggleCase = () => {
        setIsUpperCase(prev => !prev)
    }

    const toggleSymbols = () => {
        setIsSymbols(prev => !prev)
    }

    const toggleMinimize = () => {
        setIsMinimized(prev => !prev)
    }

    const keys = isSymbols ? symbolKeys : letterKeys

    return (
        <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg absolute bottom-0">
            <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full mb-4 p-2 text-lg"
                placeholder="Start typing..."
            />
            <AnimatePresence>
                {!isMinimized && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-200 p-2 rounded-lg overflow-hidden"
                    >
                        {keys.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center mb-2">
                                {row.map(key => (
                                    <motion.div key={key} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            onClick={() => handleKeyPress(key)}
                                            className="w-8 h-10 m-1 text-sm font-medium bg-white text-black hover:bg-gray-100"
                                        >
                                            {isUpperCase ? key.toUpperCase() : key}
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                        <div className="flex justify-center">
                            <motion.div whileTap={{ scale: 0.95 }}>
                                <Button
                                    onClick={toggleCase}
                                    className="w-10 h-10 m-1 text-sm font-medium bg-white text-black hover:bg-gray-100"
                                >
                                    <ArrowUp size={20} />
                                </Button>
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.95 }}>
                                <Button
                                    onClick={toggleSymbols}
                                    className="w-16 h-10 m-1 text-sm font-medium bg-white text-black hover:bg-gray-100"
                                >
                                    {isSymbols ? 'ABC' : '?123'}
                                </Button>
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.95 }}>
                                <Button
                                    onClick={handleSpace}
                                    className="w-32 h-10 m-1 text-sm font-medium bg-white text-black hover:bg-gray-100"
                                >
                                    Space
                                </Button>
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.95 }}>
                                <Button
                                    onClick={handleBackspace}
                                    className="w-10 h-10 m-1 text-sm font-medium bg-white text-black hover:bg-gray-100"
                                >
                                    <Delete size={20} />
                                </Button>
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.95 }}>
                                <Button
                                    onClick={() => setText(prev => prev + '\n')}
                                    className="w-16 h-10 m-1 text-sm font-medium bg-white text-black hover:bg-gray-100"
                                >
                                    <ArrowLeft size={20} />
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                whileTap={{ scale: 0.95 }}
                className="mt-2 flex justify-center"
            >
                <Button
                    onClick={toggleMinimize}
                    className="w-full h-10 text-sm font-medium bg-gray-300 text-black hover:bg-gray-400"
                >
                    {isMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </Button>
            </motion.div>
        </div>
    );
};
