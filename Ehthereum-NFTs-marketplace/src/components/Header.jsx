import { connectWallet } from "../Blockchain.Services";
import { useGlobalState, truncate } from "../store";
const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <nav className="w-4/5 flex md:justify-center justify-between items-center py-10 mx-auto">
     

      {connectedAccount ? (
        <button
        class="relative inline-block px-5 py-3 font-medium group"
        onClick={connectWallet}
      >
        <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-white group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span class="absolute inset-0 w-full h-full bg-[#bd255f] "></span>
        <span class="relative text-white group-hover:text-white">
          {truncate(connectedAccount, 4, 4, 11)}
        </span>
       
      </button>
      
       
      ) : (
      <button
        class="relative inline-block px-5 py-3 font-medium group"
        onClick={connectWallet}
      >
        <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-white group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span class="absolute inset-0 w-full h-full bg-[#bd255f] "></span>
        <span class="relative text-white group-hover:text-white">
        Connect Wallet
        </span>
       
      </button>
      )}
    </nav>
  );
};

export default Header;
