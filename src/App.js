import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import 'ui-neumorphism/dist/index.css';
/* UI library component imports */
import { overrideThemeVariables } from 'ui-neumorphism';
import { 
  Button,
  Card,
  CardContent,
  Divider,
  ListItemGroup,
  ListItem,
  TextField,
  H3,
  H4,
  H5,
  H6,
  Body1,
  Alert
  } from 'ui-neumorphism';

function App() {

  /* input state variables */
  const [appState, setAppState] = useState({
    loading: false,
	  tokenHolders: null
   });
  const [input, setInput] = useState("");
  const [limitHolders, setLimitHolders] = useState(10);
  const [apiKey, setApiKey] = useState("EK-nYME2-u6tTYfo-L5LES");
  const [darkMode, setDarkMode] = useState(false);
  const [inputTokenInfo, setInputTokenInfo] = useState(null);
  /* Error state variables */
  const [addressInputError,setAddressInputError] = useState();
  const [limitInputError,setLimitInputError] = useState(false);
  const [networkErrorOccured, setNetworkErrorOccured] = useState(false);
  const [networkError, setNetworkError] = useState(null);

  useEffect( () => {
      /* checks if input fields contain errors 
      and exit out if they do to prevent failed api request*/
      if (addressInputError === undefined || addressInputError || limitInputError ) return ;
      
      setAppState({ loading:true});

      async function getTokenHoldersAndInfo(){
        const tokenholdersApiUrl = 
          `https://api.ethplorer.io/getTopTokenHolders/${input}?apiKey=${apiKey}&limit=${limitHolders}`;
        const tokenAddressApiUrl = 
          `https://api.ethplorer.io/getAddressInfo/${input}?apiKey=${apiKey}`;
          
        axios.all([
          axios.get(tokenholdersApiUrl),
          axios.get(tokenAddressApiUrl)])
            .then(axios.spread(
              (holdersResponse, tokenAddressResponse) => {
                setAppState({ loading: false, 
                              tokenHolders: holdersResponse.data.holders
                });
                /* saving only the tokenInfo in state, as rest is not relevant */
                setInputTokenInfo(tokenAddressResponse.data.tokenInfo);
                }))
            .catch((error)=> {
              handleNetworkError(error);
            });
      }
      /** solution to call async function inside useEffect **/
      getTokenHoldersAndInfo();

      /** cleanup function **/
		  return () => { setAppState({ loading:false});  };

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
      else {
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
	  if (parseInt(newLimitHolders) > 0 
        && parseInt(newLimitHolders) <= 1000){
          setLimitInputError(false);
          setLimitHolders(newLimitHolders);
	  }
	  else {
		  setLimitInputError(true);
	    }
    }

  function handleNetworkError(error){
    setNetworkErrorOccured(true);
    setNetworkError(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }

  /** INPUT Components **/
  
  function AddressInputComponent(props){
	  return(
	    <>
	      <h2> ERC20 Token Address </h2>
        <TextField 
          rounded
          width={500} 
          type="text" 
          onChange={handleTokenAddressChange} />
        <p> { appState.tokenHolders? 
              "" 
              : "Ex.: 0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30" } 
        </p>
		  </>
	  );
  }
  
  function ApiKeyInputComponent(props){
	  return(
	    <>
        <h2>API-Key</h2>
        <TextField 
          rounded
          type="text" 
          placeholder={apiKey} 
          onChange={handleApiKeyChange} />
        <p> { appState.tokenHolders? 
              "" 
              : "Ex.: EK-nYME2-u6tTYfo-L5LES" } 
        </p>
		  </>
	  );
  }
  
  function LimitHolderInputComponent(props){
	  return (
		<>
		  <h2> # of Top Holders </h2>
		  <TextField 
        rounded
        width={100} 
        type="text" 
        placeholder="10" 
        onChange={handleLimitHoldersChange} />
          <p> { appState.tokenHolders? 
                  "" 
                  : "1-1000" } 
          </p>
		</>
	  );
  }
  
  
  /** OUTPUT Components **/

  function ErrorComponent(props){
    /** renders possible input errors to the user */
    
    return(
      <>
        {props.addressError?
          <Alert 
            dark={darkMode?true:false}
            type="error">
              Input Error : invalid Token Address input
          </Alert>
          : ""
        }

        {props.limitError?
          <Alert 
            dark={darkMode?true:false}
            type="error">
              Input Error : only integers between 1-1000 allowed for # of Top Holders
          </Alert>
          : ""
        }

        {props.networkErrorHappened?
          <Alert 
            dark={ darkMode? true : false }
            type="error">
              Network Error occured, Check Console { (props.networkErrorObject == null)? "" : props.networkErrorObject.message }
          </Alert>
          : ""
        }

      </>
    );
  }
  
  function TokenInfoComponent(props){
	  /** shows info about the token from address input **/
   
	  /**  tokenInfo only gets accessible after first API call
     * so we do a little bit of conditional rendering here **/
     if (!props.tokenInfo) return "";
	  return(
	    <>
        {props.tokenInfo?
          <CardContent
            dark={darkMode}>
              <H6> {`${props.tokenInfo.name} (${props.tokenInfo.symbol})`} </H6>
              <H6> Price: {props.tokenInfo.price.rate? 
                            props.tokenInfo.price.rate.toFixed(2)
                            :  "unknown price"} $ 
              </H6>
              <Body1>
                Owner: {props.tokenInfo.owner}
              </Body1>
              <Body1>  
                Holders: {props.tokenInfo.holdersCount}
              </Body1>
            
          </CardContent>
          : ""
          }
		  </>
		);
	  
  }

  function OtherTokenListComponent(props){
    /* Holds List of the other tokens held by parent address */
    return(
      <>
        {props.otherTokens.map((otherToken, index) => {
          return(
            <ListItem
              key={index}
              dark={darkMode}
              active
              raised
              rounded
              className="OtherTokenListItem-class"> 

                <OtherTokenComponent
                  address={otherToken.tokenInfo.address}
                  name={otherToken.tokenInfo.name}
                  index={index}
                  symbol={otherToken.tokenInfo.symbol}
                  balance={otherToken.balance}
                  decimals={otherToken.tokenInfo.decimals > 0? otherToken.tokenInfo.decimals : 1}
                  price={otherToken.tokenInfo.price.rate}/>

            </ListItem>
          );
        })}
      </>
    );
  }
  
  function OtherTokenComponent(props){
	  /** gives info about the other token that parent hodler has **/
    
    const otherTokenBalance = (props.balance / 10 ** props.decimals).toFixed(5);
    return (
      <> 
        <H6 dark={darkMode}>
          <a 
            href={`https://etherscan.io/token/${props.address}`} 
            target="_blank">
              {`${props.name} (${props.symbol})`}
          </a>
        </H6>
        <H6 
          dark={darkMode}> 
            Tokens: {otherTokenBalance} 
        </H6>
        <H6 
          dark={darkMode}> 
            {props.price?
              `Value: ${(props.price * otherTokenBalance).toFixed(2)} $` 
              : `price rate unknown`} 
        </H6>
      </>
    );
  }
  
  function HoldersOtherHoldingsComponent(props){
	  /** Shows other Tokens of parent holder 
     *  address once UI Button is pressed **/

    /* tokens are sorted based on value in descending order
        calculated by custom comparison function  */
   
    const sortedOtherTokens = props.tokens.sort(
        (a,b) => {
          if(a.tokenInfo.price && b.tokenInfo.price){
            return ( 
              ( (b.balance / 10 ** b.tokenInfo.decimals ) 
              * b.tokenInfo.price.rate 
              - (a.balance / 10 ** a.tokenInfo.decimals ) 
              * a.tokenInfo.price.rate) 
              );
          }
          else if(a.tokenInfo.price && !b.tokenInfo.price){
            return -1;
          }
          else if(!a.tokenInfo.price && b.tokenInfo.price){
            return 1;
          }
          else {
            return 0;
          }
        }
    );

	  return(
	    <>
        <H6 dark={darkMode}>{props.tokens.length > 1 ?
            `${props.tokens.length} other Tokens held by this address`
            : `${props.tokens.length} other Token held by this address`
            }  
        </H6>
        <OtherTokenListComponent
          otherTokens={props.tokens}/>
      </>
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
			  const addressInfoApiUrl = 
          `https://api.ethplorer.io/getAddressInfo/${props.address}?apiKey=${props.apiKey}`;
		      await axios.get(addressInfoApiUrl)
		        .then((addressInfoResponse) => {
			        if (isMounted) setTokenHoldersOtherHoldings(addressInfoResponse.data);
              })
            .catch((error)=> {
              handleNetworkError(error);
            });
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

		const holdersBalance = (props.balance/ 10 ** props.decimals).toFixed(2);
    const holdersValue = (props.price * holdersBalance).toFixed(2);

	  /**  tokenHoldersOtherHoldings only gets accessible after first apicall  **/
    /** and holders other tokens only after pressing the listitems button **/  
	  return(
      <>
        <H5 dark={darkMode}> #{props.index + 1} </H5>
        <H5 dark={darkMode}> Share: {props.share} % </H5>
        <H5 dark={darkMode}> 
          Tokens: {holdersBalance}
        </H5>
        <H5 dark={darkMode}> Value: {holdersValue} $ </H5>
        <H5 dark={darkMode}> 
          Address: <a 
                    href={`https://etherscan.io/address/${props.address}`} 
                    target="_blank">
                      {props.address}
                  </a> 
        </H5>
        

        <Button 
          className="showOtherTokensButton"
          color={showOtherTokensButtonPressed? 'var(--black)' : 'var(--white)'}
          bgColor={showOtherTokensButtonPressed? 'var(--primary-red)' : 'var(--primary)'}
          dark={darkMode}
          rounded
          onClick={handleShowOtherTokensButtonPressed}> 
            {!showOtherTokens? "Show Holders other tokens" : "Hide Holders other tokens" } 
        </Button>
          {tokenHoldersOtherHoldings && showOtherTokens?
            <Card
              flat
              width={400}
              dark={darkMode}
              className="HoldersOtherHoldingsComponent-container"
              >
                <HoldersOtherHoldingsComponent  
                tokens={tokenHoldersOtherHoldings.tokens} />   
            </Card>
            : ""
            }
		    </>
		  );
  }
  
  function HolderListComponent(props){
	  /** Lists the top (# of) Holders of input token address  **/
    

    if (props.holders == null|| props.tokenInfo == null) return "";
    return (
      <>
        <H5 
          className='list-head'
          dark={darkMode}>
            Tokens Top {props.numHolders} Holders
        </H5>

        <ListItemGroup
          rounded
          dark={darkMode}
          raised>
                    
            {props.holders.map((holder, index) => {
              return(
                <ListItem
                  className="ListItem-class"
                  active
                  dark={darkMode}
                  key={index}
                  raised
                  rounded>
                    <HolderListItemComponent
                      index={index}
                      key={holder["address"] + index}
                      decimals={props.tokenInfo.decimals ? props.tokenInfo.decimals : "18 "} 
                      price={props.tokenInfo.price.rate ? props.tokenInfo.price.rate : "1 "} 
                      address={holder["address"]}
                      balance={holder["balance"]}
                      share={holder["share"]}
                      apiKey={props.apiKey}/>
                </ListItem>
                  );
                }
                )
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
	
  function darkModeToggle(event){
    setDarkMode(!darkMode);
  }

  return (
  
    <Card className="App"
	    dark={darkMode}>
      
      <Card 
        dark={darkMode} 
        rounded={true} 
        width={700} 
        className="UserInput-container">

          <h1>Tokenholders Other Holdings</h1>

          <Button
            onClick={darkModeToggle}
            rounded
            depressed
            color={darkMode?"var(--white)":"var(--primary)"}>
              {!darkMode?"dark-mode":"light-mode"}
          </Button>

          {AddressInputComponent()}

          
          

          <Card 
            dark={darkMode} 
            rounded
            flat
            width={500} 
            className="InputComponent-container">
              {ApiKeyInputComponent()}
          </Card>

          

          <Card 
            dark={darkMode} 
            rounded
            flat
            width={500} 
            className="InputComponent-container">
              {LimitHolderInputComponent()}
          </Card>

          
          <Card 
            dark={darkMode}
            width={200} 
            className="TokenInfoComponent-container">
              <TokenInfoComponent 
                tokenInfo={inputTokenInfo} />
          </Card>

          <Card 
            dark={darkMode}
            width={300} 
            className="ErrorComponent-container">
              <ErrorComponent 
                addressError={addressInputError} 
                limitError={limitInputError} 
                networkErrorHappened={networkErrorOccured}
                networkErrorObject={networkError}
                />
          </Card>

      </Card>

      <Card 
        dark={darkMode} 
        rounded
        width={700}
        className="HolderListComponent-container">
          <HolderListComponent 
            holders={appState.tokenHolders}
            numHolders={limitHolders}
            tokenInfo={inputTokenInfo}
            apiKey={apiKey}/>
      </Card>
      
      <footer>
          <Card 
            dark={darkMode} 
            className='footer'>
              <p>Built with 💚 by <a 
                                    href="https://github.com/SimRunBot"
                                    target="_blank">
                                      Simon
                                  </a>
              </p>
              <p>powered by <a 
                              href="https://Ethplorer.io" 
                              target="_blank">
                                Ethplorer.io
                            </a> 
              </p>
            </Card>
        </footer>
	  
    </Card>
  );
}

export default App;
