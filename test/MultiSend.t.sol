pragma solidity ^0.8.10;

import "ds-test/test.sol";
import "../contracts/Multisend.sol";
import "../contracts/ERC20mock1.sol";
import "../contracts/ERC20mock2.sol";
import "./utils/vm.sol";


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

        address[] memory tokenArray = new address[](2);
        address[] memory addressArray = new address[](2);
        uint[] memory amounts = new uint[](2);

        tokenArray[0] = address(eRC20mock1);
        tokenArray[1] = address(eRC20mock2);
        addressArray[0] = address(player1);
        addressArray[1] = address(player2);
        amounts[0] = 1 ether;
        amounts[1] = 1 ether;


        multisend.multiERC20Transfer(tokenArray, addressArray, amounts);

        assertEq(eRC20mock1.balanceOf(owner), 8 ether);
        assertEq(eRC20mock1.balanceOf(player1), 1 ether);
        assertEq(eRC20mock1.balanceOf(player2), 1 ether);

        assertEq(eRC20mock2.balanceOf(owner), 8 ether);
        assertEq(eRC20mock2.balanceOf(player1), 1 ether);
        assertEq(eRC20mock2.balanceOf(player2), 1 ether);

        vm.stopPrank();
    }
}
