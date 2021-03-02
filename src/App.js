import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
/*import './App.css';*/
import 'ui-neumorphism/dist/index.css';
import { overrideThemeVariables } from 'ui-neumorphism';
import { 
Button,
Card,
CardContent,
Divider,
ListItemGroup,
ListItem,
TextField,
} from 'ui-neumorphism';

function App() {
  
  const [appState, setAppState] = useState({
    loading: false,
	tokenHolders: null
  });
  const [input, setInput] = useState("");
  const [limitHolders, setLimitHolders] = useState(10);
  const [apiKey, setApiKey] = useState("EK-nYME2-u6tTYfo-L5LES");
  const [darkMode, SetDarkMode] = useState(false);
  const [addressInputError,setAddressInputError] = useState(true);
  const [limitInputError,setLimitInputError] = useState(false);
  
  useEffect( () => {
	  /* checks if input fields contain errors 
	   and exit out if they do to prevent failed api request*/
	  if (addressInputError || limitInputError) return ;
	  
	  setAppState({ loading:true});

	  async function getTokenHolders(){
		  const tokenholdersApiUrl = `https://api.ethplorer.io/getTopTokenHolders/${input}?apiKey=${apiKey}&limit=${limitHolders}`;
	      axios.get(tokenholdersApiUrl)
	        .then((holdersResponse) => {
			  setAppState({ loading: false, 
			                tokenHolders: holdersResponse.data.holders});
	           });
		}
	  /** solution to call async function inside useEffect **/
	  getTokenHolders();
    }, 
	/** useEffect dependencies to only call useEffect when these change **/ 
	[input, apiKey, limitHolders]);
  
  
  /** Handler Functions for Input changes and simple input validation **/
  
  function handleTokenAddressChange(changedInput) {
	  const newInput = changedInput.event.target.value;
	  /** all ethereum token addresses are 42 characters long **/
	  if (newInput.length == 42){
		  setAddressInputError(false);
		  setInput(newInput);
	  }
      else{
		  console.log("Address Input Error: invalid address input");
		  setAddressInputError(true);
	  }
    }
  
  function handleApiKeyChange(changedApiKey) {
	  const newApiKey = changedApiKey.event.target.value;
      setApiKey(newApiKey);
    }
	
  function handleLimitHoldersChange(changedLimitHolders) {
	  const newLimitHolders = changedLimitHolders.event.target.value;
	  /** parseInt converts floats to ints and returns NaN when input is string **/
	  if(parseInt(newLimitHolders) > 0 && parseInt(newLimitHolders) <= 1000){
		  setLimitInputError(false);
		  setLimitHolders(newLimitHolders);
	  }
	  else{
		  setLimitInputError(true);
		  console.log("limit input error: only integers allowed");
	  }
    }


  /** INPUT Components **/
  
  function AddressInputComponent(props){
	  return(
	    <div className="addressInput-container">
	      <h2>ERC20 Token Address</h2>
		  <TextField rounded={true} width={500} type="text" onChange={handleTokenAddressChange} />
		  <p>Ex.: 0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30</p>
		  
		</div>
	  );
  }
  
  function ApiKeyInputComponent(props){
	  return(
	    <div className="apiKeyInput-container">
		  <h2>apiKey</h2>
		  <TextField rounded={true} type="text" placeholder={apiKey} onChange={handleApiKeyChange} />
		  <p>Ex.: EK-nYME2-u6tTYfo-L5LES</p>
		</div>
	  );
  }
  
  function LimitHolderInputComponent(props){
	  return (
		<div className="limitHolderInput-container">
		  <h2>number of holders in result</h2>
		  <TextField rounded={true} width={100} type="text" placeholder="10" onChange={handleLimitHoldersChange} />
		  <p>1-1000</p>
		</div>
	  );
  }
  
  
  /** OUTPUT Components **/
  
  function TokenInfoComponent(props){
	  /** shows info about the token from address input **/
	  const [tokenInfo, setTokenInfo] = useState();
	  
	  useEffect( () => {
		  /** preventing memory leak with mounted variable condition inside API Promise handling **/
		  let isMounted = true;
		  if (!props.address === "" || !props.address || !props.apiKey){
			  return ;
		  }
		  
		  async function getTokenInfo(){
			  const tokenInfoApiUrl = `https://api.ethplorer.io/getTokenInfo/${props.address}?apiKey=${props.apiKey}`;
		      await axios.get(tokenInfoApiUrl)
		        .then((tokenInfoResponse) => {if (isMounted) setTokenInfo(tokenInfoResponse.data);
				});
		    }
		  
		  getTokenInfo();
		  
		  /** cleanup function **/
		  return () => { isMounted = false };
		} 
		  /** tried to render only on mount but gets updated everytime anyway, probably because of parent state change **/
	    ,[]);
		
	  /**  tokenInfo only gets accessible after first apicall 
	       so we do a little bit of conditional rendering here
	  **/
	  return(
	    
	    <div className="TokenInfo-container">
		  {tokenInfo?
		    <>
		      <p> {tokenInfo.name} </p>
		      <p> ${tokenInfo.symbol} </p>
			  <p> Price: {tokenInfo.price.rate? tokenInfo.price.rate.toFixed(2) : "Unknown Price"} $</p>
		      <p> Owner: {tokenInfo.owner} </p>
		      <p> Holders: {tokenInfo.holdersCount}</p>
		    </>
		    : ""
		  }
		</div>
		);
	  
  }
  
  function OtherTokenComponent(props){
	  /** gives info about the other token that parent hodler has **/
	return (
		<> 
			<p>{props.name}</p>
			<p><a href={`https://etherscan.io/token/${props.address}`} target="_blank">{props.symbol}</a></p>
			<p>{(props.balance / 10**18).toFixed(2)}</p>
		   <Divider />
		</>
	);
  }
  
  function HoldersOtherHoldingsComponent(props){
	  /** Holds other Tokens of parent holder once Button is pressed **/
	  
	  return(
	    <div className="otherTokens-container">
		  <p>{props.tokens.length > 1 ?
		      `${props.tokens.length} other Tokens on this Holders address`
			  : `${props.tokens.length} other Token on this Holders address`
		    }  
		  </p>
		  
	      {props.tokens.map((otherToken, index) => {
			return(
			  <div key={otherToken.tokenInfo.name + index} className={otherToken.tokenInfo.name}>
			    <OtherTokenComponent
				  address={otherToken.tokenInfo.address}
				  name={otherToken.tokenInfo.name}
				  symbol={otherToken.tokenInfo.symbol}
				  balance={otherToken.balance}
				  />
			  </div>
			 );
		    }
		   )
		  }
		</div>
	
	  );
  }
  
  
  function HolderListItemComponent(props){
	  /** is showing the holder of token from address input **/
	  const [showOtherTokens, setShowOtherTokens] = useState(false);
	  const [showOtherTokensButtonPressed, setShowOtherTokensButtonPressed] = useState(false);
	  const [tokenHoldersOtherHoldings, setTokenHoldersOtherHoldings] = useState();
	  
	  useEffect( () => {
		 
		  /** condition to avoid the warning of hook usage before component mounting **/
		  let isMounted = true;
		  /** prevent apicall if not intended **/
		  if(!showOtherTokens) return ;
		  /** prevent apicall of wrong address or apiKey input **/
		  if (!props.address === "" || !props.address || !props.apiKey){
			  return ;
		    }
		  
		  async function getTokens(){
			  const addressInfoApiUrl = `https://api.ethplorer.io/getAddressInfo/${props.address}?apiKey=${props.apiKey}`;
		      await axios.get(addressInfoApiUrl)
		           .then((addressInfoResponse) => {
			         if (isMounted) setTokenHoldersOtherHoldings(addressInfoResponse.data);});
		    }
		  
		  getTokens();
		  
			/** cleanup function **/
		  return () => { isMounted = false };
		 } 
		,[showOtherTokens]);
		
	  function handleShowOtherTokensButtonPressed(event){
		  setShowOtherTokens(!showOtherTokens);
		  setShowOtherTokensButtonPressed(!showOtherTokensButtonPressed);
	  }
		
	  /**  tokenHoldersOtherHoldings only gets accessible after first apicall  **/	  
	  return(
	      <>
			<p className="holderAddress"> Address: <a href={`https://etherscan.io/address/${props.address}`} target="_blank">{props.address}</a> </p>
		    <p className="holderBalance"> Balance: {(props.balance / 10**18).toFixed(2)}</p>
		    <p className="holderShare"> %Share: {props.share}</p>
			<Button 
			  color={showOtherTokensButtonPressed? 'var(--black)' : 'var(--white)'}
			  bgColor={showOtherTokensButtonPressed? 'var(--primary-red)' : 'var(--primary)'}
			  rounded={true} 
			  onClick={handleShowOtherTokensButtonPressed}> {!showOtherTokens? "Show Holders other tokens" : "Hide Holders other tokens" } </Button>
			    {tokenHoldersOtherHoldings && showOtherTokens?
			 <Card dark={darkMode} rounded={true} width={500} className="HoldersOtherHoldingsComponent-container">
			   <HoldersOtherHoldingsComponent  tokens={tokenHoldersOtherHoldings.tokens} /> 
			 </Card>  
			 : ""
			}
		  </>
		);
	  
	  
	  
  }
  
  function HolderListComponent(props){
	  /** Lists the Holders of token from address input with maximum displayed specified by limit input **/
	if (!props.holders) return "";
	
	return (
	<>
	  <h2 className='list-head'>Tokens Top Holders</h2>
	  <ListItemGroup
	    dark={darkMode}
		rounded={true}
		raised={true}
		>
                
		  {props.holders.map((holder, index) => {
			return(
			  <ListItem>
			  <HolderListItemComponent
				key={holder["address"] + index}
				address={holder["address"]}
				balance={holder["balance"]}
				share={holder["share"]}
				apiKey={props.apiKey}
				 />
			  </ListItem>
				 );})
			}
	  </ListItemGroup>
	</>
	);
  }

 
  function changeTheme(props){
	   /** This function can be used to override css values */
	  overrideThemeVariables({
      '--light-bg': '#E9B7B9'
    });
  }
	
  return (
  
    <Card className="App"
	  dark={darkMode}
	  
	  >
      
	  <Card 
	    dark={darkMode} 
		rounded={true} 
		className="userInput-container">
		
	      <h1>Tokenholders and their Other Holdings</h1>
		  
	    <Card 
		  dark={darkMode} 
		  rounded={true} 
		  width={700} 
		  elevation={3} 
		  className="d-flex align-center justify-center flex-wrap">
	  	    {AddressInputComponent()}
		</Card>
		
		<Card 
		  dark={darkMode} 
		  rounded={true} 
		  width={200} 
		  inset={true} 
		  className="d-flex align-center justify-center flex-wrap">
	  	    <TokenInfoComponent address={input} apiKey={apiKey} />
		</Card>
		
		<Card 
		  dark={darkMode} 
		  rounded={true} 
		  width={500} 
		  className="ApiKeyInputComponent-container">
	  	    {ApiKeyInputComponent()}
		</Card>
		
		<Card 
		  dark={darkMode} 
		  rounded={true} 
		  width={500} 
		  className="LimitHolderInputComponent-container">
	  	    {LimitHolderInputComponent()}
		</Card>
      </Card>
	  
	  <Card 
	    dark={darkMode} 
		rounded={true} 
		className="ListOfHolders-container">
		  <HolderListComponent holders={appState.tokenHolders} apiKey={apiKey}/>
	  </Card>
	 
	  
	  <footer>
        <Card 
		  dark={darkMode} 
		  className='footer'>
            <p>Built with 💚–▒│¢û by Simon</p>
		    <p>powered by <a href="https://Ethplorer.io" target="_blank">Ethplorer.io</a> </p>
        </Card>
      </footer>
	  
    </Card>
  );
}

export default App;
