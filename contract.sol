/**
 *Submitted for verification at Etherscan.io on 2019-12-15
 */

pragma solidity ^0.4.24;

contract DistributeTokens {
    address public owner;
    uint256 public interest = 20;
    uint256 public mon = 3;
    uint256 public son = 2;
    uint256 public people_number = 0;
    uint256 public whole_investors_number = 0;

    //!!
    mapping(address => uint256) public Dividing_times;

    constructor() public {
        owner = msg.sender;
    }

    struct user_info {
        address user_address;
        uint256 user_invest_money;
        uint256 user_blockchain_high;
        uint256 user_time;
        bool user_quit;
    }

    mapping(address => user_info) public userinfo;
    mapping(address => uint256) public Total_investorToken;
    mapping(address => uint256) public investorTokens;

    mapping(address => uint256) public address_to_int;
    mapping(uint256 => address) public int_to_address;

    function invest() public payable {
        require(msg.value != 0, "This address was usinterested");

        userinfo[msg.sender] = user_info(
            msg.sender,
            msg.value,
            block.number,
            block.timestamp,
            false
        );
        address_to_int[msg.sender] = whole_investors_number;
        int_to_address[whole_investors_number] = msg.sender;
        investorTokens[msg.sender] = msg.value / interest;

        owner.transfer(msg.value / 50); //fee

        people_number++;
        whole_investors_number++;
    }

    function distribute() public {
        require(owner == msg.sender);

        for (uint256 i = 0; i < whole_investors_number; i++) {
            if (
                int_to_address[i] != 0x0000000000000000000000000000000000000000
            ) {
                Total_investorToken[int_to_address[i]] += investorTokens[
                    int_to_address[i]
                ];
                Dividing_times[int_to_address[i]]++;
            }
        }
    }

    function Set_Interest(uint256 key) public {
        require(msg.sender == owner);
        if (key <= 2190) {
            interest = key;
        } else {
            interest = interest;
        }
    }

    function quit() public {
        //!!
        msg.sender.transfer(
            ((Total_investorToken[msg.sender] +
                interest *
                investorTokens[msg.sender]) * son) / mon
        ); //the whole interest dot percent
        userinfo[msg.sender] = user_info(
            msg.sender,
            0,
            block.number,
            block.timestamp,
            true
        );
        Total_investorToken[msg.sender] = 0;
        Dividing_times[msg.sender] = 0;
        people_number--;

        int_to_address[
            address_to_int[msg.sender]
        ] = 0x0000000000000000000000000000000000000000;
    }
}
