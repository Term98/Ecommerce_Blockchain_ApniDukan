import { useEffect, useState } from 'react'
import { BiTransfer } from 'react-icons/bi'
import { MdOpenInNew } from 'react-icons/md'
import { useGlobalState, truncate } from '../store'

const Transactions = () => {
  const [transactions] = useGlobalState('transactions')
  const [end, setEnd] = useState(3)
  const [count] = useState(3)
  const [collection, setCollection] = useState([])

  const getCollection = () => {
    return transactions.slice(0, end)
  }

  useEffect(() => {
    setCollection(getCollection())
  }, [transactions, end])

  return (
    <div className="bg-[#151c25]">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase ">
          {collection.length > 0 ? 'Latest Transactions' : 'No Transaction Yet'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-2 py-2.5">
          {collection.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center border border-pink-500 text-gray-400 w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3"
            >
              <div className="rounded-md shadow-sm shadow-pink-500 p-2">
                <BiTransfer />
              </div>

              <div>
                <h4 className="text-sm">{tx.title} Transfered</h4>
                <small className="flex flex-row justify-start items-center">
                  <span className="mr-1">Received by</span>
                  <a href="#" className="text-pink-500 mr-2">
                    {truncate(tx.owner, 4, 4, 11)}
                  </a>
                  <a href="#">
                    <MdOpenInNew />
                  </a>
                </small>
              </div>

              <p className="text-sm font-medium">{tx.cost}ETH</p>
            </div>
          ))}
        </div>

        {collection.length > 0 && transactions.length > collection.length ? (
          <div className="text-center my-5">
           <button class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-pink-800 group"
               onClick={() => setEnd(end + count)}>
<span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-pink-500 group-hover:h-full"></span>
<span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white"> Load More</span>
</button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Transactions
