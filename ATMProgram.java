import java.util.Scanner;
class ATMProgram
{
	public static void main(String args[])
	{
		Scanner sc=new Scanner(System.in);
		System.out.println("enter balance value:");
		int balance=sc.nextInt();
		System.out.println("enter withdraw value:");
		int withdraw=sc.nextInt();
		if(withdraw<=0)
			System.out.println("invalid amount");
		else if(withdraw>balance)
			System.out.println("insufficient money");
		else
		{
			balance=balance-withdraw;
		    System.out.println("total amount:"+balance);
		    System.out.println("transaction successfully");
		}
	}
}