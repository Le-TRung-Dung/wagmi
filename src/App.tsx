import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi'
import './scss/app.scss';
import { Avatar, Button, Drawer, Image, Modal } from 'antd';
import { useState } from 'react';
import { AiOutlineLogout } from "react-icons/ai";


function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  console.log(connectors)
  const { disconnect } = useDisconnect()
  const [openWallet, setOpenWallet] = useState(false)
  const [openDrawer, setopenDrawer] = useState(false)
  console.log(account)
  const handleConnect = (connector: any) => {
    connect({ connector }); // Đảm bảo truyền đối tượng với thuộc tính connector
  };

  const hex = account?.address?.substring(0, 6) + "..." + account?.address?.substring(account?.address?.length - 4);

  return (
    <>
      <div className='header-app'>
        <img className='img-header' src={"https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5"} />
        {account.status === "connected" || account.status === "reconnecting"
          ?
          <div
            style={{ fontWeight: 700, cursor: "pointer" }}
            className='address-header'
            onClick={() => setopenDrawer(true)}>
            <Avatar style={{ marginRight: "15px" }} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            {hex}
          </div> :
          (<Button type='primary' onClick={() => setOpenWallet(true)}>Kết nối với ví</Button>)
        }
        {/* <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button> */}

        {/* <div className = "text-white">
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div> */}

        {/* {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )} */}
      </div>
      {openWallet && (
        <Modal open={openWallet} title="Kết nối ví" onCancel={() => setOpenWallet(false)} footer={null}>
          <div 
            style={{ width: "100%" , marginTop:"30px"}} 
            className='wallet'
            onClick={() => {handleConnect(connectors[3]) ; setOpenWallet(false)}}
          >
            <div
              key={connectors[3].uid}
              style={{ width: "200px" }}
              className='walletConnect'
            >
              <img style={{ height: "30px", borderRadius:"10px" }} src='https://app.uniswap.org/static/media/walletconnect-icon.bd207ef6f3632304cd1b6e772271cb43.svg' />
              <span style={{ fontWeight: 700, marginLeft:"10px"}}>{connectors[3].name}</span>
            </div>
          </div>
        </Modal>
      )}
      <Drawer
        // title="Basic Drawer"
        // placement={placement}
        closable={false}
        onClose={() => setopenDrawer(false)}
        open={openDrawer}
      // key={placement}
      >
        <div className='drawer_header'>
          <div
            style={{ fontWeight: 700, cursor: "pointer" }}
            className='address-header'
            onClick={() => setopenDrawer(true)}>
            <Avatar style={{ marginRight: "15px" }} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            {hex}
          </div>
          <div onClick={()=>{disconnect() ; setopenDrawer(false)}}>
            <AiOutlineLogout size={30} />
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default App
