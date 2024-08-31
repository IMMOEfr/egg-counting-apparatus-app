import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter} from 'lucide-react'
import { Eggtray } from '@/features/egg-counting-apparatus/egg-counting-apparatus-slice'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from '@/components/ui/button'
// Eggtray data: 
//   id: number
//   layer: string
//   eggSize: string
//   eggCount: number
//   time: string
//   date: string
// 

//Dummy Data, true data will be fetched from Firebase api
const historyItems: Eggtray[] = [
  {
    id: 1,
    layer: "Layer House 1",
    eggSize: "S",
    eggCount: 30,
    time: "13:35",
    date: "08/31/2024"
  },
  {
    id: 2,
    layer: "Layer House 1",
    eggSize: "M",
    eggCount: 30,
    time: "13:36",
    date: "08/31/2024"
  },
  {
    id: 3,
    layer: "Layer House 1",
    eggSize: "L",
    eggCount: 28,
    time: "13:37",
    date: "08/31/2024"
},
{
    id: 4,
    layer: "Layer House 2",
    eggSize: "M",
    eggCount: 32,
    time: "13:38",
    date: "08/31/2024"
},
{
    id: 5,
    layer: "Layer House 2",
    eggSize: "S",
    eggCount: 29,
    time: "13:39",
    date: "08/31/2024"
},
{
    id: 6,
    layer: "Layer House 3",
    eggSize: "M",
    eggCount: 33,
    time: "13:40",
    date: "08/31/2024"
},
{
    id: 7,
    layer: "Layer House 3",
    eggSize: "L",
    eggCount: 27,
    time: "13:41",
    date: "08/31/2024"
},
{
    id: 8,
    layer: "Layer House 4",
    eggSize: "S",
    eggCount: 31,
    time: "13:42",
    date: "08/31/2024"
},
{
    id: 9,
    layer: "Layer House 4",
    eggSize: "M",
    eggCount: 30,
    time: "13:43",
    date: "08/31/2024"
},
{
    id: 10,
    layer: "Layer House 5",
    eggSize: "L",
    eggCount: 29,
    time: "13:44",
    date: "08/31/2024"
},
{
    id: 11,
    layer: "Layer House 5",
    eggSize: "M",
    eggCount: 28,
    time: "13:45",
    date: "08/31/2024"
},
{
    id: 12,
    layer: "Layer House 6",
    eggSize: "S",
    eggCount: 30,
    time: "13:46",
    date: "08/31/2024"
},
{
    id: 13,
    layer: "Layer House 6",
    eggSize: "M",
    eggCount: 31,
    time: "13:47",
    date: "08/31/2024"
},
{
    id: 14,
    layer: "Layer House 7",
    eggSize: "L",
    eggCount: 32,
    time: "13:48",
    date: "08/31/2024"
},
{
    id: 15,
    layer: "Layer House 7",
    eggSize: "S",
    eggCount: 28,
    time: "13:49",
    date: "08/31/2024"
},
{
    id: 16,
    layer: "Layer House 8",
    eggSize: "M",
    eggCount: 33,
    time: "13:50",
    date: "08/31/2024"
},
{
    id: 17,
    layer: "Layer House 8",
    eggSize: "L",
    eggCount: 30,
    time: "13:51",
    date: "08/31/2024"
},
{
    id: 18,
    layer: "Layer House 9",
    eggSize: "M",
    eggCount: 29,
    time: "13:52",
    date: "08/31/2024"
},
{
    id: 19,
    layer: "Layer House 9",
    eggSize: "S",
    eggCount: 32,
    time: "13:53",
    date: "08/31/2024"
},
{
    id: 20,
    layer: "Layer House 10",
    eggSize: "L",
    eggCount: 31,
    time: "13:54",
    date: "08/31/2024"
},
{
    id: 21,
    layer: "Layer House 10",
    eggSize: "M",
    eggCount: 28,
    time: "13:55",
    date: "08/31/2024"
},
{
    id: 22,
    layer: "Layer House 11",
    eggSize: "S",
    eggCount: 30,
    time: "13:56",
    date: "08/31/2024"
}

  // Add more items here for testing
]

interface HistoryProps {
  historyItem: Eggtray
}

const HistoryCard = ({ historyItem }: HistoryProps) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow mb-4"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold">Tray ID #{historyItem.id}</h2>
      <h1 className="text-m font-semibold mb-2">{historyItem.layer}</h1>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p><span className="font-medium">Egg Size:</span> {historyItem.eggSize}</p>
        <p><span className="font-medium">Egg Count:</span> {historyItem.eggCount}</p>
        <p><span className="font-medium">Date:</span> {historyItem.date}</p>
        <p><span className="font-medium">Time:</span> {historyItem.time}</p>
      </div>
    </motion.div>
  )
}

export const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const eggSizes = ['S', 'M', 'L', 'XL', 'Jumbo']

  const sortedAndFilteredItems = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase().trim()
    return historyItems
      .sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateB.getTime() - dateA.getTime();
      })
      .filter(item =>
        (selectedSizes.length === 0 || selectedSizes.includes(item.eggSize)) &&
        Object.values(item).some(value => 
          value.toString().toLowerCase().includes(lowercasedSearchTerm)
        )
      );
  }, [searchTerm, selectedSizes]);

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }
  return (
    <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Trays History
      </motion.h1>
      <div className="mb-6 flex gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by any field..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search trays"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Egg Sizes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {eggSizes.map((size) => (
              <DropdownMenuCheckboxItem
                key={size}
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => handleSizeToggle(size)}
              >
                {size}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-grow overflow-y-auto pr-4" role="list" aria-label="Tray history">
        <AnimatePresence>
          {sortedAndFilteredItems.map((historyItem) => (
            <HistoryCard key={historyItem.id} historyItem={historyItem} />
          ))}
        </AnimatePresence>
        {sortedAndFilteredItems.length === 0 && (
          <motion.p
            className="text-center text-gray-500 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            No results found. Try adjusting your search or filters.
          </motion.p>
        )}
      </div>
    </div>
  )
}