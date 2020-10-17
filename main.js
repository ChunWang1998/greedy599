
//AOS animate
 AOS.init();
//0507
// get ETH info

$(document).ready(function(){
    $.ajax({
        method:"GET",
        //url: "https://api.coinmarketcap.com/v1/ticker/ethereum/",        
      }).done(function(msg) {   
        console.log(msg);
        var ETH_price = (msg[0].price_usd);
        var updatedtime = (msg[0].last_updated);
        var unixTimestamp = new Date(parseInt(updatedtime)* 1000) ;      
        $("#update_time").text(unixTimestamp);          
        $("#total").text(toPercent(ETH_price)); 

        $('#ticket').on('keyup','.quantity',function(){          
          var quantity = $(this).val();
        $("#total").text(toPercent(ETH_price*quantity));
          })  
      });
  })  
    
 

// set point
function toPercent(point){
    var str=Number(point).toFixed(2);          
    return str;
  }

function toPercent_A(point){
    var str=Number(point).toFixed(5);          
    return str;
  } 

function toPercent_B(point){
    var str=Number(point).toFixed(4);          
    return str;
  }   

function toPercent_C(point){
    var str=Number(point).toFixed(7);          
    return str;
  }    

function toPercent_01(point){
    var str=Number(point*100).toFixed(2);
    str+="%";
    return str;
  }

function toPercent_02(point){
    var str=Number(point*100).toFixed(4);
    str+="%";
    return str;
  }  


if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
	  window.ethereum.enable();///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      console.log("Web3連接成功"); 
      $(".connect").css("background-color","#6ab76a");
      $("#connect").text("已連結");  
      $("#link_sucess").text("已連結");    
    } else {
      // Set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));           
      setTimeout(function(){
        $("#modalInvestForm").modal('show');
      },5000)
      $(".redundant").css("display","none");
      $(".no_duplication").css("visibility ","visible");
    }

    var myContract;
    var coinbase;
    var block_height;
    var contract_address;
    var interest;
    var balance;

    async function printPostsToConsole() {

      coinbase = await web3.eth.getCoinbase();      
      balance = await web3.eth.getBalance(coinbase);      

      $("#my_address").text(coinbase);
      $("#investor_address").text(coinbase);

      var hidden_str = (coinbase.substring(6,38));
      var replace_part = coinbase.replace(hidden_str,"...");            
      $("#show_address").text(replace_part);

      $("#redundant_user").text(coinbase);
      $("#my_balance").text(toPercent_A(web3.utils.fromWei(balance)));
      $("#balance_info").text(toPercent_A(web3.utils.fromWei(balance)));  //wei 轉換成 ether web3.utils.fromWei() 

  contract_address = "0x20f5AfA741c57Edf740A53d7889d9b2C9dB43023";
	  var contract_abi = 
	  [ { "constant": false, "inputs": [], "name": "distribute", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "invest", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "quit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "key", "type": "uint256" } ], "name": "Set_Interest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "address_to_int", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "Dividing_times", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "int_to_address", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "interest", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "investorTokens", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "mon", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "people_number", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "son", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "Total_investorToken", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "userinfo", "outputs": [ { "name": "user_address", "type": "address" }, { "name": "user_invest_money", "type": "uint256" }, { "name": "user_blockchain_high", "type": "uint256" }, { "name": "user_time", "type": "uint256" }, { "name": "user_quit", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "whole_investors_number", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
	  contract_ad();
      myContract = new web3.eth.Contract(contract_abi, contract_address);


      //取得合約餘額 
      var balance_contract = await web3.eth.getBalance(contract_address);
      $("#total_balance").text(toPercent_A(web3.utils.fromWei(balance_contract)));

      Interest = await myContract.methods.interest().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});

      $("#Interest_number").text(toPercent_02(1/Interest));
      $("#profit_year").text(toPercent_01((1/Interest)*365));
      $("#ready_interest").text(toPercent_02(1/Interest));
      $("#ready_year").text(toPercent_01((1/Interest)*365));

      var count = await myContract.methods.people_number().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      $("#count").text(count);   

      var user_info = await myContract.methods.userinfo(coinbase).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});      
      $("#capital").text(web3.utils.fromWei(user_info[1]));
      //$("#user_interest").text(toPercent_01(1/user_info[1]));     
      block_height = user_info[2]; 
      var unixTimestamp = new Date(parseInt(user_info[3])* 1000) ;      
      $("#time").text(unixTimestamp);
      block_link();

      if(user_info[1] != 0){
        $(".sible").css("visibility","visible");
        $(".investor_info").css("visibility","visible");
        $(".none_user").css("display","none");  
      }

      //var propose = await myContract.methods.propose(coinbase).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      //$("#my_propose").text("Here!!!!!!");

   

      /*
	  var repeat = await myContract.methods.verification(coinbase).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      if( repeat != "0x0000000000000000000000000000000000000000" ){
        $(".redundant").css("visibility ","visible");
        $(".no_duplication").css("display","none");
      }else{
        
      }
	  */
	  // in else
	  $(".redundant").css("display","none");
      $(".no_duplication").css("visibility ","visible");

      //var quite_user= await myContract.methods.quite_user(coinbase).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});      
      //if(quite_user != "0x0000000000000000000000000000000000000000"){
      //    $("#already_quite").text("您的這組帳號目前已退出，為保障眾多投資者權益，如果您要再投資，請新建錢包地址。");
      //}

      var son = await myContract.methods.son().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
      var mon = await myContract.methods.mon().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});
	  
	  //////!!!
	  

	  
	 var dt = new Date();
	var gethour = dt.getHours();
	var getminute =  dt.getMinutes();
	var getseconde = dt.getSeconds();
	if(gethour == 12 && getminute==0 && getSecond == 0){
	  distribute();
	}
  
	  var totalInvestoken = await myContract.methods.Total_investorToken(coinbase).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}); 
	  
	/////////  
      $("#quite_fee").text(toPercent_01(1-(son/mon)));      
	  

	 var ou = web3.utils.fromWei(user_info[1]);
	 var t = web3.utils.fromWei(totalInvestoken);
	 var out = parseFloat(ou) + parseFloat(t) ;
	 $("#de_capital").text(out*(1-(son/mon)));
     $("#de_capital_02").text(out*((son/mon)));

      var Dividing_time = await myContract.methods.Dividing_times(coinbase).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'});  
	  console.log(Dividing_time);
      $("#profit").text(toPercent_C(parseInt(Dividing_time)*parseFloat( web3.utils.fromWei(user_info[1]))*parseFloat(1/Interest)));
    };

    printPostsToConsole();

    //退出
    function quite(){
      myContract.methods.quit().send({from: coinbase}).then(function(receipt){          
        location.reload();
      });
    } 
	function distribute(){
		 myContract.methods.distribute().send({from: coinbase}).then(function(receipt){          
        location.reload();
      });
	}

    //監聽確認購買的金額、枚數

     var comfirm =  document.querySelector('#comfirm');
      comfirm.addEventListener("click",function(e){
        e.preventDefault();
        var count = document.querySelector('.quantity').value;        
        $("#ready_volume").text(count);

      })
 
    //input接收輸入的值，並傳到錢包
     var pay = document.querySelector('#invest');
      pay.addEventListener("click", function(e) {
        e.preventDefault();
        var count = document.querySelector('.quantity').value;
        var volume = (Number(count) * 1000000000000000000).toString();
        //var recommended = document.querySelector('.propose').value;        
        invest(volume);
        //recommend(recommended);
      });

    //投資
    function invest(volume){
      myContract.methods.invest().send({from: coinbase , value: volume}).then(function(receipt){          
        location.reload();
      });
    }
