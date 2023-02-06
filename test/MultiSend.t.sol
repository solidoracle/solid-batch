pragma solidity ^0.8.10;

import "ds-test/test.sol";
import "../contracts/Multisend.sol";
import "../contracts/mocks/ERC20mock1.sol";
import "../contracts/mocks/ERC20mock2.sol";
import "./utils/vm.sol";
import "forge-std/console.sol";



contract MultiSendTest is DSTest {
    Vm vm = Vm(address(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D));
    address owner = address(100);
    address player1 = address(200);
    address player2 = address(300);
    uint amount = 1 ether;

    

    function setUp() public {
        // Deal owner address some ether
        vm.deal(owner, 5 ether);
    }

    function testMultiSend() public {


        vm.startPrank(owner);

        ERC20mock1 eRC20mock1 = new ERC20mock1("","", 10 ether);
        ERC20mock2 eRC20mock2 = new ERC20mock2("","", 10 ether);


        MultiSend multisend = new MultiSend();
        
        eRC20mock1.approve(address(multisend), 100 ether);
        eRC20mock2.approve(address(multisend), 100 ether);

    


        address creator1 = address(player1);
        uint256 amountPack1 = 1 ether;
        
        bytes[2] memory data;

        data[0] = abi.encode(address(eRC20mock1), address(player1), 2 ether);
        
        data[1] = abi.encode(address(eRC20mock2), address(player2), 3 ether);


        multisend.multiERC20TransferPacked(data);

        console.log(eRC20mock1.balanceOf(owner));   
        console.log(eRC20mock2.balanceOf(owner));   


        vm.stopPrank();
    }
}
