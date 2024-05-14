import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi'
import './scss/app.scss';
import { Button, Image, Modal } from 'antd';
import { useState } from 'react';
import { Footer } from 'antd/es/layout/layout';


function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  console.log(connectors)
  const { disconnect } = useDisconnect()
  const [openWallet,setOpenWallet] = useState(false)
  const [openWallett,setOpenWallett] = useState(false)

  const handleConnect = (connector: any) => {
    connect({ connector }); // Đảm bảo truyền đối tượng với thuộc tính connector
  };

  return (
    <>
      <div className='header-app'>
        <img className='img-header' src={"https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5"} />

        <Button type='primary' onClick={()=>setOpenWallet(true)}>Kết nối với ví</Button>

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
        <Modal open={openWallet} title="Kết nối ví" onCancel={()=>setOpenWallet(false)} footer = {null}>
          <div style={{width:"100%"}}>
            <div
              key={connectors[3].uid}
              onClick={() => handleConnect(connectors[3])}
              style={{width:"200px"}}
              className='walletConnect'
            >   
                <img style={{ height: "30px" }} src='https://app.uniswap.org/static/media/walletconnect-icon.bd207ef6f3632304cd1b6e772271cb43.svg' />
                <span style={{ fontWeight: 700 }}>{connectors[3].name}</span>

            </div>
          </div>
        </Modal>
      )}
      
    </>
  )
}

export default App
