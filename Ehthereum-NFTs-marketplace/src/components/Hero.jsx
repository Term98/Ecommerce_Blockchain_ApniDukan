import Identicon from 'react-identicons'
import { setGlobalState, useGlobalState, truncate } from '../store'
import "./Hero.css"
const Hero = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const onCreatedNFT = () => {
    setGlobalState('modal', 'scale-100')
  }

  return (
    // <div
    //   className="flex flex-col md:flex-row w-4/5 justify-between 
    //   items-center mx-auto p-10 bg-pink-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100

    //   "
    // >
    <div className="container">
    <div className='bg'>
      <div className="md:w-3/6 w-full">
        <div className='bg-text'>
          {/* <h1 className="text-white text-5xl font-bold"> */}
          <h1>
          Mint,buy and own <br /> Ethereum NFTs <br />
           
          </h1>
          <p className="text-gray-500 font-semibold text-sm mt-3">
           
          </p>
        </div>

        <div className="flex flex-row mt-5">
     
          <button
            class="px-10 py-4 relative rounded group font-medium text-white font-medium inline-block shadow-xl shadow-black"
            onClick={onCreatedNFT}
          ><span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500 "></span>
          <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
          <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
          <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
          <span class="relative text-2xl ">Create NFT</span>
          
          </button>
        </div>

        
      </div>

      <div
        className="shadow-xl shadow-black md:w-2/5 w-full 
      mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800 " 
      >
        <img
          src="https://thumbor.forbes.com/thumbor/711x425/https://specials-images.forbesimg.com/imageserve/613df842ca2a4b60e210d8e4/Avatar-project-metaverse/960x0.jpg?fit=scale"
          alt="NFT Art"
          className="h-60 w-full object-cover"
        />
        <div className="flex justify-start items-center p-3">
          <Identicon
            string={connectedAccount ? connectedAccount : 'Connect Your Wallet'}
            size={50}
            className="h-10 w-10 object-contain rounded-full mr-3"
          />
          <div>
            <p className="text-white font-semibold">
              {connectedAccount
                ? truncate(connectedAccount, 4, 4, 11)
                : 'Connect Your Wallet'}
            </p>
            <small className="text-pink-800 font-bold">@you</small>
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default Hero