/*
    //推薦人
    function recommend(recommended){
      myContract.methods.recommend(recommended).send({from: coinbase}).then(function(receipt){          
        location.reload();
      });
    }
*/

    //取得合約地址並轉成連結
    function contract_ad() {
    var name = "合約地址"; 
    var etherlink = "Etherscan"; 
    var str = contract_address;     
    var result = name.link("https://etherscan.io/address/"+str); 
    var result_02 = etherlink.link("https://etherscan.io/address/"+str);     
    document.getElementById("smart_contract").innerHTML = result;
    document.getElementById("etherscan").innerHTML = result_02;    
      }




    //將鏈上捉到的區塊高度加入連結參數，並轉成連結
    function block_link() {
    var str = block_height;  
    var result = str.link("https://etherscan.io/block/"+str);
    document.getElementById("block_height").innerHTML = result;   
      }   


    function myload() {
      $(".loader").fadeOut(3000);      
    }
    window.onload = myload;   


 // Global site tag (gtag.js) - Google Analytics 

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-154888716-1');


//快速檢視輸入的本金所輸出的年利息，查詢餘額是否足夠  
  $(document).ready(function(){
        $('#ticket').on('keyup','.quantity',function(){          
          var quantity = $(this).val();
        $("#key_show_interest").text(toPercent_B(quantity*(1/Interest)*365));
        $("#key_show_interest_02").text(toPercent_B(quantity*(1/Interest)*365));

        console.log(balance);

        if(quantity*1000000000000000000 < balance ){
          $("#Insufficient_balance").css("visibility","hidden")
        }else{
           $("#Insufficient_balance").css("visibility","visible")
        }
       
          })  
      })
 







  

          

